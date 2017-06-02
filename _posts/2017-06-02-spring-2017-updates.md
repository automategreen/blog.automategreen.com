---
layout: post
title: Redesigned Web App and More
author: Brandon Goode
permalink: post/redesigned-site-and-more/
excerpt_separator: <!--more-->
tags:
  - AutomateGeen
---

The past six months have been busy. We have made many improvements to Automate Green. Here are the highlights:

- **[Redesigned Web App]({{page.url}}#redesigned-web-app)** - Faster and easier to use
- **[Annual Pricing Option]({{page.url}}#annual-pricing-option)** - Save up to 33%
- **[New Actions]({{page.url}}#new-actions)** - Send text messages and emails
- **[Enhanced Automations]({{page.url}}#enhanced-automations)** - Multiple actions for a single trigger and delays

<!--more-->

## Redesigned Web App

The old web app was several years old and based on a design that could be confusing. We rewrote the it from the ground up.  The changes simplify the layout and make it a lot faster.

The two biggest design changes are the layout on the device page and the addition of a dedicated automations page.

All devices are now in a single column. This design makes it easier to scan down the list and find a device quickly. We have also upgraded many of the device icons and will continue to improve the remaining icons.

We have moved Automations (formerly just called Actions) to a dedicated page.  Previously you accessed the automations either by going to a schedule or the actions button on a device.  Now all automations are on a single page with the same layout as the devices page.  Making it easier for you to manage your automations.

## Annual Pricing Option

You can change your monthly billing to annual billing.  By switching to annual billing, you will save 33% on the advanced plan and 25% on the standard plan. You can quickly switch between monthly and yearly billing by [logging in](https://app.automategreen.com) and going to the *Account* page.

In addition to the pricing updates, we have improved the standard plan.  You can now have an unlimited number of devices on the standard plan.

## New Actions

There are two new actions for your automations. You can send text messages (SMS) and emails directly from Automate Green.  

If you currently trigger a web request to a third party (such as IFTTT) for SMS or email, you can update your automation to use Automate Green.  Automate Green sends the SMS and emails within a second or two of the trigger.

You can also enhance your messages with dynamic data from the triggering device.  In the message body, use can access both the device and status objects using [mustasche](http://mustache.github.io/mustache.5.html) templates.  For example, &#123;&#123;status.info.level&#125;&#125; would be replaced by with the dimmer's current level.

## Enhanced Automations

Previously automations were a single trigger-action pair.  Now you can have up to 10 actions for a single trigger.  Having multiple actions allows you to create one automation for the same trigger instead of needing to create a bunch of actions.

We have also added automation delays.  The delay allows for automations like turn off a light 20 minutes after it was turned on.

## What's next

We are continuing to make improvements to the new web app.

One of our primary focuses is improving the Automations. Automation configuration is more cumbersome than we would like and we are looking for ways to streamline the setup.  We are also planning to add additional automation triggers.

In addition to enhancing automations, we have several exciting integrations in the works. Watch for updates.

*If you find an issue or think of an enhancement, send us an [email](mailto:support@automategreen.com).*

 **Please leave me a comment.**
