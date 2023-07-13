import { existsSync,statSync, readFile, promises } from 'fs'
import { isAbsolute, resolve, extname } from 'node:path'

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
console.log(checkIsPath('myText4.txt'));
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

// Creating a promise for readingFile
export const readingFile=(path)=>{
    return new Promise((resolve,reject)=>{
        path=toAbsolute(path);
        readFile(path,'utf-8',(error,fileContent)=>{
            if(isMDFile){
                const linksEncontrados=searchingLinks(fileContent,path);
                resolve(linksEncontrados);
            }else{
                reject(new Error ("Not a MD file"))
            }
        })
    })
};

export const searchingLinks=(data,path)=>{
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