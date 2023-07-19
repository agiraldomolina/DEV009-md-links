const fs =require('fs');
const path=require('path');

const {
    checkIsPath,
    isMDFile,
    readingFile
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
};

console.log(typeof(findMDFilesFromDir));
const path6='./mdFiles';
console.log(findMDFilesFromDir(path6));

// const getContent=(myPath)=>{
//     const isDir=fs.statSync(myPath).isDirectory();
//     if (isDir){
//         const files=findMDFilesFromDir(myPath);
//         console.log(files);
//         let listLinks=[];
//         const allLinks=files.map(file=>{
//             readingFile(file).then(links=>{
//                 listLinks.push(links)
//             })
//             console.log(listLinks);
//         });
//         if(allLinks===0) throw new Error ('nada de nada')
//         return Promise.all(allLinks).
//         then(linksFounded=>linksFounded.flat())
//     }
//     return readingFile(myPath)
// };

// console.log(getContent('./mdFiles'));



const fecthLinksFromDir=(myPath)=>{
    return new Promise((resolve,reject)=>{
        const mdFilesFounded=findMDFilesFromDir(myPath);
        console.log(mdFilesFounded);
        if (mdFilesFounded.length>0){
            const arrayWithAllLinks=mdFilesFounded.map(eachMDFile=>{
                readingFile(eachMDFile).then(arrayLinks=>{arrayLinks
                })
            })
            let singleArrayLinks=[];
            Promise.all(arrayWithAllLinks).then(arrayLinks=>{
                arrayLinks.forEach(array=>{
                    singleArrayLinks=singleArrayLinks.concat(array);
                })
                resolve(Promise.all(singleArrayLinks))
            })
            
        }else{
            reject(new Error ('MD files do not finded'))
        }
    })
}



// fecthLinksFromDir('./mdFiles').then(result=>{
//     console.log(result);
// })

module.exports=findMDFilesFromDir