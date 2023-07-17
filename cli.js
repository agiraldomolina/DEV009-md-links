const {mdLinks}=require('./script.js');
const cowsay = require("cowsay");

const myCowSays =(string,eyes)=>{
  console.log(cowsay.say({
      text: string,
      e: eyes,
      T: 'U',
  }));
};

// This path is used to consume the promise
// But later this path should be an argument for the module
const path='./test1.md';
// With next path we can check for errors:
const path1='./test2.md'   // without links
const path2='./test4.md'   // not exist
const path3='./mdFiles/myText2.txt'  // not md file
const path4='./mdFiles/test3.md'
const path5='./mdFiles/test4.md'

mdLinks('./mdFiles/ejemplo2.md',true).then((result)=>{
    //myCowSays("File reading successfully!!\n We've found next links:","oO");
    console.log(result);
  })
  .catch((error)=>{
    myCowSays("Something went wrong","xx");
    console.error(error)
  });

