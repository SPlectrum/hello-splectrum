# hello-splectrum

The initial POC implementing the request context and flow for some simple Hello World type functionality.

The POC aims to cover the following through a number of iterations:
 - start with a simple direct execution of the hello-splectrum steps
 - create a single pipeline and request execution plan
 - set up the execution context
 - create a deployable asset.

---

This is in prepration to achieve MVP for SPlectrum:
 - installable exe with example command
 - it should update an existing install
 - create the main folder structure
 - implement runtime with sessions
 - use SPlectrum actions for install

---

Implementation in node.js.  
Aim to create a deployable asset straight away using [forever or pm2](https://www.geeksforgeeks.org/how-to-run-a-node-js-application-permanently/?ref=ml_lbp).  

---

This initial POC contains the journey that leads to the MVP of wrapper of SPlectrum.  
The wrapper is named *spl*.  
The MVP creates an installable asset with the right structure so that SPlectrum can be created within through the use of packages.

---
