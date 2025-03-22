// execute/set-command
// replaces current action with a new action command (data -> header), returns execute/next

function execute_set_command ( input ) {
    input.value = input.value.value;
    input.headers.action = "execute/next";
    return input;
}

exports.default = execute_set_command;