import{
  checkIsPath,
  isAFile,
  isMDFile,
  readingFile,
} from './script.js' 

export const mdLinks=(path)=>{
  return new Promise((resolve,reject)=>{
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
          readingFile(path).then(links=>{
            links.length > 0?resolve(links):reject(new Error("The fila has not links"))
          })
          return;
      }          
  })
};
