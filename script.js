const fs =require('fs');
const path=require('path');
const axios=require('axios');

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

const isMDFile=(myPath)=>{
    const result=path.extname(myPath)==='.md'?true:false;
    return result;
};

// Creating a promise for readingFile
const readingFile=(myPath)=>{
    return new Promise((resolve,reject)=>{
        const absolutePath=path.resolve(myPath);
        fs.readFile(absolutePath,'utf-8',(error,fileContent)=>{
            if(isMDFile(myPath)){
                // console.log(absolutePath);
                const linksEncontrados=searchingLinks(fileContent,absolutePath);
                resolve(linksEncontrados);
            }else{
                reject(new Error ("Not a MD file"))
            }
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

const mdLinks=(myPath, validate=true)=>{
    return new Promise((resolve,reject)=>{
        if(!checkIsPath(myPath)){
            reject(new Error('Path is invalid'))
            return
        }else if (!isMDFile(myPath)){
            reject(new Error ("File is not a MD file"))
            return
        }else{
            readingFile(myPath).then(links=>{
                try {
                    if (links.length >0){
                        if(validate){
                            resolve(validateFoundedLinks(links))
                        }else{
                            resolve(links)
                        }
                      }
                } catch (error) {
                    console.error('Error',error)
                }              
            })
            return;
        }          
    })
  };

//   mdLinks('./mdFiles/ejemplo2.md').then(resul=>{
//     console.log(resul);
// });

module.exports={
    mdLinks
}