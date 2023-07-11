import{
    checkIsPath,
    toAbsolute,
    isAFile,
    isMDFile,
    readingFile,
    searchingLinks,
  } from './script.js'  
  
 export const mdLinks=(path)=>{
        return new Promise((resolve,reject)=>{
            if(!checkIsPath){
                reject(new Error('Path is invalid'))
                return
            }
            if (!isAFile){
                reject(new Error("File doesn't exist"))
                return
            }
            if (!isMDFile){
                reject(new Error ("File is not a MD file"))
                return
            }
            const linksFounded=searchingLinks(path);
            resolve(linksFounded);
        })
    };

    
  
//   mdLinks('./test1.md')
//   .then((result)=>{
//       myCowSays("File reading successfully!!");
//       console.log("File reading successfully!!");
//       //console.log(result);
//   })
//   .catch((error)=>{
//       console.error(error)
//   });
  
