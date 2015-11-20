---
layout: post
title: Insteon REST API - Quick Start
author: Brandon Goode
permalink: post/insteon-rest-api-quick-start/
excerpt_separator: <!--more-->
tags:
  - INSTEON
---

Earlier this year, Insteon released a public API for their new Hub (2245).  The API provides a RESTful interface for your Hub.  This guide will help you quickly get started using the new API.

The official Insteon API documentation can be found at [apiary.io](http://docs.insteon.apiary.io).

![Insteon REST API](/assets/posts/insteon-rest-api.png)


<!--more-->


## API Access

To access the API, you must first register with Insteon. [Register here.](http://www.insteon.com/become-an-insteon-developer) Insteon will send you an email with your API key.

You will need this key for all your API requests.  We'll be using curl to make our request. Let's export the key to an environment variable to make it easier to use in our curl requests.

```sh
export API_KEY=yourverylongapikey
```

## Authentication

Before you can control your Insteon devices, you have to authenticate with the Insteon API.  Insteon uses OAuth2.  You need to use Insteon's App to create an account with which to authenticate.  Once you have an Insteon account, you pass your API Key, username (email), and password.

```sh
curl https://connect.insteon.com/api/v2/oauth2/token -X POST \
-d "username=brandon@example.org" \
-d "password=MyPassword" \
-d "client_id=$API_KEY" \
-d "grant_type=password"
```

Assuming your credentials are correct, you will receive a JSON response with an access token.

```json
{
  "access_token":"youraccesstoken",
  "refresh_token":"yourrefreshtoken",
  "token_type":"Bearer",
  "expires_in":7200
}
```

You can now use this token to control your Insteon device. Again, export the key to an environment variable to make it easier to use.

```sh
export ACCESS_TOKEN=youraccesstoken
```


## House

You now need to use the API to get your Hub's House ID.  This is the unique ID Insteon assigns to your Hub.  It is created when you setup your Hub via the Insteon App.

**NOTE:** From this point on, all requests require Authentication and Authorization headers.

```sh
curl https://connect.insteon.com/api/v2/houses \
-H "Authentication: APIKey $API_KEY" \
-H "Authorization: Bearer $ACCESS_TOKEN"
```

The response will contain the HouseID.

```json
{
  "HouseList":[{
    "HouseID":12345,
    "HouseName":"MyHouse",
    "IconID":0
  }]
}
```

You can use the HouseID to get more information about the Hub

```sh
curl https://connect.insteon.com/api/v2/houses/$HOUSE_ID \
-H "Authentication: APIKey $API_KEY" \
-H "Authorization: Bearer $ACCESS_TOKEN"
```

Below is the Hub info returned.

```json
{
  "HouseID":12345,
  "HouseName":"MyHouse",
  "IconID":0,
  "InsteonHubID":"AABBCC",
  "BinVer":"Hub2-V03-20140617",
  "PLMVer":"9D",
  "FirmwareVer":"1002",
  "IP":"10.0.0.10",
  "Port":"25105",
  "Gateway":"10.0.0.1",
  "Mask":"255.255.255.0",
  "Mac":"000EF3AABBCC",
  "City":"Canton",
  "DHCP":"True",
  "DaylightSavings":"True",
  "HubUsername":"hubusername",
  "HubPassword":"hubpassword",
  "HubType":"HUB2"
}
```

## Device

We're familiar with dealing with Insteon addresses; however, Insteon does not use the addresses for the API.  They use a unique number for each device.  You'll need to request the Hub's devices to get the list of device IDs.

```sh
curl https://connect.insteon.com/api/v2/devices \
-H "Authentication: APIKey $API_KEY" \
-H "Authorization: Bearer $ACCESS_TOKEN"
```

Here an example response with a single device.

```json
{
  "DeviceList":[
  {
    "HouseID":12345,
    "DeviceID":67890,
    "DeviceName":"Plug In Test",
    "IconID":46
  }]
}
```


To get more detail about the device, including the Insteon address, you can send a request for the device ID.

```sh
curl https://connect.insteon.com/api/v2/devices/$DEVICE_ID \
-H "Authentication: APIKey $API_KEY" \
-H "Authorization: Bearer $ACCESS_TOKEN"
```

The response contains all the details about the device configuration, including the Insteon address.  It does not provide the current device state.

```json
{
  "HouseID":12345,
  "DeviceID":67890,
  "DeviceName":"Desk Lamp Plug",
  "InsteonID":"112233",
  "DeviceType":0,
  "DevCat":1,
  "SubCat":14,
  "IconID":46,
  "AutoStatus":false,
  "CustomOn":"",
  "CustomOff":"",
  "EnableCustomOn":false,
  "EnableCustomOff":false,
  "DimLevel":254,
  "RampRate":28,
  "OperationFlags":0,
  "LEDLevel":32,
  "AlertsEnabled":false,
  "AlertOn":0,
  "AlertOff":0,
  "Favorite":true,
  "Humidity":false,
  "DayMask":0,
  "OnTime":"",
  "OffTime":"",
  "TimerEnabled":false,
  "Group":1,
  "FirmwareVersion":65,
  "LinkWithHub":0,
  "BeepOnPress":true,
  "LocalProgramLock":false,
  "BlinkOnTraffic":false,
  "ConfiguredGroups":1,
  "InsteonEngine":2,
  "SerialNumber":"112233",
  "GroupList":[]
}
```

## Commands

To get the device state or control the device, you'll need to use the `commands` resource. This allows for you to control your Insteon network (the fun part). You send the request with the device ID and the command info in the body. You can also control scenes and the hub. Unlike the previous request, this request is a POST.

```sh
curl https://connect.insteon.com/api/v2/commands \
-X POST \
-H "Content-Type: application/json" \
-H "Authentication: APIKey $API_KEY" \
-H "Authorization: Bearer $ACCESS_TOKEN"
--data-binary '{"command":"on","level":75,"device_id":67890}'
```

The API response does not contain the Insteon response of the command.  Each command is assigned an ID, and this ID is provided in the API response.

```json
{
  "status":"pending",
  "link":"/api/v2/commands/721955",
  "id":721955
}
```


You need to use the command ID to get the Insteon response.

```sh
curl https://connect.insteon.com/api/v2/commands/721955 \
-H "Authentication: APIKey $API_KEY" \
-H "Authorization: Bearer $ACCESS_TOKEN"
```

In this case, the Insteon response is the on level, 74%.  I know 75 does not equal 74.  I assume it is off because of how they rounded when converting 75% to an 8 bit level.

```json
{
  "id":721955,
  "status":"succeeded",
  "response":{"level":74},
  "command":{
    "command":"on",
    "level":75,
    "device_id":67890
  }
}
```

## Insteon Events

Now that you're able to control your device, let's see how to receive events from the device. To get events from the Hub, you can use the stream resource.  This resource provides a server-side event connection (http://www.w3.org/TR/eventsource/).  Each Insteon event is passed as data within the event stream.  Below is an example of the event stream receiving on/off commands from a device.


```sh
curl https://connect.insteon.com/api/v2/houses/12345/stream \
-L \
-H "Content-Type: text/event-stream" \
-H "Authentication: APIKey $API_KEY" \
-H "Authorization: Bearer $ACCESS_TOKEN"

event: message
data: {"hub_insteon_id":"AABBCC","device_insteon_id":"112233","device_group":1,"status":"on","received_at":"2015-07-25T02:23:28.567552Z"}

event: message
data: {"hub_insteon_id":"AABBCC","device_insteon_id":"112233","device_group":1,"status":"off","received_at":"2015-07-25T02:23:31.828493Z"}
```

## Node.js package

We're actively working on an open source Node.js package for the Insteon REST API: [insteon-rest](https://github.com/automategreen/insteon-rest).  This will allow you to easily use the API from a node application and will be used by us to add support for the 2245 Hub.

<hr>

*Want more details?  Did the post miss something or have an error?  Let me know; leave a comment or contact me [@brandongoode](https://twitter.com/brandongoode)*




