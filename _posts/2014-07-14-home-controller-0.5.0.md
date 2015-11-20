---
layout: post
title: home-controller 0.5.0
author: Brandon Goode
permalink: post/home-controller-0.5.0/
excerpt_separator: <!--more-->
tags:
  - HomeAutomation
  - INSTEON
  - Hub
  - HomeControllerAPI
  - nodejs

---

Version 0.5.0 of the [home-controller](https://github.com/automategreen/home-controller) Node.js package has been released.

**0.5 Update Hightlights:**

  - Added events for devices
  - Added sensors support (motion, door, & leak)
  - Bug fixes

<!--more-->

## Changes

Details of the API can be found on [GitHub ReadMe Page](https://github.com/automategreen/home-controller).

### Events

Lighting and thermostat events were added to the lighting and thermostat objects.

**Lighting Example:**
```js
var hub = new Insteon();
var light = hub.light('112233');

light.on('turnOn', function () {
  sendTxt('My light is on');
});

hub.connect(...);
```

**Thermostat Example:**
```js
var hub = new Insteon();
var thermostat = hub.thermostat('112233');

var count = 0;
thermostat.on('cooling', function () {
  console.log('AC turned count:', ++count);
});

hub.connect(...);
```

#### Event Behavior Control

- insteon.emitOnAck - Emit events when ACK is received
- insteon.emitDuplicates - Emit duplicate events

#### Lighting Events

- turnOn - light's on button is tapped once
- turnOnFast - light's on button is tapped twice
- turnOff - light's off button is tapped once
- turnOffFast - light's off button is tapped twice
- brightening - light's on button is held
- brightened - light's on button is released
- dimming - light's off button is held
- dimmed - light's off button is released

#### Thermostat Events

- cooling - thermostat starts cooling
- heating - thermostat starts heating
- off - thermostat stops heating or cooling (i.e. system is off)
- highHumidity - humidity goes above the high humidity set point
- lowHumidity - humidity goes below the low humidity set point
- normalHumidity - humidity returns to normal levels

### Sensors

Support for motion, door (open/close), and leak sensors has been added.  These Insteon devices' main functionality are their event triggers.

#### Motion Sensor

- insteon.motion - Creates a Motion object
- motion.status - Gets the motion sensors status
- motion.options - Sets the motions sensor options
- motion.clearTimer - Sets the clear timer timeout for the motion sensor
- motion.duskThreshold - Sets the dusk light level threshold for the motion sensor

**Events**
- motion - motion is detected
- clear - clear timer expires after motion was detected
- dawn - light level crosses the dusk threshold from night to day
- dusk - light level crosses the dusk threshold from day to night
- battery - the battery is low

#### Door Sensor

- insteon.door - creates a Door object

**Events**

- opened - the sensor is opened
- closed - the sensor is closed
- heartbeat - informs that sensor is alive

#### Leak Sensor

- insteon.leak - creates a Leak object

**Events**

- dry - the sensor no longer detects moisture
- wet - the sensor detects moisture
- heartbeat - informs that sensor is alive

<hr>

*Want a feature or function added to the package?  Let me know; leave a comment, open an [issue](https://github.com/automategreen/home-controller/issues), or contact me [@brandongoode](https://twitter.com/brandongoode)*
