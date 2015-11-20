---
layout: post
title: Scaling with Asynchronous Logic
author: Brandon Goode
permalink: post/scaling-with-asynchronous-logic/
excerpt_separator: <!--more-->
tags:
  - nodejs
  - AutomateGeen

---

For Automate Green, asynchronous equates to scalable.  We have a large number of devices to poll for status updates.   Instead of the standard synchronous model of waiting for each response, we use an asynchronous model to scale without needing additional hardware.

<!--more-->

## Synchronous Requests

If you look at polling a large number of devices, the synchronous model quickly runs into a limitation.  Let's assume the following:

* Each request takes approximately 500 ms
* Poll each device once every 10 minutes

This means the maximum number of devices you can poll with this synchronous model is 1200.

This is not scalable.  To overcome this, you must have more threads or processes running in parallel.  This is feasible, but it requires much more complex code.

## Asynchronous

With an asynchronous model, the request is not blocked while waiting for a response.  As soon as the first request is sent, the second request is sent, regardless of when the first request gets a response.  This reduces the waiting down to the time it takes the system to process the request and respond.  Let's use the same assumption as above and add the following detail.

* It takes 20 ms for the system to process the response

Now, the maximum number of devices the same system can poll is 30,000.

As you can see, this increases the capacity substantially.

## Node.js

Since asynchronous logic is the primary model for Node.js (and JavaScript), it only makes sense to utilize this model.  Node's asynchronous model allows for us to create a scalable solution with minimal complexity.

