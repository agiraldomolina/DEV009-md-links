const fs =require('fs');
const path=require('path');
const axios=require('axios');

/**
 * Checks if a given path exists.
 * @param {string} path - The path to check for existence.
 * @returns {boolean} Returns true if the path exists; otherwise, returns false.
 */
const checkIsPath=(path)=> fs.existsSync(path);

/**
 * Checks if a given file path has a ".md" extension, indicating it is a Markdown file.
 * @param {string} myPath - The file path to check.
 * @returns {boolean} Returns true if the file path has a ".md" extension; otherwise, returns false.
 */
const isMDFile=(myPath)=>{
    return path.extname(myPath)==='.md'?true:false;
};

/**
 * Reads a file and searches for links in its content.
 * @param {string} myPath - The path to the file to be read.
 * @returns {Promise<Array<string>>} A Promise that resolves with an array of found links in the file content.
 * @throws {Error} If there is an error reading the file or searching for links.
 */
const readingFile = (myPath) => {
    return new Promise((resolve, reject) => {
        // Get the absolute path of the file.
      const absolutePath = path.resolve(myPath);
      // Read the file asynchronously.
      fs.readFile(absolutePath, 'utf-8', (error, fileContent) => {
        // If there is an error during file reading, reject the Promise with the error.
        if (error) {
          reject(error);
        } else {
        // If the file is successfully read, search for links in its content.
          const linksEncontrados = searchingLinks(fileContent, absolutePath);
          // Resolve the Promise with the array of found links.
          resolve(linksEncontrados);
        }
      });
    });
  };

/**
 * Searches for links in the given data (text content) and returns an array of link objects.
 * @param {string} data - The text content to search for links.
 * @param {string} myPath - The file path from which the data originates (used to provide context).
 * @returns {Array<{text: string, url: string, file: string}>} An array of link objects containing link text, URL, and the originating file path.
 */
const searchingLinks=(data,myPath)=>{
    // Regular expression to match Markdown-style links.
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const links=[];
        let match;
        // Search for links in the data using the regular expression.
        while ((match=linkRegex.exec(data))){
            const linkText=match[1]; // Text inside the link's square brackets.
            const linkUrl=match[2];  // URL inside the link's parentheses.
            // Create a link object and add it to the array of links.
            links.push({text:linkText, url:linkUrl, file: correctDoubleBackSlash(myPath)})
        }
    return links
};

/**
 * Corrects the double backslashes in a given path string and returns the updated path.
 * The function replaces occurrences of double backslashes "\\" with a single backslash "\".
 * @param {string} pathString - The path string to correct.
 * @returns {string} The updated path string with corrected backslashes.
 */
 const correctDoubleBackSlash=(pathString)=>{
    // Replace occurrences of double backslashes with a single backslash.
    return pathString.replace('/\\', '/\/')
 }

/**
 * Validates an array of found links by making HTTP requests to their URLs using Axios.
 * The function checks the status of each URL and updates the link objects with the validation results.
 * @param {Array<{text: string, url: string, file: string}>} foundedLinks - An array of link objects containing link text, URL, and the originating file path.
 * @returns {Promise<Array<{text: string, url: string, file: string, status: number | string, info: 'Valid' | 'Broken'}>>} 
 * A Promise that resolves with an array of link objects with updated validation results. 
 * Each link object contains the link text, URL, originating file path, status code (for valid links), and info ('Valid' or 'Broken').
 */
 function validateFoundLinks(foundedLinks){
    const requestAxios=foundedLinks.map(link=>{
        // Make an Axios HTTP request to the link's URL.
        return axios.get(link.url)
        .then(response=>{
             // If the request is successful, update the link object with validation results.
            link.status=response.status
            link.info='Valid'
            return link
        })
        .catch(error=>{
            // If there is an error (e.g., broken link), update the link object with validation results.
            link.status=error.message;
            link.info='Broken';
            return link
        })
    })
    // Wait for all Axios requests to resolve and return the Promise with the updated link objects.
    return Promise.all(requestAxios)
};

module.exports={
    checkIsPath,
    isMDFile,
    readingFile,
    validateFoundLinks
}