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
//console.log(checkIsPath('myText4.txt'));
//console.log(checkIsPath('./myText2.txt'));
//console.log(checkIsPath('myText1.txt'));

const toAbsolute=(myPath)=>{
    return path.resolve(myPath);
}
//console.log(toAbsolute('myText1.txt'));
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


const objectLinksExample=[
    {
      text: 'Generalidades del protocolo HTTP - MDN',
      url: 'https://developer.mozilla.org/es/docs/Web/HTTP/Overview',
      file: 'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\test1.md'
    },
    {
      text: 'Mensajes HTTP - MDN',
      url: 'https://developer.mozilla.org/es/docs/Web/HTTP/Messages',
      file: 'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\test1.md'
    },
    {
      text: 'Mensajes HTTP - MDN',
      url: 'https://developer.mozilla.org/es/docs/Web/HTTP/Messages',
      file: 'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\test1.md'
    },
    {
      text: 'Link roto',
      url: 'https://www.youtube.com/01RHn23Bn_0',
      file: 'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\test1.md'
    },
    {
      text: 'Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?',
      url: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
      file: 'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\test1.md'
    }
  ];
 //console.log(objectLinksExample); 

 const correctDoubleBackSlash=(pathString)=>{
    return pathString.replace('/\\', '/\/')
 }
// console.log('correcting double backslash');
//  console.log(correctDoubleBackSlash('C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\test1.md'));
    
function validateFoundedLinks(foundedLinks){
    const requestAxios=foundedLinks.map(link=>{
        return axios.get(link.url)
        .then(response=>{
            link.status=response.status
            link.info='Valid'
            return link
        })
        .catch(error=>{
            // console.log(link.url);
            link.status=error.message;
            link.info='Broken';
            return link
        })
    })
    return Promise.all(requestAxios)
};

validateFoundedLinks(objectLinksExample)
  .then(resultado => {
    console.log('resultado de validateFoundedLinks');
    console.log('Links found:', resultado)
  })
  .catch(error => {
    console.error('Error',error)
  })



// const absPath = path.resolve('./test1.md')
// console.log('usin normalize');
// const normPath=path.normalize('C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\test1.md')
// // console.log(absPath);
// // console.log(path.resolve(absPath));
//  console.log(normPath);

//console.log(validateFoundedLinks(objectLinksExample));

module.exports={
    checkIsPath,
    toAbsolute,
    isMDFile,
    readingFile,
    validateFoundedLinks
}