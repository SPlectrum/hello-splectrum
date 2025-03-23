// execute/next
// executes next action and sets next execute command

function execute_next ( input ) {

    var action = input.value.headers.action;
    const executor = require(`../../../packages/${action}`).default;
    input.value = executor(input.value);
    switch(input.value.headers.status){
        case "new-command": input.headers.action = "execute/set-command"; break;
        case "new-pipeline": input.headers.action = "execute/set-pipeline"; break;
        case "completed": input.headers.action = "execute/set-next"; break;
        default: input.headers.action = "execute/action-error";
    }
    return input;
}

exports.default = execute_next;
