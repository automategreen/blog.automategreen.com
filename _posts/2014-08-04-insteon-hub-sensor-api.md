---
layout: post
title: Insteon Hub - Sensor API
author: Brandon Goode
permalink: post/insteon-hub-sensor-api
excerpt_separator: <!--more-->
tags:
  - HomeAutomation
  - INSTEON
  - Hub
  - HomeControllerAPI
  - nodejs
  - UnderTheInsteonHubHood

---

Control of Insteon sensors differs from other Insteon devices.  Unlike many Insteon devices that control your home, sensors don't directly control anything. They are used to trigger changes.  This means the API is not about how to control a device. Rather, the sensor API is about how to react to the device.

This is part of our [series](/tag/UnderTheInsteonHubHood) detailing the functionality of the Insteon Hub.

![Sensors](/assets/posts/sensors.png)

<!--more-->

## Sleeping

One of the main differences you'll first notice with working with sensors is they're normally sleeping.  When you try to send a command to the device, you get no response.  This is done to extend the life of the batteries.  It is normally impossible to query the device for its current state.  With other devices, such as  light switches or thermostats, you could request the current light level or thermostat mode.

So, how do you send a message to the device?  You must wake it up.

Their are two ways to wake a device.  The first is to trigger the sensor. For a motion sensor, have it detect motion.  For a door sensor, close or open the door.  When the sensor is triggered, you have a few seconds that it is active before it goes back to sleep. Good luck trying to manually get the timing correct.

The second and standard method to wake the device is to put it in linking mode. This will keep the sensor awake for about 4 minutes - plenty of time to send your command.  Unfortunately, there aren't too many commands the sensor supports, so this has limited functionality. For when it is needed, here are the steps to put a sensor into linking mode:

1. Hold down the set button, until its LED starts blinking.
2. Tap the set button. The LED should be "double" blinking.

## Broadcasts Messages

By far, the most useful interaction with sensors is to react to the messages they broadcast. For all sensors (and other devices), when they are triggered, they send a broadcast message. They also send direct messages to all their linked devices. For this article, we're going to focus on the broadcast messages only.

Let's look at what a broadcast message looks like.  Here's an example from my motion sensor:

> 0250aabbcc000001cf1101

Broken down into its parts:

> 02 - Start of text (ascii code)
>
> 50 - Standard message code
>
> aabbcc - Insteon ID of motion sensor (Controller)
>
> 000001 - ALL-link group (Responder)
>
> cf - Message flags (ALL-Link Broadcast Message)
>
> 11 - Command 1 - On command (i.e. motion detected)
>
> 01 - Command 2 - Group (same as broadcast group)


*Note: All Insteon messaging is typically represented as hexadecimal bytes or groups of bytes. 2 hex digits represent 1 byte.*

### ALL-link Broadcast Message Type

To know that the message is an ALL-link broadcast message, the message flags byte can be used. The first 3 bits of the message flags byte are used for the message type.  Below is a break down of the different message types:

|Bits|Message type                   |
|----|-------------------------------|
|100 |Broadcast Message              |
|000 |Direct Message                 |
|001 |ACK of Direct Message          |
|101 |NAK of Direct Message          |
|110 |ALL-Link Broadcast Message     |
|010 |ALL-Link Cleanup Message       |
|011 |ACK of ALL-Link Cleanup Message|
|111 |NAK of ALL-Link Cleanup Message|

Notice there are several "Broadcast" message types.  The ones used by the sensors for events are the "ALL-link Broadcast" message type.

### ALL-link Group

The ALL-link group is used by the sensor to differentiate the sensor trigger types.  Each trigger type on the sensor maps to a different group.

The default trigger for the sensor is mapped to group 1.

### Command

The command (command 1 to be exact) is used by the sensor to indicate the behavior of the trigger type. The command 0x11 (ON) is used for the start of a trigger.  If there is an end to the trigger, the command 0x13 (OFF) is used.

### How to Monitor Broadcast Messages

So, how do we watch for these broadcast messages?

In theory, you could poll the HTTP interface for the status buffer (/buffstatus.xml).  However, this isn't very practical and, because of the limited size of the buffer, you're likely to miss the message.

The practical option is to use the PLM interface on the Hub.  The details of this interface are beyond the scope of this post but are detailed in the [raw PLM post](/post/insteon-hub-raw-plm).

## Door (Open/Close) Sensors

The simplest sensor to start with is the Insteon Door Open/Close Sensor.

### Default (ON-OFF) Behavior

In the default configuration, the sensor will broadcast an ON command to group 1 when it is opened. When the sensor is closed, it will broadcast an OFF command to group 1.

> **Sensor Opened:** 0250aabbcc000001cf1101
>
> - Group: 1
> - Command 1:* 0x11 - ON
>
> **Sensor Closed:** 0250aabbcc000001cf1301
>
> - Group: 1
> - Command 1:* 0x13 - OFF

### ON-ON Behavior

The sensor can be modified to send an ON command to group 2 when the sensor is closed.  When in this mode, you need to look at the group to determine the change.  Both opened and closed events use the ON command.

> **Sensor Closed:** 0250aabbcc000002cf1102
>
> - Group: 2
> - Command 1:* 0x11 - ON

## Leak Sensor

The leak senor's broadcast messages are the same as the ON-ON behavior of the door sensor. The dry and wet events are broadcast to groups 1 and 2, respectively.

> **Sensor Dry:** 0250aabbcc000001cf1101
>
> - Group: 1
> - Command 1:* 0x11 - ON
>
> **Sensor Wet:** 0250aabbcc000002cf1102
>
> - Group: 2
> - Command 1:* 0x11 - ON

## Motion Sensor

The motion sensor is the most complex sensor of the three.  The sensor has more events and can be configured in several modes. For brevity, we're only going to look at the default mode. The mode can be changed via the jumpers or via the extended SET command.

The motion sensor uses the group to identify the trigger type (motion or light level) and the command to identify the state change.


> **Motion Detected:** 0250aabbcc000001cf1101
>
> - Group: 1
> - Command 1:* 0x11 - ON
>
> **Motion Cleared:** 0250aabbcc000001cf1301
>
> - Group: 1
> - Command 1:* 0x13 - OFF
>
> **Dusk:** 0250aabbcc000002cf1102
>
> - Group: 2
> - Command 1:* 0x11 - ON
>
> **Dawn:** 0250aabbcc000002cf1302
>
> - Group: 2
> - Command 1:* 0x13 - OFF

## Additional Messages

All the sensors support some additional status messages. The door and leak sensors send out heartbeat messages and the motion sensor sends out low battery messages.

In addition, the motion sensor responds to the extended get/set command.  You can set the mode and other configurations or you can check the light level and voltage.

## Node.js API

To simplify the sensor events, there are several APIs out there.  We've added support for sensors into our Node.js API [home-controller](https://github.com/automategreen/home-controller).

All you have to do is add an event listener to the sensor object:

**Motion Sensor Event**
```js
motion('insteonId').on('motion', function () {
  ...
});
```

<hr>

*Want more info?  Did the post miss something or have an error?  Let me know; leave a comment or contact me [@brandongoode](https://twitter.com/brandongoode)*

