//const process_req = require('process');

var person = process.argv.slice(2).join(" ");
console.log(`spl  ${person}`);

var step1in = {
    "headers": { "action": "command/parse", "status": "pending" },
    "value": "spl hello-splectrum " + person
  }
console.log(JSON.stringify(step1in, null, 2));

var step1out = {
    "headers": { "action": "command/parse", "status": "complete" },
    "value": { "person": person }
    
  }  
console.log(JSON.stringify(step1out, null, 2));

var step3in = {
    "headers": { "action": "action/hello-splectrum", "status": "pending" },
    "value": { "person": person }
}
console.log(JSON.stringify(step3in, null, 2));

var step3out = {
    "headers": { "action": "action/hello-splectrum", "status": "completed" },
    "value": `Hello from SPlectrum to ${person} !`
}
console.log(JSON.stringify(step3out, null, 2));

var step4in = {
    "headers": { "action": "console/log", "status": "pending" },
    "value": `Hello from SPlectrum to ${person} !`
}
console.log(JSON.stringify(step4in, null, 2));
  
var step4out = {
    "headers": { "action": "console/log", "status": "completed" },
    "value": `Hello from SPlectrum to ${person} !`
}
console.log(JSON.stringify(step4out, null, 2));
          