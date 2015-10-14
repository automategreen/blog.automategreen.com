---
layout: post
title: Open Dimmer
author: Brandon Goode
permalink: post/open-dimmer
excerpt_separator: <!--more-->
tags:
  - Particle
  - OpenDimmer
  - OpenSourceHardware
---

Over the past couple years, I've been working with a lot of different home automation solutions.  There are plenty of great options out there; however, options for Hackers and Makers are limited.  I want to change this.  We need new open, customizable hardware.  We have started a project to develop a solution.  We're beginning with one of the most challenging components, the dimmer.  The initial project is called Open Dimmer. We currently have the first prototype PCBs being fabricated.

**Want updates! Subscribe to our Open Dimmer Updates mailing list:**

<!-- Begin MailChimp Signup Form -->
<link href="//cdn-images.mailchimp.com/embedcode/slim-081711.css" rel="stylesheet" type="text/css">
<style type="text/css">
  #mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; }
  /* Add your own MailChimp form style overrides in your site stylesheet or in this style block.
     We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
</style>
<div id="mc_embed_signup">
<form action="//automategreen.us11.list-manage.com/subscribe/post?u=86aecb89f996d4fc9e90b636b&amp;id=a61f3d3206" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
    <div id="mc_embed_signup_scroll">

  <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required>
    <div style="position: absolute; left: -5000px;"><input type="text" name="b_86aecb89f996d4fc9e90b636b_a61f3d3206" tabindex="-1" value=""></div>
    <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
    </div>
</form>
</div>

<!--End mc_embed_signup-->

![Open Dimmer PCB](/assets/posts/open-dimmer-pcb.png)

<!--more-->

## Configurable

The main goal I have for this is to provide you with a more flexible and open solution.  The goal is to have an open platform that Hackers and Makers can customize and easily share with others.  The Open Dimmer will have three levels of customizations: Cloud, Firmware, and Hardware.

### Cloud Mods

Cloud modifications allow you to modify how the dimmer behaves from a cloud perspective.  The cloud mods enable you to build cloud integrations with other services.

### Firmware Mods

Firmware modifications support customization in the dimmers.  The modifications allow for you to control other local devices or change how the dimmer itself behaves.

### Hardware Mods

Hardware modifications take customizations to the next level.  The plan is to allow you to create a physical interface to the dimmer by swapping the cover.  Swapping the cover could be done without the need to change the wiring.

## Design

Currently, the design is centered on Particle's Photon.  It will be the brains of the Open Dimmer.  The rest of the design is still in flux.  There are two main design decisions still being debated: the solid state relay and the power supply.

### TRIAC or MOSFET

We are looking at two options for controlling the load: TRIAC or MOSFET. The TRIAC is the most common device for a dimmer and will most likely be the selected solution.  However, we are looking at the newer high voltage power MOSFETs, which provide additional flexibility but have higher cost and complexity.  The first prototype is being built with power MOSFETs.

### AC/DC Power Supply

We are also looking at several DC power supply options.  Since the dimmer has to provide its DC power, we can't simply buy an off-the-shelf power supply.  The biggest challenge is having an efficient power supply in a small footprint.  We are looking at several fly back transformer-based designs.  The prototype uses TI's [PMP5130 reference design](http://www.ti.com/tool/PMP5130).

## Anticipated Challenges

There are a lot of challenges to make the Open Dimmer. Here are a few of the big ones.

  - UL Certification
  - Manufacturing
  - Support

We can overcome all of the challenges with enough motivations and time.  Show your support and help motivate us by signing up for the Open Dimmer mailing list (I promise to be respectful of your inbox).

<!-- Begin MailChimp Signup Form -->
<link href="//cdn-images.mailchimp.com/embedcode/slim-081711.css" rel="stylesheet" type="text/css">
<style type="text/css">
  #mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; }
  /* Add your own MailChimp form style overrides in your site stylesheet or in this style block.
     We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
</style>
<div id="mc_embed_signup">
<form action="//automategreen.us11.list-manage.com/subscribe/post?u=86aecb89f996d4fc9e90b636b&amp;id=a61f3d3206" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
    <div id="mc_embed_signup_scroll">

  <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required>
    <div style="position: absolute; left: -5000px;"><input type="text" name="b_86aecb89f996d4fc9e90b636b_a61f3d3206" tabindex="-1" value=""></div>
    <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
    </div>
</form>
</div>

<!--End mc_embed_signup-->


