
const fs = require('fs'); 
  
fs.watch("./test", (eventType, filename) => { 
  console.log("\nThe file", filename, "was modified!"); 
  console.log("The type of change was:", eventType); 
  if (fs.existsSync(`./test/${filename}`)&&eventType=="rename") {
    console.log("File exists!!! PROCESSING");
  }
}); 


