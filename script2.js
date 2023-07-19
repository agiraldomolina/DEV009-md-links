const fs =require('fs');
const path=require('path');

const {
    checkIsPath,
    isMDFile,
} =require ('./script1');

const findMDFilesFromDir=(myPath)=>{
    let listFiles=[];
    myPath=path.resolve(myPath);
    if(fs.statSync(myPath).isDirectory()){
        const findedFiles=fs.readdirSync(myPath);

        findedFiles.forEach(file=>{
            listFiles=listFiles.concat(findMDFilesFromDir(`${myPath}\\${file}`))
        })
    }else{
        listFiles.push(myPath)
    }
    return listFiles.filter(file=>isMDFile(file))
}

console.log(typeof(findMDFilesFromDir));
const path6='./mdFiles';
//console.log(path.resolve(path6));
console.log(findMDFilesFromDir(path6));

module.exports=findMDFilesFromDir