---
layout: post
title: Insteon Hub Raw PLM
author: Brandon Goode
permalink: post/insteon-hub-raw-plm
excerpt_separator: <!--more-->
tags:
  - HomeAutomation
  - INSTEON
  - Hub
  - HomeControllerAPI
  - nodejs
  - UnderTheInsteonHubHood

---

This post gives an overview of the functionality provided by the Insteon Hub's Raw PLM interface. This is the second of a [series](/tag/undertheinsteonhubhood/) of posts about the Insteon Hub. The first post, [Under the Insteon Hub Hood](/post/under-the-insteon-hub-hood), focused on the Hub's main HTTP interface.

The Hub's PLM interface is exposed as both a resource via HTTP and directly over TCP.  This post details the raw TCP PLM interface.

![Hub TCP Flow](/assets/posts/hub-tcp-flow.png)

<!--more-->

## Raw PLM Interface Overview

The raw PLM interface is exposed on port 9761 of the Hub. It allows for a single TCP connection to be established.  Once connected, the Hub will send and receive PLM messages directly on the TCP socket.   The messages are the binary PLM commands (vs. the hex string in the HTTP interface).

Update 1-11-2014: PLM messages can be split across multiple datagrams and multiple messages can be combined into a single datagram.  In addition, not all messages are sent from the PLM correctly.  Buffering and error detection is required.

## Node.js Client

Let's create a quick TCP socket client using Node.js to expose the raw interface.

### Connecting to the Hub

To start, we need to connect to the Hub's PLM interface. To do this, we'll use the `net` module. The example below opens a TCP client socket to the Hub and then closes it.

```js

var net = require('net');

var host = 192.168.1.10; // update with your Hub's IP
var port = 9761;

var client = new net.Socket();

client.on('connect', function() {
  console.log('Connected to: ' + host + ':' + port);
  client.end();
});

client.on('close', function() {
  console.log('Connection closed');
});

client.connect(port, host);
```

If it connects successfully, then you should see:

```
Connected to: 192.168.1.10:9761
Connection closed
```

### Sending and Receiving a Command

Now that we can connect to the Hub, we can send a command. This can be done with the`client.write(data)` function.

The command must be encoded as binary. In most the documentation, the PLM commands are hex strings. To encode the data correctly, the `write` function can take a second parameter to specify the encoding:`client.write(data, 'hex')`.

When the Hub sends back data, the client `'data'` event is fired.  This can be used to parse the PLM command responses. The data must be encoded from binary to a hex string.  This can be done by setting the client encoding to 'hex':`client.setEncoding('hex')`.

Below are the updates to send an info request to the PLM.

```js
...

var cmd = '0260'; // Get PLM info

var client = new net.Socket();
client.setEncoding('hex');

client.on('connect', function() {
  console.log('Connected to: ' + host + ':' + port);
  client.write(cmd, 'hex');
});

client.on('data', function(data) {
  console.log('Rsvd:', data);
  client.end();
});

...
```

If the command is successful, you should see:

```
Connected to: 192.168.1.10:9761
Rsvd: 0260aabbcc03379c06
Connection closed
```

PLM ID: aabbcc
Device Category: 03 (Network Bridges)
Device Subcategory: 37
Firmware version: 9c

This can be modified to any PLM command.

### Complete Code Example

Below is the complete example code for our Node.js utility.  The example below can be run from the terminal.

Update: Example code upload to GitHub: [raw.js](https://github.com/automategreen/blog-examples/blob/master/insteon-hub-raw-plm/raw.js)

```js
#!/usr/bin/env node
'use strict';

var net = require('net');

var host = process.argv[2];
var port = 9761;
if(process.argv.length > 4) {
  port = process.argv[3];
}

var client = new net.Socket();
client.setEncoding('hex');

client.on('connect', function() {
  console.log('Connected to: ' + host + ':' + port);

  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', function (cmd) {
    cmd = cmd.trim();
    if (/^(quit|exit|q)$/i.test(cmd)) {
      client.end();
    } else {
      console.log('Send:', cmd);
      client.write(cmd, 'hex');
    }
  });

});

client.on('data', function(data) {
  console.log('Rsvd:', data);
});

client.on('close', function() {
  console.log('Connection closed');
  process.exit();
});

client.connect(port, host);
```

Below is an example of the utility being used to get the PLM info.

```
$ ./raw.js 192.168.1.122
Connected to: 192.168.1.122:9761
0260
Send: 0260
Rsvd: 0260aabbcc03379c06
exit
Connection closed
```

<hr>

*Want more info?  Did the post miss something or have an error?  Let me know; leave a comment or contact me [@brandongoode](https://twitter.com/brandongoode)*
