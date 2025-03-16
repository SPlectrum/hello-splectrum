# Action and Execution Context Message Format

Below is a naive execution flow which works when executed by *spl* from the command line.  
However, proper execution requires them to be executed in an execution context. See below for the same naive flow embedded in an execution context.

```
// execution flow : commandline input: parse command --> execute request --> return output

// the commandline input gets parsed
{
  "headers": [
    "action": "command/parse" ],
    "status": "pending"
  "value": "spl hello-splectrum my friends"
}
{
  "headers": [
    "action": "command/parse",
    "status": "completed" ],
  "value": {
    "headers": [
      "action": "action/hello-splectrum"
      "status": "pending" ],
    "value": { "person": "my friends" }
  }
}

// The action is then executed
{
  "headers": [
    "action": "action/hello-splectrum",
    "status": "pending"
  ],
  "value": { "person": "my friends" }
}
{
  "headers": [
    "action": "action/hello-splectrum",
    "status": "completed"
  ],
  "value": "Hello from SPlectrum to my friends !"
}

// The result is returned to the console
{
  "headers": [
    "action": "console/log",
    "status": "pending"
  ],
  "value": "Hello from SPlectrum to my friends !"
}
```
---
```
// Once the request is entered into the execution pipeline it gets wrapped in an execution context wrapper
// Below are some states of that execution pipeline - the example will showcase a full execution plan
{
  "headers": [
    "action": "execute/prepare"
  ]
  "value": {
    "headers": [
      "action": "request/commandline"
      "status": "pending"
    ],
    "value": "spl hello-splectrum my friends"
  }
}

// the execution context prepares the request by setting an execution plan
{
  "headers": [
    "action": "request/parse"
  ]
  "value": {
    "headers": [
      "action": "request/parse"
      "status": "pending"
    ],
    "value": "spl hello-splectrum my friends"
  }
}

// this returns a subsequent action upon completion
{
  "headers": [
    "action": "execute/complete"
  ]
  "value": {
    "headers": [
      "action": "internal/hello-splectrum"
      "status": "pending"
    ],
    "value": { "person": "my friends" }
  }
}

// this action is schedule for execution
{
  "headers": [
    "action": "internal/hello-splectrum"
  ]
  "value": {
    "headers": [
      "action": "internal/hello-splectrum"
      "status": "pending"
    ],
    "value": { "person": "my friends" }
  }
}

// action completed - request completed
{
  "headers": [
    "action": "execute/complete"
  ]
  "value": {
    "headers": [
      "action": "internal/hello-splectrum"
      "status": "complete"
    ],
    "value": "Hello from SPlectrum to my friends !"
  }
}
```
---
