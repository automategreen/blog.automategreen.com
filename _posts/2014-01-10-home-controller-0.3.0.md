---
layout: post
title: home-controller 0.3.0
author: Brandon Goode
permalink: post/home-controller-0.3.0/
excerpt_separator: <!--more-->
tags:
  - HomeAutomation
  - INSTEON
  - Hub
  - HomeControllerAPI
  - nodejs

---

Version 0.3.0 of the [home-controller](https://github.com/automategreen/home-controller) Node.js package has been released.

This release changes the underlying protocol used to transport the PLM commands.  The API now uses the direct PLM over TCP interface and no longer uses the HTTP interface.

![Node.js](/assets/posts/nodejs.png)

<!--more-->

## Changes

Details of the API can be found on [GitHub ReadMe Page](https://github.com/automategreen/home-controller).

Two functions were added to the Insteon API:

- connect - used to create a connection (TCP socket) to the hub
- close - closes the connection

The Insteon class now extends the EventEmmitter class and emits several events:

- connect
- close
- command
- error

In addition, the following function names were updated to remove a name conflict with the EventEmitter class:

- on -> turnOn
- onFast -> turnOnFast
- off -> turnOff
- offFast -> turnOffFast

## Command Line Utility

The 0.3.0 release includes a new function to the command line utility.  The `insteon plm` feature allows you to send raw PLM commands from the terminal.

Install the home-controller package globally to expose the utility.

```sh
$ npm install -g home-controller
```

```sh
$ insteon -h

  Usage: insteon [options] [command]

  Commands:

    link <gateway> <device> link device(s) to a gateway
    map <gateway>          map the Insteon network
    plm <gateway>          PLM interface to gateway
    help [cmd]             display help for [cmd]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

```sh
$ $ ./insteon plm -h

  Usage: insteon-plm host [port]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

## Reason for the Connection Change

### Bi-directional

The direct PLM connection is bi-directional.  This means as soon as commands are received by the PLM, they are sent to the API. In addition, unsolicited commands can now be supported.

### Faster

The direct PLM connection is much faster.  The latency is reduced and the bi-direction interface removes the need to poll the Hub.

### Stability

Because the messages aren't buffered on the Hub, there is less risk in them being overwritten.

<hr>

*Want a feature or function added to the package?  Let me know; leave a comment or contact me [@brandongoode](https://twitter.com/brandongoode)*
