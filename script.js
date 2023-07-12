import { existsSync,statSync, readFile, promises } from 'fs'
 import { isAbsolute, resolve, extname } from 'node:path'
import path from 'path';

import * as cowsay from "cowsay";

const myCowSays =(string)=>{
  console.log(cowsay.say({
      text: string,
      e: 'oO',
      T: 'U',
  }));
};

 // This file contains all the functions and promises

// Return a boolean as a result
export  const checkIsPath=(path)=>{
    let  result
    try {
        result=existsSync(path)
        return result
    } catch(error) {
        console.error(`${path} is not a valid path ${error}`);      
        return result       
    }
};
//console.log(checkIsPath('myText4.txt'));
//console.log(checkIsPath('./filesTest/myText2.txt'));
//console.log(checkIsPath('myText1.txt'));

// Return absolute path
export const toAbsolute=(path)=>{
    const checkIsAbsolute=isAbsolute(path);
    if (checkIsAbsolute){
        return path
    }else{
        path=resolve(path)
        return path
    }   
};
// console.log(toAbsolute('myText1.txt'));
// console.log(toAbsolute('./filesTest/myText2.txt'));

// Return a boolean
export const isAFile=(path)=>{
    let result=false;
    const stats=statSync(path);
    try {
        result=stats.isFile()
        return result
    } catch (error) {
        console.error(`${path} is not a file ${error}`);
        return result
    }
};
//console.log(isAFile('./test1.md'));

//Retunr a boolean
export const isMDFile=(path)=>{
    const result=extname(path)==='.md'?true:false;
    return result;
};
// console.log(isMDFile('./test1.md'));
// console.log(isMDFile('myText1.txt'));

// creating a promise fot reading a file
export const readingFile=(path)=>{
    path=toAbsolute(path);
    return new Promise((resolve,reject)=>{      
        readFile(path,'utf-8',(err,data)=>{
            err===true?reject(new Error('Oooops! problems reading file')):resolve(data);
        })
    })
};

// return an object with an array with  information about links founded: text,Url, path
export const searchingLinks=(path)=>{
    let links
    try {
        readingFile(path)
        .then(data=>{
            const fileContent=data;
            //Finds links which has '[text](url)' format
            const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
            const links=[];
            let match;
            while ((match=linkRegex.exec(fileContent))){
                const linkText=match[1];
                const linkUrl=match[2];
                links.push({text:linkText, url:linkUrl, file: toAbsolute(path)})
            }
            console.log(links);
             return links
        })
        .catch(err=>{
            console.log(err);
        });
    } catch (error) {
        console.error(`Error reading file: ${error}`);
        return [];
    }
};
//console.log(searchingLinks('./test1.md'));


/////////////////////////////////////////////////////////////////
///       Another way of reading file     //////////

export const leerArchivo=(path)=>{
    path=toAbsolute(path);
    readFile(path,'utf-8',(error, fileContent)=>{
        if (error) {
            console.error(err);
            return;
          }else{
            const linksEncontrados=buscarLinks(fileContent,path)
            myCowSays("File reading successfully!!\n We've found next links:");
            console.log(linksEncontrados);
            return linksEncontrados
          }       
    })
};

export const buscarLinks=(data,path)=>{
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const links=[];
        let match;
        while ((match=linkRegex.exec(data))){
            const linkText=match[1];
            const linkUrl=match[2];
            links.push({text:linkText, url:linkUrl, file: toAbsolute(path)})
        }
        return links
};

//console.log(leerArchivo('./test1.md'));

// Defining the promise
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
            const linksFounded=leerArchivo(path);
            resolve(linksFounded);
        }          
    })
    return linksPromise
};

//consuming the promise
mdLinks('./test1.md').then((result)=>{
    //console.log(result);
}).catch((err)=>{
    console.error(err)
})

//////////////////////////////////////////////////////////////

// //How to use the promise for reading the file
// readingFile('./test1.md')
// .then(data=>{
//     console.log(data);
//     return data
    
// })
// .catch(err=>{
//     console.log(err);
// });


//Promise for searching links
// export const mdLinks=(path)=>{
//     return new Promise((resolve,reject)=>{
//         if(!checkIsPath){
//             reject(new Error('Path is invalid'))
//             return
//         }
//         if (!isAFile){
//             reject(new Error("File doesn't exist"))
//             return
//         }
//         if (!isMDFile){
//             reject(new Error ("File is not a MD file"))
//             return
//         }
//         const linksFounded=searchingLinks(path);
//         resolve(linksFounded);
//     })
// };

// Using the searchingLinks promise
// mdLinks('./test1.md')
// .then((result)=>{
//     //myCowSays("File reading successfully!!");
//     console.log("File reading successfully!!");
//     //console.log(result);
// })
// .catch((error)=>{
//     console.error(error)
// });

