// action/hello-splectrum

function execute_action (input) { 
    input.value = `Hello from SPlectrum to ${input.value.person} !`
    input.headers.status = "completed";
    return input 
}

exports.default = execute_action;