import{
  mdLinks
} from './mdLinks.js'

import * as cowsay from "cowsay";

const myCowSays =(string)=>{
  console.log(cowsay.say({
      text: string,
      e: 'oO',
      T: 'U',
  }));
};

mdLinks('./test1.md')
  .then((result)=>{
      myCowSays("File reading successfully!!\n We've found next links:");
      //console.log(result);
  })
  .catch((error)=>{
      console.error(error)
  });
  

