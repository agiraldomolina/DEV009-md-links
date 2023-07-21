#!/usr/bin/env node

const mdLinks=require('./index.js');
const fetchStats=require('./script3.js')
const cowsay = require("cowsay");

const myCowSays =(string,eyes)=>{
  console.log(cowsay.say({
      text: string,
      e: eyes,
      T: 'U',
  }));
};

const myPath=process.argv[2];
const validate =process.argv.some((arg)=>arg==='--validate')?true:false
const stats=process.argv.some((arg)=>arg==='--stats')?true:false;

// const myPath='./mdFiles/ejemplo2.md'
// const validate = false;
// const stats=false;

  mdLinks(myPath, validate).then((result)=>{
    myCowSays("\nFiles reading successfully!!\n","oO");
    const statsResult=fetchStats(result);
    const total=statsResult.total;
    const unique=statsResult.unique;
    const broken=statsResult.broken;
    if(!validate && !stats){
      console.log(result);
    }else if(validate && !stats){
      console.log(result);
    }else if (validate && stats){
      console.log(`\nTotal links found:\t${total}\nUnique links:\t\t${unique}\nBroken links:\t\t${broken}`);
    }else if(!validate && stats){
      console.log(`\nTotal links found:\t${total}\nUnique links:\t\t${unique}`);
    }
  })
  .catch((error)=>{
    myCowSays("Something went wrong","xx");
    console.error(error)
  });

