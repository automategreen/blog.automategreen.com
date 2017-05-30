---
layout: post
title: Simplified IFTTT + Insteon
author: Brandon Goode
permalink: how-to/simplified-ifttt-plus-insteon/
excerpt_separator: <!--more-->
updated: 2017-05-30
tags:
  - IFTTT
  - INSTEON
  - API
  - HowTo
---

Last year, I wrote a post, [IFTTT + Insteon](/post/ifttt-plus-insteon/), on how you could use Automate Green to integrate the IFTTT service with your Insteon devices.  Since then, we have made a lot of improvements to the Automate Green Web App.  This How-To will show you how to use the Web App to generate all the IFTTT Maker Channel settings.

![If sunset then dim Insteon light](/assets/posts/ifttt-plus-insteon.png)

<!--more-->

## What you need
1. IFTTT account
2. Insteon Hub
  * 2242 - Older model
  * 2245 - Current model
3. Automate Green Account - [Sign up now](https://app.automategreen.com/signup)

## Automate Green Setup

If you already have your Insteon Hub connected to Automate Green, awesome, you can skip to Step 1.

Automate Green will act as the glue between Insteon and IFTTT.  You need to create an Automate Green account and then connect your Insteon Hub.

Once you connect your hub, go to the "Devices" page and continue with Step 1.

## Step 1

Select the edit button for the device.

![Action Button](/assets/posts/select-edit.png)

## Step 2

Click the show API commands button in the upper right.

![Add Action](/assets/posts/show-api-commands.png)

## Step 3

Configure the command you want and the token to use. [Optionally generate a new token](/how-to/token-management/).

![IFTTT Action Options](/assets/posts/config-api-command.png)

## Step 4

Scroll down the page to see the API call configurations.  You will use this for your IFTTT configurations.

![IFTTT Configurations](/assets/posts/device-api-command.png)

## Step 5

Copy the IFTTT configurations to your "Maker Webhooks - Make a web request" action.

![IFTTT Maker Channel Action](/assets/posts/ifttt-device-api-command.png)


**UPDATE May 2017:**  This post has been updated to reflect changes in Automate Green.

<hr>

*Want more details?  Did this How-To miss something or have an error?  Let me know; leave a comment.*
