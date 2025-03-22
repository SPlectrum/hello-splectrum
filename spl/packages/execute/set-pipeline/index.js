// execute/set-pipeline
// set new pipeline (header -> header)

function execute_set_pipeline ( input ) {
    input.headers.action = "execute/set-next";
    input.headers.status = "pending";
    input.headers.pipeline = input.value.headers.pipeline;
    input.value.headers.status = "completed";
    return input;
}

exports.default = execute_set_pipeline;