import{
  mdLinks
} from './mdLinks.js'

mdLinks('./test1.md')
  .then((result)=>{
      // myCowSays("File reading successfully!!\n We've found next links:");
      //console.log(result);
  })
  .catch((error)=>{
      console.error(error)
  });
  

