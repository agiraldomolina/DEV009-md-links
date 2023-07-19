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
        const linksPromise= new Promise((resolve,reject)=>{
            if(!checkIsPath(path)){
                reject(new Error('Path is invalid'))
                return
            }else if (!isAFile(path)){
                reject(new Error("File doesn't exist"))
                return
            }else if (!isMDFile(path)){
                reject(new Error ("File is not a MD file"))
                return
            }else{
                const linksFounded=searchingLinks(path);
            }          
        })
        return linksPromise
    };

//     mdLinks('./test1.md').then((result)=>{
//         console.log(result);
//     }).catch((err)=>{
//         console.error(err)
//     })

//     // mdLinks('./test1.md').then(data=>{
//     //     console.log(data);
//     // })
//     // .catch(err=>{
//     //     console.error(err)
//     // });
