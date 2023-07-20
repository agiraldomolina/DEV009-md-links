#!/usr/bin/env node

const mdLinks=require('./index.js');
const cowsay = require("cowsay");

const myCowSays =(string,eyes)=>{
  console.log(cowsay.say({
      text: string,
      e: eyes,
      T: 'U',
  }));
};

const myPath=process.argv[2];

const validate=process.argv.some((arg)=>arg==='--validate');
const stats=process.argv.some((arg)=>arg==='--stats');

  mdLinks(myPath, {validate}).then((result)=>{
    // myCowSays("File reading successfully!!\n We've found next links:","oO");
    
    console.log(result, 999);
  })
  .catch((error)=>{
    myCowSays("Something went wrong","xx");
    console.error(error)
  });

// mdLinks('./mdFiles',false).then((result)=>{
//     myCowSays("File reading successfully!!\n We've found next links:","oO");
//     console.log(result);
//   })
//   .catch((error)=>{
//     myCowSays("Something went wrong","xx");
//     console.error(error)
//   });

