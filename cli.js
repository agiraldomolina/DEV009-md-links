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
let msgCow

if (!myPath) {
  console.log("Please enter", "--help", "to see options");
} else if (process.argv.includes("--help")) {
  console.log("OPTIONS");
  console.log("<path>                   ", "All links found in markdown files");
  console.log("<path> --validate        ", "Links with status and info");
  console.log("<path> --stats           ", "Stats: Total and Unique links");
  console.log("<path> --validate --stats", "Stats: Total, Unique and Broken links"
  );

} else if(!validate && !stats){
  mdLinks(myPath, validate)
  mdLinks(myPath,validate)
  .then((links)=>{
    msgCow=`Files reading successfully!!\n and ${links.length} were found `
    myCowSays(msgCow, "oO");
    links.forEach(link=>{
      console.log(`\nFile:\t${link.file}\nText:\t${link.text}\nURL:\t${link.url}\n`);
    })
  })
  .catch((error) => {
    myCowSays("Something went wrong", "xx");
    console.error(error);
  });
}else if (validate && !stats){
  mdLinks(myPath,validate)
  .then((links)=>{
    msgCow=`Files reading successfully!!\n and ${links.length} were found\n Next you can see all links and their status`
    myCowSays(msgCow,"00");
    links.forEach(link=>{
      console.log(`\nFile:\t${link.file}\nText:\t${link.text}\nURL:\t${link.url}\nStatus:\t${link.status}\nInfo:\t${link.info}`);
    })
  })
  .catch((error) => {
    myCowSays("Something went wrong", "xx");
    console.error(error);
  });

}else if (stats){
  mdLinks(myPath,validate)
  .then((links)=>{
    msgCow=`Files reading successfully!!\n and ${links.length} were found\n Next you can the stats`
    myCowSays(msgCow,"$$");
    const statsResult = fetchStats(links);
    !validate?
    console.log(`\nTotal links found:\t${statsResult.total}\nUnique links:\t\t${statsResult.unique}`):
    console.log(`\nTotal links found:\t${statsResult.total}\nUnique links:\t\t${statsResult.unique}\nBroken:\t\t\t${statsResult.broken}`);
  })
  .catch((error) => {
    myCowSays("Something went wrong", "xx");
    console.error(error);
  });
}
  
     
// const myPath='./mdFiles/ejemplo2.md'
// const validate = false;
// const stats=false;

  

