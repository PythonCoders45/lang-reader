/*
MIT License

Copyright (c) 2025 Betnix

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

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
