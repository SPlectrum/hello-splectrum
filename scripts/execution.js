var person = process.argv.slice(2).join(" ");
var request = `spl hello-splectrum ${person}`;
console.log(request);

var actions = {

    "command/hello-splectrum": function (input) { 
        input.headers.pipeline = [ { "headers": { "action": "action/hello-splectrum" } }, { "headers": { "action": "console/log" } } ];
        input.headers.status = "new-pipeline";
        return input 
    },

    "command/parse": function (input) { 
        line = input.value.split(" ");
        var action = line[1];
        var person = line.slice(2).join(" ");
        input.headers.status = "new-command";
        input.value = {
            "headers": { "action": "command/" + line[1], "status": "pending" },
            "value": { "person": person } 
          }
        return input 
    },

    "action/hello-splectrum": function (input) { 
        input.value = `Hello from SPlectrum to ${input.value.person} !`
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
    "headers": { "action": "execute/initialise", "status": "new" },
    "value": {
      "headers": { "action": "command/parse", "status": "pending" },
      "value": "spl hello-splectrum " + person
    }
  }

// execute/complete
// flags the current request as execution complete
var execute = {
    // execute/action-error
    // handle action errors

    // execute/completed
    // finalises execution of a request
    "execute/complete": function ( input ) {
        input.headers.action = "";
        input.headers.status = "completed";
        input.value = null;
        return input;
    },

    // execute/error
    // handle execution context errors

    // execute/initialise
    // entry point for request executio, initialise execution
    "execute/initialise": function ( input ) {
        input.headers.action = "execute/next";
        input.headers.status = "executing";
        return input;
    },
    // execute/next
    // executes next action and sets next execute command
    "execute/next": function ( input ) {
        input.value = actions[input.value.headers.action](input.value);
        switch(input.value.headers.status){
            case "new-command": input.headers.action = "execute/set-command"; break;
            case "new-pipeline": input.headers.action = "execute/set-pipeline"; break;
            case "completed": input.headers.action = "execute/set-next"; break;
            default: input.headers.action = "execute/action-error";
        }
        return input;
    },

    // execute/set-command
    // replaces current action with a new action command (data -> header), returns execute/next
    "execute/set-command": function ( input ) {
        input.value = input.value.value;
        input.headers.action = "execute/next";
        return input;
    },

    // execute/set-next
    // sets next action from pipeline
    "execute/set-next": function ( input ) {
        if (input.headers.pipeline.length > 0) {
            var action = input.headers.pipeline.shift();
            action.value = input.value.value;
            input.value = action;
            input.headers.action = "execute/next";
        } else input.headers.action = "execute/complete";
        return input;
    },

    // execute/set-pipeline
    // set new pipeline (header -> header)
    "execute/set-pipeline": function ( input ) {
        input.headers.action = "execute/set-next";
        input.headers.status = "pending";
        input.headers.pipeline = input.value.headers.pipeline;
        input.value.headers.status = "completed";
        return input;
    },
}

function execute_request ( input) 
{
    console.log(input);
    var doNext = 12;
    while(doNext-- > 0) {
        input = execute[input.headers.action] (input);
        console.log(input);
        if(input.headers.status=="completed") doNext = 0;
    }
}
execute_request(startExecute);
