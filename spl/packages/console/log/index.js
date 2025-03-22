// console/log

function execute_action (input) { 
    console.log(input.value);
    input.headers.status = "completed";
    return input 
} 

exports.default = execute_action;