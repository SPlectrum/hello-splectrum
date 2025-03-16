# Action and Execution Context Message Format

Illustration of the message format for a naive execution flow which works when executed by *spl* from the command line.

However, proper execution requires them to be executed in an execution context.  
See the next block below for the same naive flow embedded in an execution context.

```
// execution flow : commandline input: parse command --> execute request --> return output

// the commandline input gets parsed
{
  "headers": [
    "action": "command/parse",
    "status": "pending" ],
  "value": "spl hello-splectrum my friends"
}
{
  "headers": [
    "action": "command/parse",
    "status": "completed" ],
  "value": {
    "headers": [
      "action": "action/hello-splectrum",
      "status": "pending" ],
    "value": { "person": "my friends" }
  }
}

// The action is then executed
{
  "headers": [
    "action": "action/hello-splectrum",
    "status": "pending" ],
  "value": { "person": "my friends" }
}
{
  "headers": [
    "action": "action/hello-splectrum",
    "status": "completed" ],
  "value": "Hello from SPlectrum to my friends !"
}

// The result is returned to the console
{
  "headers": [
    "action": "console/log",
    "status": "pending" ],
  "value": "Hello from SPlectrum to my friends !"
}
```
---
```
// The flow below gives some indication of how request execution interacts with the execution context.  
// This is a simple illustration, the actual setup will use a proper pipeline definition in the header.
{
  "headers": [
    "action": "execute/next" ],
  "value": {
    "headers": [
      "action": "command/parse",
      "status": "pending" ],
    "value": "spl hello-splectrum my friends"
  }
}
{
  "headers": [
    "action": "execute/next" ],
  "value": {
    "headers": [
      "action": "command/parse",
      "status": "set-command" ],
    "value": {
      "headers": [
        "action": "action/hello-splectrum",
        "status": "pending" ],
      "value": { "person": "my friends" }
    }
  }
}

// the execution context prepares the request by setting an execution plan
{
  "headers": [
    "action": "exec/next"
  ]
  "value": {
    "headers": [
      "action": "action/hello-splectrum",
      "status": "pending" ],
    "value": { "person": "my friends" }
  }
}

// this returns a subsequent action upon completion
{
  "headers": [
    "action": "execute/next" ],
  "value": {
    "headers": [
      "action": "action/hello-splectrum",
      "status": "set-command" ],
    "value": {
      "headers": [
        "action": "console/log",
        "status": "pending" ],
      "value": "Hello from SPlectrum to my friends !"
    }
  }
}

// this action is schedule for execution
{
  "headers": [
    "action": "exec/next" ],
  "value": {
    "headers": [
      "action": "console/log",
      "status": "pending" ],
    "value": "Hello from SPlectrum to my friends !"
  }
}

// action completed - request completed
{
  "headers": [
    "action": "exec/next" ],
  "value": {
    "headers": [
      "action": "console/log",
      "status": "complete" ],
    "value": "Hello from SPlectrum to my friends !"
  }
}
```
---
