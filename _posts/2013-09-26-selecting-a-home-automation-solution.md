---
layout: post
title: Selecting a Home Automation Solution
author: Brandon Goode
permalink: post/selecting-a-home-automation-solution
excerpt_separator: <!--more-->
tags:
  - HomeAutomation
  - INSTEON

---

When it comes to selecting a home automation solution, there are many options.  I'm mainly going to look at the "do-it-yourself" solutions to integrate with Automate Green.

<!--more-->

## The Technologies

To start with, you have several popular technologies: INSTEON, WiFi, X10, ZigBee, and Z-Wave. Simply the number of choices can be a little overwhelming.

[INSTEON](http://www.insteon.com) is both the technology and the brand.  It uses both power lines and RF to communicate in a mesh network. The solution is very popular and there are numerous products for most home automation tasks.  The cost is reasonable. INSTEON is a contender.

X10 is one of the early home automation solutions. It is power line based.  It is dated and can have reliability issues. Because of these concerns, we'll take X10 off the table for now.

[Z-Wave](http://www.z-wavealliance.org) is a multi-company technology.  It is based on RF transmission for control. Two of the main manufactures are GE and Leviton, but there are over a hundred other ones.  There is a wide  product selection. The cost of devices are in line with INSTEON.  Z-Wave is a possibility.

[ZigBee](http://www.zigbee.org) had a lot of press and promise several years ago; however, it has never really taken off.  There are limited products and they are costly.  This rules out ZigBee.

WiFi is a relatively new home automation solution.  The product list is very short. [Belkin](http://www.belkin.com/us/Products/home-automation/c/wemo-home-automation) makes a plug-in outlet and a unique looking switch. [Nest](http://nest.com) makes a hugely popular thermostat and has just announced it's adding an API. [Plum](http://plumlife.com), a new company, has some cool devices on the way, but they don't have them to market yet.  WiFi home automation has a lot of promise, but it doesn't have the products to be a real contender today; you never know about tomorrow.

## Connecting To The Cloud

So looking just at the technologies, we quickly eliminated all but INSTEON and Z-Wave.  The main concept of Automate Green is the cloud based control.  To accomplish this, there must be an IP gateway for each of the solutions.  Both INSTEON and Z-Wave have options.  INSTEON has the INSTEON Hub. Z-Wave has third party solutions, such as Mi Casa Verde's [Vera controllers](http://www.micasaverde.com/controllers/).  The Hub will cost you around $100 while the cheapest Vera is about double ($200).

## And The Winner Is

Based on all the factors, we opted to initially create Automate Green to interface with an INSTEON network using the Hub.  This  provides the widest selection of automation devices at a reasonable cost.

* Is this the perfect solution? **No.**
* Is there a perfect solution? **Not today.**
* Will we support additional technologies? **Yes.**

Let us know what you think.
