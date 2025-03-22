// execute/set-next
// sets next action from pipeline

function execute_set_next ( input ) {
    if (input.headers.pipeline.length > 0) {
        var action = input.headers.pipeline.shift();
        action.value = input.value.value;
        input.value = action;
        input.headers.action = "execute/next";
    } else input.headers.action = "execute/complete";
    return input;
}

exports.default = execute_set_next;
