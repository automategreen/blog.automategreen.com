---
layout: post
title: home-controller 0.2.0
author: Brandon Goode
permalink: post/home-controller-0.2.0/
excerpt_separator: <!--more-->
tags:
  - HomeAutomation
  - INSTEON
  - Hub
  - HomeControllerAPI
  - nodejs
---

Version 0.2.0 of the [home-controller](https://github.com/automategreen/home-controller) Node.js package has been released. Main updates include:

  - Adds several new functions to the Insteon API
  - Includes a new command line utility
  - Improves the package's performance

![Node.js](/assets/posts/nodejs.png)

<!--more-->

## New Functions

Several new functions were added to the Insteon API.  Details of the API can be found on [GitHub ReadMe Page](https://github.com/automategreen/home-controller)

- link - Links device(s) to the Insteon Hub
- unlink - Unlinks device(s) from the Insteon Hub
- scene - Creates and modifies an Insteon scene
- version - Gets the version information about a device
- ping - Sends an Insteon ping to a device

## Command Line Utility

The 0.2.0 release includes a new command line utility.  The utility allows for you to control your Insteon network from the command prompt.

Install the home-controller package globally to expose the utility.

```sh
$ npm install -g home-controller
```

The initial release of the utility only has two features exposed: link and map.  We plan to add many more in future releases.

```sh
$ insteon --help

  Usage: insteon [options] [command]

  Commands:

    link <gateway> <device> link device(s) to a gateway
    map <gateway>           map the Insteon network
    help [cmd]              display help for [cmd]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

```sh
$ insteon help link

  Usage: insteon-link [options] <user:pass@host:port> <device ...>

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    -c, --controller    devices are the controller
    -u, --unlink        unlink devices from gateway
    -g, --group <type>  group number to use for links
```

```sh
$ insteon help map

  Usage: insteon-map <user:pass@host:port>

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

## Performance Improvements

### Faster

The logic for checking the Hub's buffer has been reworked.  This allows for successful response to be returned quickly.

### Stability

The logic now checks the buffer for all commands to ensure they were completed prior to calling the callback function.  This greatly improves the package's stability and prevents Insteon messaging from overlapping.

## Bug Fixes

A large number of bugs were corrected. This also helped with the package's stability.

<hr>

*Want a feature or function added to the package?  Let me know; leave a comment or contact me [@brandongoode](https://twitter.com/brandongoode)*
