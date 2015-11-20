---
layout: post
title: How To Setup an Insteon Hub (2242)
author: Brandon Goode
permalink: how-to/setup-an-insteon-hub/
excerpt_separator: <!--more-->
tags:
  - INSTEON
  - HowTo
---

Adding an Insteon Hub (model 2242) to Automate Green requires some manual steps.  If you know your way around your home router, it will be easy. You'll first need to setup your home network to allow our servers to access your Hub.  Then, you'll need to tell us where to access it.  Once the Hub is connected, the configuration currently on the Hub will be available.  If you haven't configured your hub (via the Insteon App), you can use Automate Green to configure it.

<!--more-->

**NOTE:** Any changes you make with Automate Green will not be reflected in the Insteon App.

## Home Network Setup

Automate Green controls the Hub through the Hub's PLM interface ([details](/post/insteon-hub-raw-plm)).

### Port Forwarding

To enabled this control, the PLM interface must be accessible through your home router.  This is done with port forwarding.  You will need to login to your router and setup port forwarding for port **9761** to your Hub's IP address.  You may also want to use static DHCP to ensure the Hub's IP address doesn't change.

### Dynamic DNS

In addition to forwarding the port, I would also recommend setting up dynamic DNS for your home router. This prevents us from losing connectivity to the Hub when your ISP changes your public IP address.

## Add the Hub

Now that your home network is configured, we can add the Hub.  Login ([here](https://app.automategreen.com)) and go to *Home > Gateways*. Click the Plus in the upper right corner.

![Add Gateway](/assets/posts/add-gateway.png)

You can then set the name and location of the Hub.  For type, select *Insteon Hub*.  The port will default to 9761. If you used a different port for forwarding, update the port to what you used.

![New Gateway Insteon](/assets/posts/new-gateway-insteon.png)

Click Add gateway, and our servers will attempt to connect to your Hub.

## Did it connect?

Once you add the gateway, you will be returned to the Gateways page.  You should see your new gateway.  It will most likely say "Initializing".  It can remain in this state for several minutes but should eventually change states to "Active."  If it never changes state or says "Closed", we were unable to connect to the gateways.  Double check your settings and your home network.  We can always help.  Don't hesitate to send an email to [suport@automategreen.com](mailto:support@automategreen.com).

## Did My Dimmer Just Beep?

Now that your Hub is connected, we'll pull the current configuration from the Hub.  If you notice some of your devices beeping, you are not crazy.  We are making sure all the known devices have two-way links on the Hub.  This allows for both control of the device and notification of device changes. We apologize in advance for waking the baby (personal experience).

<hr>

*Want more details?  Did this How-To miss something or have an error?  Let me know; leave a comment or contact me [@brandongoode](https://twitter.com/brandongoode)*




