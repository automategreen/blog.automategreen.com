---
layout: post
title: IFTTT Insteon Triggers
author: Brandon Goode
permalink: post/ifttt-insteon-triggers
excerpt_separator: <!--more-->
tags:
  - IFTTT
  - INSTEON
  - API
---

This post provides instructions on how to use an Insteon device to trigger your IFTTT Maker recipe.

About a month ago, I wrote a [post](/post/ifttt-plus-insteon/) on how to use IFTTT to control your Insteon devices. There was a lot of positive feedback, and a large number of readers are now using Automate Green with IFTTT to control their Insteon devices.

![If Insteon leak then call me](/assets/posts/if-leak-then-phone.png)

For this post, I'll show you how to have ITFFF call you if your Insteon Leak sensor detects a leak. (i.e. If leak then call me.)

<!--more-->

## How it works

When the Insteon Leak sensor detects a leak, it sends a message to the Insteon Hub.  The hub then relays this over the Internet to our servers.  Our server can process the Insteon message in real time and then send an HTTPs request to your IFTTT Maker Channel. IFTTT then does whatever you tell it to do. In this example, we'll have it call you.

## What you need

1. IFTTT account
2. Insteon Hub *Updated 11/6*
  * 2242 - Older model
  * 2245 - Current model
3. Automate Green Account - [Sign up now](https://app.automategreen.com/signup)

## IFTTT Maker Channel

To trigger a Maker Channel event, you first need to get your Maker Channel secret key.  The key will be used in the HTTPs request to IFTTT to authenticate you.

Go to https://ifttt.com/maker.  If you haven't connected to the channel, connect now. You'll then be able to find your key on the Maker Channel page.

![IFTTT Maker Channel](/assets/posts/ifttt-maker-channel.png)

## Automate Green Action

Now that you have your IFTTT key, we can use it to build a URL for our event.  Below is the URL we'll be using.  Replace $IFTTT_KEY with your Maker Channel key.

```sh
https://maker.ifttt.com/trigger/leak/with/key/$IFTTT_KEY
```


In our example, we are going to use the leak sensor "wet" event as the trigger.

*Note:* If you haven't added your leak sensor, you need to add it now.

Go to the Actions for the sensor (click on the gear icon) and click "Add Action".  Add the URL you created above to the URL field. Use the default values for the remaining options.

![Create Action for Leak](/assets/posts/create-action-leak.png)


## IFTTT Recipe

To complete our example, you need to create an IFTTT recipe.  For the "If this", you will use the Maker Channel.  Configure the event to be "leak".

*Note:* The event name (leak) must be an exact match of the trigger in the URL above.

![Maker Channel Trigger Leak](/assets/posts/ifttt-leak-event.png)

For the "then that", use the Phone Call Channel.  Type in whatever message you want. I recommend the message say something about a leak.

![Phone Call Channel Event](/assets/posts/ifttt-leak-phone.png)

That's it!  You now have your Insteon device triggering an IFTTT recipe.

<hr>

*Want more details? Need help? Did the post miss something or have an error?  Let me know; leave a comment or contact me [@brandongoode](https://twitter.com/brandongoode)*

