---
layout: post
title: Insteon Hub - Basic Light Switch Control API
author: Brandon Goode
permalink: post/insteon-hub-switch-control
excerpt_separator: <!--more-->
tags:
  - HomeAutomation
  - INSTEON
  - Hub
  - HomeControllerAPI
  - nodejs
  - UnderTheInsteonHubHood

---

Want to control your lights with the Insteon Hub API?  This post covers the details of basic light switch control with the Hub. This is part of our [series](/tag/undertheinsteonhubhood/) detailing the functionality of the Insteon Hub.

![Image of light switch](/assets/posts/switch.png)

<!--more-->

## The Basics - Send Message Commands

To start, you first need to know the basics of the Insteon commands. All Insteon commands are a series of bytes and are typically represented as a hex string.  There are many different types of Insteon commands for controlling the Insteon mesh; however, to get started, you only need to understand the Send Message command.

The Send Message command is used to send a command to a single Insteon device.  Let's start by looking at an example send command: `0x0262AABBCC0F1180`.

Below is the breakdown of this command.

- `02` Start - All commands start with 02. It is the ASCII code for start of text.
- `62` Type - The type coding for a send message command.
- `AABBCC` ID - The ID of the Insteon device.
- `0F` Flags - The flags for this message. All standard message commands should have `0F` for the flags.
- `11` Command 1 - The command 1 is the command number telling the device what to do.  In this case, turn a light on.
- `80` Command 2 - The command 2 is the command parameter. For this command, it is the light level (50%).

Now that we have an idea of what the send command looks like, we need to send it to the Hub.  The hub has 2 interfaces.  The first is [HTTP](/post/under-the-insteon-hub-hood) and the second is [raw TCP](/post/insteon-hub-raw-plm).  Since most people are more comfortable with HTTP, we'll use that for now.

To send any Insteon command to the Hub, you can use the following URL template:

  http://*Hub_IP:Port*/3?*command*=I=3

If your Hub's IP address is 192.168.10.10 and it's using the default port (25105), you would use: http://192.168.10.10:25105/3?0262AABBCC0F1180=I=3 to send the command.

**Note:** You do not include the `0x`.

## Basic Light Switch Control

Now that we have a base understanding of how to send a command, here are a few basic commands you can use to control a light switch.

### Turn On a Light

There are several commands that can be used to turn on the light, but the most basic (and easiest to use) is done with the command number `11`.  If the light switch is dimmable, you also must specify the level for the light. The level can be `0x00` to `0xFF` (0-255), where `0xFF` is 100%.

To turn our light on to 100% (`0xFF`) we would use the following hex command:

`02` + `62` + `AABBCC` + `0F` + `11` + `FF` &rarr; `0262AABBCC0F11FF`

And, to turn our light on to 75% (`0xFF` x 0.75 = `0xBF`) we would use the following:

`02` + `62` + `AABBCC` + `0F` + `11` + `BF` &rarr; `0262AABBCC0F11BF`

### Turn Off a Light

Again, like turning on the light, there are several commands that can be used to turn off the light.  The standard is done with the command number `13`.  The second command option is not used, but still must be included. Insteon commands have set lengths.

To turn our light off, we would use the following hex command:

`02` + `62` + `AABBCC` + `0F` + `13` + `00` &rarr; `0262AABBCC0F1300`

### Brighten or Dim a Light

Let's look at brightening or dimming a light.  The brighten and dim command types are `15` and `16`, respectively.  Each command adjusts the light's level by one "step".

So, if we want to brighten the lights by one step, the command would look like the following:

`02` + `62` + `AABBCC` + `0F` + `15` + `00` &rarr; `0262AABBCC0F1500`

And dimming looks like the following:

`02` + `62` + `AABBCC` + `0F` + `16` + `00` &rarr; `0262AABBCC0F1600`

### Set the Light's Level

