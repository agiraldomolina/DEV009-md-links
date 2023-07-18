const fs =require('fs');
const path=require('path');
const axios=require('axios');

const checkIsPath=(path)=> fs.existsSync(path);

const isMDFile=(myPath)=>{
    const result=path.extname(myPath)==='.md'?true:false;
    return result;
};

// Creating a promise for readingFile
const readingFile=(myPath)=>{
    return new Promise((resolve,reject)=>{
        const absolutePath=path.resolve(myPath);
        fs.readFile(absolutePath,'utf-8',(error,fileContent)=>{
            const linksEncontrados=searchingLinks(fileContent,absolutePath);
            resolve(linksEncontrados);
        })
    })
};

// readingFile('./mdFiles/ejemplo2.md').then(resul=>{
//     console.log(resul);
// });

const searchingLinks=(data,myPath)=>{
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const links=[];
        let match;
        while ((match=linkRegex.exec(data))){
            const linkText=match[1];
            const linkUrl=match[2];
            links.push({text:linkText, url:linkUrl, file: correctDoubleBackSlash(myPath)})
        }
    return links
};

 const correctDoubleBackSlash=(pathString)=>{
    return pathString.replace('/\\', '/\/')
 }

function validateFoundedLinks(foundedLinks){
    const requestAxios=foundedLinks.map(link=>{
        return axios.get(link.url)
        .then(response=>{
            link.status=response.status
            link.info='Valid'
            return link
        })
        .catch(error=>{
            link.status=error.message;
            link.info='Broken';
            return link
        })
    })
    return Promise.all(requestAxios)
};

module.exports={
    checkIsPath,
    isMDFile,
    readingFile,
    validateFoundedLinks
}