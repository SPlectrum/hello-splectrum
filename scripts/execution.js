var person = process.argv.slice(2).join(" ");
var request = `spl hello-splectrum ${person}`;
console.log(request);

var actions = {

    "command/hello-splectrum": function (input) { 
        input.headers.pipeline = [ { "action": "action/hello-splectrum" }, { "action": "console/log" } ];
        input.headers.status = "set-pipeline";
        return input 
    },

    "command/parse": function (input) { 
        input.headers.status = "completed";
        return input 
    },

    "action/hello-splectrum": function (input) { 
        input.value = `Hello from SPlectrum to ${input.value} !`
        input.headers.status = "completed";
        return input 
    },

    "console/log": function (input) { 
        console.log(input.value);
        input.headers.status = "completed";
        return input 
    } 
}
  
// Create parse request from commandline entry
var startExecute = {
    "headers": { "action": "execute/next" },
    "value": {
      "headers": { "action": "command/parse", "status": "pending" },
      "value": "spl hello-splectrum my friends" 
    }
  }

// Inject parsed command into the execution context


// Load the execution pipeline


// Execute the commands