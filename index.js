const {
    checkIsPath,
    isMDFile,
    readingFile,
    validateFoundedLinks
} =require ('./script1');

const findMDFilesFromDir=require('./script2.js')


const mdLinks=(myPath, validate=false)=>{
    return new Promise((resolve,reject)=>{
        if(!checkIsPath(myPath)){
            reject(new Error('Path is invalid'))
        }else if (!isMDFile(myPath)){
            reject(new Error ("File is not a MD file"))
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
        }          
    })
  };

 //console.log(typeof(mdLinks));

//   mdLinks('./mdFiles',true).then(result=>{
//     console.log(result);
//   })

  module.exports=mdLinks;