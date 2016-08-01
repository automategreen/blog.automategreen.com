---
layout: post
title: Introducing the Sensor Hub
author: Brandon Goode
permalink: post/intro-sensor-hub/
excerpt_separator: <!--more-->
tags:
  - HomeAutomation
  - AutomateGeen
  - SensorHub
---

I am excited to introduce our Sensor Hub.  Over the past seven months, we have been working on the Sensor Hub to provide an easy way to integrate sensors into your Home Automation.  Today, if you want a sensor in your home, you have two options: a dedicated propriety sensor or a DIY sensor.  For the DIY option, there are tons of cheap wired sensors, but they require knowledge of circuitry and programming to use at home.  The Sensor Hub bridges the DIY gap and allows you to integrate wired sensors by just plugging them in.  A single hub can support six sensors and three relays at the same time.

<div class="text-center"><a class="button radius" href="https://www.automategreen.com/sensorhub/">Pre-Order Mine Now</a></div>


<div class="text-center">
<a href="https://www.automategreen.com/sensorhub/">{% image sensor-hub-splash.png class:"full-size" alt:"Sensor Hub" %}</a>
</div>

<!--more-->

## Sensors

The list of sensors supported is still growing, but here is the list supported by the current prototype:

- Temperature
- Light
- Contact
- Electrical Current
- Water Meter
- Leak

## Relays

There are two types of relays: internal and external.  Each device contains two internal relays and one external relay control.  The two internal relays can be used to control devices like water valves and garage door openers.  The single external relay control can be used to control high power relays, such as a 30A 220V appliance relay.

## 3 Models

The Sensor Hub will come in three models:

- WiFi Model
- Mobile 3G Model
- Maker Model

## The Prototype

We are currently testing our 3rd prototype and building the 4th version.  We will use the 4th version for our field testing.  Here are a few pictures of the 3rd prototype. 


<div class="image-slider">
  <div><img class="full-size" data-lazy="/assets/posts/sensor-hub-proto-3/mobile.png"/></div>
  <div><img class="full-size" data-lazy="/assets/posts/sensor-hub-proto-3/maker.png"/></div>
  <div><img class="full-size" data-lazy="/assets/posts/sensor-hub-proto-3/sensor-inputs.png"/></div>
  <div><img class="full-size" data-lazy="/assets/posts/sensor-hub-proto-3/relay-inputs.png"/></div>
</div>


## Timeline

The goal is to have the pre-ordered units ready by the end of this year. Once we have our field trial deployed and have completed FCC testing, we will start our first production run. We already have the field trial participants ready and a contract in place for FCC testing.  We are looking at several PCB assemblers, and once we finalize the design, we will pick the assembler. 

![Sensor Hub Timeline](/assets/posts/sensor-hub-timeline.svg)

## Built with Particle

At the core of the Senor Hub is a Particle Photon or Electron.  We have leveraged their great system to run the hub. The WiFi model uses the Photon, and the Mobile 3G model uses the Electron. More info can be found on Particle's site, [www.partile.io](https://www.particle.io/).

If you already have a Particle Photon or Electron, you can use the Maker Model to build your own sensor support. This model provides you with the control but removes the need to create the circuitry. Just plug and play.


## More to Come

Over the next few weeks, I hope to publish several more posts about the Sensor Hub.  I will focus on writing some demos and how-tos.

<hr>

*Want more details?  Have a question or comment? Let me know; leave a comment.*

