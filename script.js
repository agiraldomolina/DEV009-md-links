const fs =require('fs');
const path=require('path');

const checkIsPath=(path)=>{
    let  result
    try {
        result=fs.existsSync(path);
        return result
    } catch(error) {
        console.error(`${path} is not a valid path ${error}`);      
        return result       
    }
};
//console.log(checkIsPath('myText4.txt'));
//console.log(checkIsPath('./myText2.txt'));
//console.log(checkIsPath('myText1.txt'));

const toAbsolute=(myPath)=>{
    return path.resolve(myPath);
}
 console.log(toAbsolute('myText1.txt'));
// console.log(toAbsolute('./filesTest/myText2.txt'));

const isMDFile=(myPath)=>{
    const result=path.extname(myPath)==='.md'?true:false;
    return result;
};

// Creating a promise for readingFile
const readingFile=(myPath)=>{
    return new Promise((resolve,reject)=>{
        const absolutePath=toAbsolute(myPath);
        fs.readFile(absolutePath,'utf-8',(error,fileContent)=>{
            if(isMDFile){
                const linksEncontrados=searchingLinks(fileContent,absolutePath);
                resolve(linksEncontrados);
            }else{
                reject(new Error ("Not a MD file"))
            }
        })
    })
};

const searchingLinks=(data,myPath)=>{
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const links=[];
        let match;
        while ((match=linkRegex.exec(data))){
            const linkText=match[1];
            const linkUrl=match[2];
            links.push({text:linkText, url:linkUrl, file: toAbsolute(myPath)})
        }
    return links
};

module.exports={
    checkIsPath,
    toAbsolute,
    isMDFile,
    readingFile
}