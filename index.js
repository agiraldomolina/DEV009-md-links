const {
    checkIsPath,
    isAFile,
    isMDFile,
    readingFile
} =require ('./script');

const mdLinks=(myPath)=>{
    return new Promise((resolve,reject)=>{
        if(!checkIsPath(myPath)){
            reject(new Error('Path is invalid'))
            return
        }else if (!isMDFile(myPath)){
            reject(new Error ("File is not a MD file"))
            return
        }else{
            readingFile(myPath).then(links=>{
              links.length > 0?resolve(links):reject(new Error("The file has not links"))
            })
            return;
        }          
    })
  };

  module.exports={mdLinks};