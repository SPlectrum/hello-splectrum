// command/parse

function execute_action (input) { 
    line = input.value.split(" ");
    var action = line[1];
    var person = line.slice(2).join(" ");
    input.headers.status = "new-command";
    input.value = {
        "headers": { "action": "command/" + line[1], "status": "pending" },
        "value": { "person": person } 
      }
    return input 
}

exports.default = execute_action;
