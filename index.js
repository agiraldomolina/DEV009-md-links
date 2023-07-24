const {
    checkIsPath,
    validateFoundLinks
} =require ('./script1');

const {findLinksInMarkdownFiles}=require('./script2.js')

/**
 * Finds and optionally validates links present in markdown files within the specified directory path.
 *
 * @param {string} myPath - The directory path to search for markdown files.
 * @param {boolean} validate - (Optional) A boolean flag to indicate whether to validate the found links or not.
 *                             Defaults to false.
 * @returns {Promise<Array<string>>} A Promise that resolves to an array of strings containing all the links found in
 *                                   markdown files. If `validate` is true, the Promise resolves to an array of objects
 *                                   representing the validated links.
 * @throws {Error} If the provided path is invalid or if any error occurs during the process.
 */
const mdLinks = (myPath, validate = false) => {
    // Check if the provided path is valid.
    if (!checkIsPath(myPath)) {
      return Promise.reject(new Error('Path is invalid'));
    }
  
    // Find links in markdown files within the specified path.
    return findLinksInMarkdownFiles(myPath)
      .then(links => {
        if (links.length > 0) {
          // If there are links found, optionally validate them based on the 'validate' flag.
          if (validate === true) {
            return validateFoundLinks(links);
          } else {
            return links;
          }
        } else {
          // Resolve with an empty array if no links are found.
          return [];
        }
      })
      .catch(error => {
        // Catch any errors that occurred during the process.
        console.error('Error', error);
        throw error;
      });
  };

  module.exports=mdLinks;