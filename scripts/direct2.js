var person = process.argv.slice(2).join(" ");
console.log(`spl  ${person}`);

var steps = [ 
  { "headers": { "action": "command/parse" } },
  { "headers": { "action": "action/hello-splectrum" } },
  { "headers": { "action": "console/log" } } ]

var actions = {
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

function execute_actions ( input ) {
  for(var i=0; i<steps.length; i++)
  {
    var step = steps[i];
    step.value = person;
    var action = step.headers.action
    step = actions[action](step)
    console.log(JSON.stringify(step, null, 2));
    person = step.value;
  }
}

execute_actions(person);