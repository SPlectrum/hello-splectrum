# Action and Execution Context Message Format

```
// execution flow : commandline input: parse command --> execute request --> return output

// request gets wrapped in a streaming data record
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

// request gets parsed into an internal action
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

// 
{
  "headers": [
    "action": "console/log",
    "status": "pending"
  ],
  "value": "Hello from SPlectrum to my friends !"
}
```
---
