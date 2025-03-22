// execute/complete
// finalises execution of a request

function execute_complete ( input ) {
        input.headers.action = "";
        input.headers.status = "completed";
        input.value = null;
        return input;
    }

exports.default = execute_complete;
