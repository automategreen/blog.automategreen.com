---
layout: post
title: Insteon Blinking Node.js App
author: Brandon Goode
permalink: post/insteon-blink-demo
excerpt_separator: <!--more-->
tags:
  - HomeAutomation
  - INSTEON
  - Hub
  - HomeControllerAPI
  - nodejs
  - home-controller-examples

---

This is a quick example of a simple Node.js application using the [home-controller](https://github.com/automategreen/home-controller) module.

To start, we need to add the home-controller module to our package. (I'll assume your package.json exists).

```sh
npm install home-controller --save
```

We can start with the following template for using the Insteon class from the home-controller module.

```js
var Insteon = require('home-controller').Insteon;
var gw = new Insteon();

var host = '192.168.10.10'; // Hub IP Address

gw.connect(host, function () {
  // connected to the Insteon Hub
}
```

<!--more-->

The  `connect` function is used to initiate the connection to the Hub.  Once we are connected to the Hub, we can send it commands. To start, let's check the current light level and see if the light is on or off.

```js
var device = 'AABBCC'; // Insteon light switch ID

gw.connect(host, function () {
  // connected to the Insteon Hub

  // check current light level
  gw.level(device, function (err, level) {
    if(level > 0) {
      console.log('Light is ON');
    } else {
      console.log('Light is OFF');
    }
  });
}
```

So if the light is off, we'll turn it on and vice versa.

```js
gw.level(device, function (err, level) {
  if(level > 0) {
    gw.turnOff(device, function(err) {
      console.log('Turned Light Off');
    })
  } else {
    gw.turnOn(device, function(err) {
      console.log('Turned Light On');
    })  }
});
```

Now for a little fun,  we will recursively call turnOn and turnOff indefinitely (maybe with a nice 1 second delay between them).

```js
function blinkOn (err) {
  setTimeout(function () {
    console.log('Turn On ' + device);
    gw.turnOn(device, blinkOff);
  }, 1000);
}

function blinkOff (err) {
  setTimeout(function () {
    console.log('Turn Off ' + device);
    gw.turnOff(device, blinkOn);
  }, 1000);
}
```

Put it all together with a little error handling and it looks something like the following.

```js
var Insteon = require('home-controller').Insteon;
var gw = new Insteon();

var host = '192.168.10.10'; // Hub IP Address
var device = 'AABBCC'; // Insteon light switch ID

gw.on('close', function() {
  console.log('Connection closed');
});

gw.connect(host, function () {
  gw.level(device, function (err, level) {
    if(level > 0) {
      blinkOff();
    } else {
      blinkOn();
    }
  });
});

function blinkOn (err) {
  if(err) {
    return gw.close();
  }
  setTimeout(function () {
    console.log('Turn On ' + device);
    gw.turnOn(device, blinkOff);
  }, 1000);
}

function blinkOff (err) {
  if(err) {
    return gw.close();
  }
  setTimeout(function () {
    console.log('Turn Off ' + device);
    gw.turnOff(device, blinkOn);
  }, 1000);
}
```

I've pushed a complete working example to [GitHub](https://github.com/automategreen/blog-examples/tree/master/insteon-blink-demo).

*Want more details?  Did the post miss something or have an error?  Let me know; leave a comment or contact me [@brandongoode](https://twitter.com/brandongoode)*
