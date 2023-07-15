const {
    checkIsPath,
    isAFile,
    isMDFile,
    readingFile,
    validateFoundedLinks
} =require ('./script');

const mdLinks=(myPath, validate=false)=>{
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

  module.exports={mdLinks};