---
layout: post
title: IFTTT + Insteon
author: Brandon Goode
permalink: post/ifttt-plus-insteon/
excerpt_separator: <!--more-->
tags:
  - IFTTT
  - INSTEON
  - API
  - HowTo
---
IFTTT is great and has a lot of great integrations with home automation, but no Insteon support - until now! OK, there may not be official support, but with the new Maker channel, we can make it work.

![If sunset then dim Insteon light](/assets/posts/ifttt-plus-insteon.png)


<!--more-->

**UPDATE** We have made the integration process much simpler.  [See the new simplified how-to](how-to/simplified-ifttt-and-insteon/).

## What you need
1. IFTTT account (hope this was obvious)
2. Insteon Hub *Updated 11/6*
  * 2242 - Older model
  * 2245 - Current model
3. Automate Green Account - [Sign up now](https://www.automategreen.com)

Now that you have the ingredients, we can make an IFTTT recipe to control your Insteon devices.  For this example, we're going to create a recipe for when the sunsets dim our light.

How does this work?  IFTTT Maker channel will send an HTTP request to the Automate Green API when the sunset action is triggered.  Automate Green will then use the Insteon Hub to control the Insteon device.

## The Request

Below is the request that we want IFTTT to make. It will dim the device to a level of 75%. You can use the curl command to quickly test.

```sh
curl -X POST https://api.automategreen.com/v1/devices/$DEVICEID/command \
-H "Authorization: Bearer $TOKEN" \
-d "command[name]=level" \
-d "command[level]=75"
```

The request to the Automate Green API contains four elements: the URL, HTTP method, authorization, and the data.

- The URL uses the Automate Green device id and should be replaced with yours.
- The method is POST.
- The authorization token provides a way to securely identify your account.
- The data contains the important part, the command. In this case, set light level to 75%.

## Authorization Token

**Update** You can now create tokens via the Web App - [HowTo](/how-to/token-management/)

Now that you've got an overview, you'll need to generate an authorization token.  This allows for the IFTTT request to securely access your devices.  Currently the only way to get a token is through an HTTPS API request. In the request, you provide your email, password and expires. Expires is the number of seconds you want the token to be valid. Expires defaults to two week.  I've set it to be a year here.

```sh
curl https://api.automategreen.com/v1/signin \
-d "user[email]=user@example.com" \
-d "user[password]=mypassword" \
-d "expires=31536000"
```

The response is a JSON with a token.

```json
{
    "message": "Sign in successful",
    "token": "vgdBwL149wfE8upzCY4PiaQOQZsrcIAV4fC1.Zl3vKu5bKhkdBJoCBbJ4ujqMtpvgdBwL149wfE8upzCY4PiaQOQZsrcIAV4fC1xZl3vKu5b.hkdBJoCBbJ4ujqMtpvgdBwL149wfE8upzCY4PiaQOQZ",
    "user": {
        "email": "user@example.com",
        "name": "Example User"
    }
}
```

You can pass the email and password parameters as either standard form data (above) or as JSON (below).  The response is always JSON.

```sh
curl https://api.automategreen.com/v1/signin \
-d '{"user":{"email":"user@example.com","password":"mypassword"}}' \
-H "Content-Type: application/json"
```

To make the token easier to work with, I'll set an environment variable with the token.

```sh
export TOKEN="vgdBwL149wfE8upzCY4PiaQOQZsrcIAV4fC1.Zl3vKu5bKhkdBJoCBbJ4ujqMtpvgdBwL149wfE8upzCY4PiaQOQZsrcIAV4fC1xZl3vKu5b.hkdBJoCBbJ4ujqMtpvgdBwL149wfE8upzCY4PiaQOQZ"
```


## Device ID

Now that you have a secure token, we need to get the ID of the device we want to control. (You have setup you Insteon Hub and Device, haven't you?)

There are two ways to get the ID. You can look at the URL in your browser when you select a device, or you can use the API to list the devices. Below is the API command.

```sh
 curl https://app.automategreen.com/api/v1/devices \
-H "Authorization: Bearer $TOKEN" \
-sS | python -mjson.tool
```

The API response will provide a long list of devices.  You just need the `id`. In the case below its `qWeRtYuIoP`.

```sh
{
  "devices": [
    {
      "address": "112233",
      "gateway": "aSdFgHjKl",
      "id": "qWeRtYuIoP",
      "info": {
        "ledBrightness": 32,
        "links": [...],
        "onLevel": 100,
        "rampRate": 500
      },
      "lastUpdate": "2015-07-17T23:50:45.666Z",
      "name": "Master Bedroom",
      "status": {
        "date": 1436312185098,
        "deviceId": "qWeRtYuIoP",
        "id": "-13SKLb9fg",
        "info": {
          "level": 0
        },
        "state": "Active"
      },
      "type": {
        "description": "Switch",
        "name": "switch",
        "profile": "switch"
      }
    }
  ]
}
```


## Create a Recipe

Now that you have the token and device Id, you can create the recipe.  Set up your "this" to what you want as the trigger.  In our example, we use sunset as the trigger. Then set your "that" to a Maker channel.  Below are the parameters for the Maker action.

- **URL**: https://api.automategreen.com/v1/devices/*$DEVICEID*/command
- **Method**: POST
- **Content Type**: applications/x-www-form-urlencoded
- **Body**: token=*$TOKEN*&command[name]=level&command[level]=75

*That's it!* Now you can control your Insteon devices with IFTTT.

<hr>

*Want more details?  Did the post miss something or have an error?  Let me know; leave a comment or contact me [@brandongoode](https://twitter.com/brandongoode)*



