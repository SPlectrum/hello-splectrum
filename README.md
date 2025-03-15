# hello-splectrum

The initial POC implementing the request context and flow for some simple Hello World type functionality.

---
Here are some initial ideas - but need to restructure and correct them.

Setting up and testing an initial execution context and request execution flow.  
Thinking of doing it using bash and inotify or with javascript filewatch - no decision made yet.  

![image](https://github.com/user-attachments/assets/6192afa9-f9dc-494a-bc9c-9e0bd22ccb82)

The aim of the Hello Splectrum example is to set up a simple folder based stream example that processes a request.  
It should process using a consumer publisher pattern and acts as validation of an initial approach which then can be reused.

It will also involve having initial thoughts about runtime etc.
and an analysis of the record structure used for the implementation.

---

Execution request requires two execution contexts.  
There is the context for the specific requests to be executed.  
But there is also a context for the execution manager.  
The property names used in this example are experimental.

This Hello SPlectrum example is not trivial - it will set up the core of the execution engine.  
The execution flow will use a single execution queue, executed request end up in the done queue.

---
```
// execution flow : commandline --> create request --> execute request

// request gets wrapped in a streaming data record
{
  "headers": [
    "action": "request/commandline"
    "status": "pending"
  ],
  "value": "spl hello-splectrum my friends"
}

// request gets parsed into an internal action
{
  "headers": [
    "action": "internal/hello-splectrum"
    "status": "pending"
  ],
  "value": { "person": "my friends" }
}

// 
{
  "headers": [
    "action": "internal/hello-splectrum"
    "status": "complete"
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
