const fs =require('fs');
const path=require('path');

const {
    isMDFile,
    readingFile
} =require ('./script1');
const { list } = require('cowsay');

/**
 * Next function recursively finds all markdown files in the specified directory path and its subdirectories.
 *
 * @param {string} myPath - The directory path to search for markdown files.
 * @returns {Array<string>} An array of strings containing the file paths of all the markdown files found.
 */
const findMDFilesFromDir=(myPath)=>{
    let listFiles=[];
    // Resolve the provided path to make sure it is an absolute path.
    myPath=path.resolve(myPath);
    // Check if the resolved path corresponds to a directory.
    if(fs.statSync(myPath).isDirectory()){
      // Read the files in the directory.
        const findedFiles=fs.readdirSync(myPath);
        // Iterate through each file found.
        findedFiles.forEach(file=>{
            // Recursively call the function to find markdown files in subdirectories.
            listFiles=listFiles.concat(findMDFilesFromDir(`${myPath}\\${file}`))
        })
    }else{
      // If the path corresponds to a file and it is a markdown file, add it to the list.
        if (isMDFile(myPath)) listFiles.push(myPath)
    }
    // Filter the list of files to include only those that are markdown files.
    return listFiles.filter(file=>isMDFile(file));
};

console.log(typeof(findMDFilesFromDir));
const path6='./mdFiles';
console.log(findMDFilesFromDir(path6));

/////////////////////////////////////////////////////////////////////////////
/**
 * Next function finds all the links present in markdown files within the specified directory path.
 *
 * @param {string} myPath - The directory path to search for markdown files.
 * @returns {Promise<Array<string>>} A Promise that resolves to an array of strings containing all the links found.
 * If no links are found or an error occurs during the process, it resolves to an empty array.
 */


const findLinksInMarkdownFiles = (myPath) => {
  // Find all markdown files within the specified directory path.
    const mdFiles = findMDFilesFromDir(myPath);
  // Create an array of promises for reading each markdown file.
    const promises = mdFiles.map((file) => readingFile(file));
  
  // Use Promise.all to execute all the file reading promises concurrently.  
    return Promise.all(promises)
      .then((results) => {
        // Concatenate all the links found in the markdown files into a single array.
        const links = results.reduce((acc, curr) => acc.concat(curr), []);
        return links;
      })
      .catch((error) => {
        // In case of an error, log the error and return an empty array.
        console.error('Error:', error);
        return [];
      });
  };
  

const myFolderPath = './mdFiles';
findLinksInMarkdownFiles(myFolderPath)
  .then((links) => {
    console.log('Enlaces encontrados:');
    console.log(links);
    console.log(`${links.length} finded`);
  })
  .catch((err) => {
    console.error('Error al buscar enlaces:', err);
  });

module.exports={
  findMDFilesFromDir,
  findLinksInMarkdownFiles
}