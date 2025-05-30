
const fs = require('fs'); 

fs.watch("./runtime/queue", (eventType, filename) => { 
  console.log("\nWatcher has triggered: ", eventType, " ", filename, " !!!"); 
  if (fs.existsSync(`./runtime/queue/${filename}`)&&eventType=="rename") {
    console.log("\nThe file", filename, "was added to the queue!"); 
    var requestRaw = fs.readFileSync(`./runtime/queue/${filename}`);
    var request = JSON.parse(requestRaw);
    console.log(request);
    var action = request.headers.action;
    const executor = require(`./packages/${action}`).default;
    var output = executor(request);
    console.log(output);
    output = JSON.stringify(output);

    fs.writeFileSync(`./runtime/${action}/${filename}`, output);
    fs.writeFileSync(`./runtime/processed/${filename}`, requestRaw);

    console.log("Action being executed: " + action);
    if(action!="execute/complete") {
      let x = Math.floor((Math.random() * 1000)).toString();
      var newName = `${Date.now().toString()}_${x}.json`;
      console.log("Writing next request to the queue: " + newName);

      fs.writeFileSync(`./runtime/queue/${newName}`, output);

    }

    fs.unlinkSync(`./runtime/queue/${filename}`)
  }

}); 

