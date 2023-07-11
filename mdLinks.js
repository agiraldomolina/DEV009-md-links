import{
    checkIsPath,
    toAbsolute,
    isAFile,
    isMDFile,
    readingFile,
    searchingLinks,
  } from './script.js' 
  
  import * as cowsay from "cowsay";

const myCowSays =(string)=>{
  console.log(cowsay.say({
      text: string,
      e: 'oO',
      T: 'U',
  }));
};
  
 export const mdLinks=(path)=>{
        return new Promise((resolve,reject)=>{
            if(!checkIsPath(path)){
                reject(new Error('Path is invalid'))
                return
            }
            if (!isAFile(path)){
                reject(new Error("File doesn't exist"))
                return
            }
            if (!isMDFile(path)){
                reject(new Error ("File is not a MD file"))
                return
            }
            const linksFounded=searchingLinks(path);
            myCowSays("File reading successfully!!\n We've found next links:");
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
  
