// execute/initialise
// entry point for request executio, initialise execution

function execute_initialise ( input ) {
    input.headers.action = "execute/next";
    input.headers.status = "executing";
    return input;
}

exports.default = execute_initialise;