// command/hello-splectrum

function execute_action (input) { 
    input.headers.pipeline = [ { "headers": { "action": "action/hello-splectrum" } }, { "headers": { "action": "console/log" } } ];
    input.headers.status = "new-pipeline";
    return input 
}

exports.default = execute_action;