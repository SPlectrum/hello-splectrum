
const fs = require('fs'); 

var input = "spl " + process.argv.slice(2).join(" ");

var startExecute = {
    "headers": { "action": "execute/initialise", "status": "new" },
    "value": {
        "headers": { "action": "command/parse", "status": "pending" },
        "value": input
    }
}

// create filename consisting of timestamp and random number
console.log(Date.now())

fs.writeFileSync(`./runtime/queue/${Date.now().toString()}.json`, JSON.stringify(startExecute));
