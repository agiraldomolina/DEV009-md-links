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

// Command-line arguments to specify path, validation, and statistics options.
const myPath=process.argv[2];
const validate =process.argv.some((arg)=>arg==='--validate')?true:false
const stats=process.argv.some((arg)=>arg==='--stats')?true:false;
let msgCow

// If no path is provided or if the "--help" option is specified, display usage information.
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
  // When neither validation nor stats options are specified, find and display links without validation.
  mdLinks(myPath,validate)
  //Asynchronously reads and retrieves links from Markdown files using the `mdLinks` function.
  .then((links)=>{
    // Display a success message and the total number of links found.
    msgCow=`Files reading successfully!!\n and ${links.length} links were found `
    myCowSays(msgCow, "oO");
    //Display links along with their status and info.
    links.forEach(link=>{
      console.log(`\nFile:\t${link.file}\nText:\t${link.text}\nURL:\t${link.url}\n`);
    })
  })
  .catch((error) => {
    // Display an error message and the details of the encountered error.
    myCowSays("Something went wrong", "xx");
    console.error(error);
  });
}else if (validate && !stats){
  // When the validation option is specified, find and display links with validation status.
  mdLinks(myPath,validate)
  .then((links)=>{
    msgCow=`Files reading successfully!!\n and ${links.length} links were found\n Next you can see all links and their status`
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
  // When the stats option is specified, find and display link statistics.
  mdLinks(myPath,validate)
  .then((links)=>{
    msgCow=`Files reading successfully!!\n and ${links.length} links were found\n Next you can the stats`
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
  