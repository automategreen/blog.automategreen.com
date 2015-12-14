---
layout: post
title: Insteon Event Handling API Example
author: Brandon Goode
permalink: post/insteon-event-demo/
excerpt_separator: <!--more-->
tags:
  - HomeAutomation
  - INSTEON
  - Hub
  - HomeControllerAPI
  - nodejs
  - home-controller-examples

---

This is an example of an application using lighting and motion events provided by the [home-controller](https://github.com/automategreen/home-controller) module.

We'll be looking at how to use the following asynchronous event logic to make complex home automation logic.

**Lighting Turn On Event**

```js
light('insteonId').on('turnOn', function () {
  ...
});
```

**Motion Sensor Event**

```js
motion('insteonId').on('motion', function () {
  ...
});
```

<!--more-->

For this example, let's say we want to send ourselves and email when motion is detected; however, we don't want the email when the lights are on.  We only want the email when the lights are off and motion is detected.

## App Framework

To start, we need to add the home-controller module to our package. (I'll assume your package.json exists).

```sh
npm install home-controller --save
```

We can start with the following template for using the Insteon class from the home-controller module.

```js
var Insteon = require('home-controller').Insteon;
var hub = new Insteon();

var host = '192.168.1.23'; // Hub IP Address

hub.connect(host, function () {
  // connected to the Insteon Hub
}
```


## Detecting Motion

Now we need to know when the motion sensor senses motion.  This can be done by adding an event listener to the motion object.

First, we create the motion object:

```js
var motion = hub.motion(motionId);
```

The event emitted when motion is detected is simply `'motion'`.  We need to add a listener for this event:

```js
motion.on('motion', function () {
  sendEmail('Motion detected for ' + this.id);
});
```

Notice `this` is the motion object in the event listener callback function.  This is useful when you want to use the same function for multiple sensors.

Now we can send a email when motion is detected, but that only part of the objective.  We only want to send the email when the lights are off and we detect motion. 

## Determining the Light's State

The simplest way to determine the light's state is to query the light switch with a `level` command. Then, if the level is 0, the light is off, and we know to send the email

```js
motion.on('motion', function () {
  light.level(function(level) {
    var isLightOff = !level;
    if(isLightOff) {
      sendEmail('Motion detected while lights off for ' + motion.id);
    }
  });
});
```

But this post isn't about how to use basic commands; its about Insteon events.

## Using Light Events

All Insteon devices emit event.  The light switch emit several, but, for this post, let's just look at the standard 'turnOn' and 'turnOff' events.

Instead of polling the light switch each time motion is detected, we could just keep track of the light's state by listening for it's events.

```js
var isLightOff;

light.on('turnOn', function () {
  isLightOff = false;
});

light.on('turnOff', function () {
  isLightOff = true;
});
```

Now we don't have to poll the light except when the application first connects to the hub.

## Putting It All Together

The final example look something like this:

```js
var light = hub.light(lightId);
var motion = hub.motion(motionId);

var isLightOff;

light.on('turnOn', function () {
  isLightOff = false;
});

light.on('turnOff', function () {
  isLightOff = true;
});

motion.on('motion', function () {
  if(isLightOff) {
    sendEmail('Motion detected for ' + this.id);
  }
});

hub.connect(process.env.HUB_IP, function () {
  light.level(function(level) {
    isLightOff = !level;
  });
});
```


<hr>

*Want more details?  Did the post miss something or have an error?  Let me know; leave a comment or contact me [@brandongoode](https://twitter.com/brandongoode)*
