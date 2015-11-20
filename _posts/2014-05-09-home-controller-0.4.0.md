---
layout: post
title: home-controller 0.4.0
author: Brandon Goode
permalink: post/home-controller-0.4.0/
excerpt_separator: <!--more-->
tags:
  - HomeAutomation
  - INSTEON
  - Hub
  - HomeControllerAPI
  - nodejs

---

Version 0.4.0 of the [home-controller](https://github.com/automategreen/home-controller) Node.js package has been released.

This release add support for thermostat and scene control. In addition, the code was refactored.  The refactoring was down for two reasons. The first reason was to break out device specific functionality. Second, it enhances the API to support promise and callback code logic.

![Promise Support](/assets/posts/therm.png)

<!--more-->

## Changes

Details of the API can be found on [GitHub ReadMe Page](https://github.com/automategreen/home-controller).

Several functions were added to the Insteon API:

  - insteon.sceneOn - Turn on a scene group
  - insteon.sceneOnFast - Turn on fast a scene group.
  - insteon.sceneOff - Turn off a scene group.
  - insteon.sceneOffFast - Turn off fast a scene group.
  - insteon.sceneDim - Dim by one step a scene group.
  - insteon.sceneBrighten - Brighten by one step a scene group.
  - insteon.light - Creates a Light object with the Insteon id.
  - insteon.thermostat - Creates a Thermostat object with the Insteon id.
  - thermostat.tempUp - Increases the setpoints by change.
  - thermostat.tempDown - Decreases the setpoints by change.
  - thermostat.temp - Gets the current air temperature for the zone.
  - thermostat.setpoints - Gets the current setpoints for the zone.
  - thermostat.mode - Gets or sets the mode.
  - thermostat.coolTemp - Sets the cool temperature setpoint to temperature.
  - thermostat.highHumidity - Sets the high humidity to level.
  - thermostat.lowHumidity - Sets the low humidity to level.
  - thermostat.backlight - Sets how long the backlight will stay lite to delay in seconds
  - thermostat.cycleDelay - Sets how long to delay between cycles.
  - thermostat.energyChange - Sets how many degrees change for engery saving mode.
  - thermostat.date - Sets the date
  - thermostat.details - Gets all the details about the thermostat

As part of the refactor, the light/switch control functions have been moved into there own class.  The existing functions will remain in place until 1.0 is released (assuming we get to 1.0).  The following light/switch function are effected:

  - light.turnOn
  - light.turnOnFast
  - light.turnOff
  - light.turnOffFast
  - light.brighten
  - light.dim
  - light.level

<hr>

*Want a feature or function added to the package?  Let me know; leave a comment, open an [issue](https://github.com/automategreen/home-controller/issues), or contact me [@brandongoode](https://twitter.com/brandongoode)*
