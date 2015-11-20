---
layout: post
title: Automate Home Automation
author: Brandon Goode
permalink: post/automate-home-automation/
excerpt_separator: <!--more-->
tags:
  - HomeAutomation
  - AutomateGeen
---

The concept behind Automate Green started with something my mother (and later wife) alway told me: "Turn off the light - you're wasting money." What can I say - sometimes I can be forgetful (or, as I prefer to think of it, focused on something else). There has to be a solution for my "forgetful" problem.

<!--more-->

Home automation to the rescue.  Now, if I forget to turn off the light, it can be turned off remotely.  Sounds great, but there is a problem.  I have to remember to turn it off remotely.  If I forgot to turn the light off when I was in the house (with the light on), I can guarantee you I'll forget to turn it off when I'm not in the house. We call it home automation, but it is not very automated.  It still requires you to manually trigger the event.

A couple years back, we were talking about my issue and I had the thought "why can't the light know to turn itself off?" Why can't it be automated?

Why not?  Sounds pretty straight forward.  I've created solutions for more complex issues.

## Where to Automate

So, we began investigating how best to automate this functionality.

The first idea was to put the new logic in the light switch. This would allow the switch to be aware of when to turn off the light. It could be done independently of any network. While there is definitely room for improvement with the current home automation switches, we decided this logic was best not performed in the switch.

We could have looked at a premises based solution, but this requires one more device to be running at the house. It would be one more device to power, reboot, and fail.

We opted to move the logic to the cloud (i.e. virtual servers in a data center).  This allows for several benefits.  It provides the ability to easily scale cost-effectively. There is no additional equipment needed at the home.  Additionally, the logic can be expanded to support more than just my "forgetful" use case.

## Automate Green

Since the solution is now a cloud service, we can automate a lot more than just turning off the lights to save money (energy). Here are just a few of the ideas on which we are currently working.  The list is always growing.

* Auto off lights - When you forget to turn a light off, the service automatically turns it off (or alerts you about it).
* Auto dim lights - Sometimes you need the lights on all the way, but a lot of the times you can get by with them dimmed just a bit.
* Auto away thermostat - If you forget to set your thermostat when you leave for a trip, the service automatically sets the thermostat to your away temperatures.

Let us know if you've got an idea of something that could be automated.