If you want to set the light level instantly, the set level command number `21` can be used with the desired hex level (same level values as for the on command).

 To change the light level to 25% (`0xFF` x 0.25 = `0x40`) we would use the following:

`02` + `62` + `AABBCC` + `0F` + `21` + `40` &rarr; `0262AABBCC0F2140`

## Light Switch's Status

Now that we can control the switch, we can look at how to check the switch's status. Checking the status with the HTTP interface is a two step process.

First, we tell the Insteon Hub to request the status from the device.  Once the device has responded to the Hub, we have to parse the Hub's buffer.

To start, we need to send the command requesting the light's level.  This uses the command number `19`.

`02` + `62` + `AABBCC` + `0F` + `19` + `00` &rarr; `0262AABBCC0F1900`

So the HTTP request would look like:

http://192.168.10.10:25105/3?0262AABBCC0F1900=I=3

Once the request has been sent to the device, the device will respond to the Hub.  The Hub stores the response in its *(very small)* buffer. To read the buffer, you preform a HTTP GET request to /buffstatus.xml.  For the example above, the request would look like:

http://192.168.10.10:25105/buffstatus.xml

The response should be XML similar to the response below.

```xml
<response>
  <BS>   0262AABBCC0F1900060250AABBCC1122332F0000000000000000000000000000000000000000000000000000000000000000
  </BS>
</response>
```

There are two messages in the buffer.  The first is the Hub acknowledging the command: `0262AABBCC0F190006`.  The second is the message from the device: `0250AABBCC1122332F0000`. The remaining zeros are just padding in the buffer.

The acknowledgment is the original message, `0262AABBCC0F1900`, followed by a `06`.  The `06` is the Insteon Hub's ACK and informs you that the command was understood.  If it were a `15`, the Hub NACK, then there was an error with the request. To the most part, this can be ignored for now.

The second message is the response from the switch: `0250AABBCC1122332F0000`. Below is the breakdown of this response.

- `02` Start - All commands start with 02. It is the ASCII code for start of text.
- `50` Type - The type coding for a standard message received command.
- `AABBCC` Device ID - The ID of the Insteon device.
- `112233` Hub ID - The ID of the Insteon Hub.
- `2F` Flags - The flags for this message.
- `00` Command 1 - The command 1 contains the first data. For this command, it's the database delta (completely useless for this example).
- `00` Command 2 - The command 2 contains the second data. For this command, it's the light level (0% - i.e. Off).

**Note:** If you read the buffer too quickly, the device will not have responded and the second message will be missing.  Typically the response only takes a few hundred milliseconds, but it can take 2 or 3 seconds.

## Using the home-controller Package

Next, we'll look at how the Node.js [home-controller](https://github.com/automategreen/home-controller) package can be used to simplify the light switch control.

The home-controller package hides all the hex commands and provides an easy to use API.

The light switch API documentation is located at https://github.com/automategreen/home-controller#insteon-lighting-functions.

Here are a few quick examples for the commands we went over earlier.

Turning on a light to 100%:

```js
gw.turnOn('AABBCC', function () {
  // light is on at 100%
});
```

Turning on a light to 75%:

```js
gw.turnOn('AABBCC', 75, function () {
  // light is on at 75%
});
```

Turning off a light:

```js
gw.turnOff('AABBCC', function () {
  // light is off
});
```

Dim a light:

```js
gw.dim('AABBCC', function () {
  // light is dimmer
});
```

Brighten a light:

```js
gw.brighten('AABBCC', function () {
  // light is brighter
});
```

Set the lights level to 25%:

```js
gw.level('AABBCC', 25, function () {
  // light level set to 25%
});
```

Get the light's level:

```js
gw.level('AABBCC', function (err, level) {
  console.log('light level is ' + level);
});
```

In my [next post](/post/insteon-blink-demo), we'll create a simple application to blink the lights.

<hr>

*Want more details?  Did the post miss something or have an error?  Let me know; leave a comment or contact me [@brandongoode](https://twitter.com/brandongoode)*
