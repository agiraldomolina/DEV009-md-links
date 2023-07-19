const {
    checkIsPath,
    isMDFile,
    readingFile,
    validateFoundedLinks
} =require ('./script1');

const {findMDFilesFromDir,
    findLinksInMarkdownFiles}=require('./script2.js')


const mdLinks=(myPath, validate=false)=>{
    return new Promise((resolve,reject)=>{
        if(!checkIsPath(myPath)){
            reject(new Error('Path is invalid'))
        }else{
            findLinksInMarkdownFiles(myPath).then(links=>{
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
        }          
    })
  };

//   mdLinks('./mdFiles',true).then(result=>{
//     console.log(result);
//   })

  module.exports=mdLinks;