// filename: checkLanguage.js
const fs = require('fs');
const path = require('path');

// Load the JSON file (adjust path as needed)
const languagesFilePath = path.join(__dirname, 'languages.json'); 
let languages = [];

try {
    const data = fs.readFileSync(languagesFilePath, 'utf-8');
    languages = JSON.parse(data);
} catch (err) {
    throw new Error('Error reading or parsing JSON file: ' + err.message);
}

/**
 * Function to find language by file extension
 * @param {string} fileNameOrExt - File name (example.py) or extension (example: .py)
 * @returns {object|null} - Language object or null if not found
 */
function findLanguageByExtension(fileNameOrExt) {
    let ext = path.extname(fileNameOrExt);

    // If input was just an extension without dot
    if (!ext && fileNameOrExt.startsWith('.')) ext = fileNameOrExt;
    if (!ext) ext = '.' + fileNameOrExt;

    for (const lang of languages) {
        if (lang.extension.includes(ext)) {
            return lang; // Return the full language object
        }
    }
    return null;
}

// Export the function so other files can use it
module.exports = { findLanguageByExtension };
