const {
    checkIsPath,
    isMDFile,
    readingFile,
    validateFoundLinks
} =require ('./script1');

const {findMDFilesFromDir,
    findLinksInMarkdownFiles}=require('./script2.js')

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
const mdLinks=(myPath, validate=false)=>{
    return new Promise((resolve,reject)=>{
        // Check if the provided path is valid.
        if(!checkIsPath(myPath)){
            reject(new Error('Path is invalid'))
        }else{
             // Find links in markdown files within the specified path.
            findLinksInMarkdownFiles(myPath).then(links=>{
                try {
                    if (links.length >0){
                        // If there are links found, optionally validate them based on the 'validate' flag.
                        if(validate){
                            resolve(validateFoundLinks(links))
                        }else{
                            resolve(links)
                        }
                      }else{
                        // Resolve with an empty array if no links are found.
                        resolve([]);
                      }
                } catch (error) {
                    // Catch any errors that occurred during the validation process
                    console.error('Error',error)
                    reject(error)
                }              
            })
            .catch(error=>{
                // Catch any errors that occurred during the link search process.
                console.error('Error', error);
                reject(error);
            })
        }          
    })
  };

//   mdLinks('./mdFiles',false).then(result=>{
//     console.log(result);
//     console.log(result.length);
//   })

  module.exports=mdLinks;