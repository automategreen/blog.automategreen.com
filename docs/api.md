---
layout: page
title: API Documentation
---

**WARNING** This documentation is under development. It is complete and has error.  Send us an [email](mailto:support@automategreen.com) when you find an error or missing information.  You can also correct the documentation on [GitHub](https://github.com/automategreen/blog.automategreen.com) and send a pull request.

<hr>
## Authorization Token

You will need to generate an authorization token to use the API.  This allows your API requests to securely access your devices.  Currently the only way to get a token is through an HTTPS API request. In the request, you provide your email, password and expires. Expires is the number of seconds you want the token to be valid. Expires defaults to two week.  I've set it to be a year here.

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

<hr>
## RESTful vs Socket.io

All API commands can be accessed in two methods: RESTful or Socket.io. Only the RESTful interface is document for now.

<hr>
## Gateways

<hr>
### List Gateways
```sh
GET /v1/gateways
```

<hr>
### Get Gateway
```sh
GET /v1/gateways/$GATEWAY_ID
```


<hr>
### Update Gateway
```sh
PUT /v1/gateways/$GATEWAY_ID
```


<hr>
### Delete Gateway
```sh
DELETE /v1/gateways/$GATEWAY_ID
```



<hr>
## Devices

<hr>
### List Actions

```sh
GET /v1/devices
```

#### Example Request
```sh
 curl https://api.automategreen.com/v1/devices \
-H "Authorization: Bearer $TOKEN"
```


#### Example Response
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


<hr>
### Get Device
```sh
GET /v1/devices/$DEVICE_ID
```

<hr>
### Command Device
```sh
POST /v1/devices/$DEVICE_ID/command
```


<hr>
### Update Device
```sh
PUT /v1/devices/$DEVICE_ID
```


<hr>
### Delete Device
```sh
DELETE /v1/devices/$DEVICE_ID
```



<hr>
## Statuses

<hr>
### List Statuses
```sh
GET /v1/statuses?device=$DEVICE_ID
GET /v1/statuses?device=$DEVICE_ID&date=$DATE
GET /v1/statuses?device=$DEVICE_ID&date[start]=$START_DATE&date[end]=$END_DATE
```

#### Example Request
```sh
curl -g https://api.automategreen.com/v1/statuses?device=bksxGL4wMx&date[start]=2015-08-10T09:30&date[end]=2015-08-15 \
-H "Authorization: Bearer $TOKEN"
```


<hr>
## Actions

<hr>
### List Actions

```sh
GET /v1/actions
GET /v1/actions?device=$DEVICE_ID
```

#### Example Request
```sh
curl https://api.automategreen.com/v1/actions \
-H "Authorization: Bearer $TOKEN"
```

<hr>
### Get Action

```sh
GET /v1/actions/$ACTION_ID
```

#### Example Request
```sh
curl https://api.automategreen.com/v1/actions/WJNShxzKNl \
-H "Authorization: Bearer $TOKEN"
```

#### Example Response
```json
{
  "action":{
    "id":"WJNShxzKNl",
    "device":"bksxGL4wMx",
    "last":"2015-08-14T19:34:12.228Z",
    "count":1,
    "type":"request",
    "event":"cooling",
    "options":{
      "url":"https://maker.ifttt.com/trigger/bksxGL4wMx.cooling/with/key/bFbh7mj_PeM6ppxW1_Tq7H"
    }
  }
}
```

<hr>
### Create Action

```
POST /v1/actions
```

#### Example Request
```sh
curl https://api.automategreen.com/v1/actions \
-H "Authorization: Bearer $TOKEN" \
-d "device=bksxGL4wMx" \
-d "type=request" \
-d "event=cooling" \
-d "options[url]=https://maker.ifttt.com/trigger/bksxGL4wMx.cooling/with/key/bFbh7mj_PeM6ppxW1_Tq7H"
```

#### Example Response
```json
{
  "action":{
    "id":"WJNShxzKNl",
    "device":"bksxGL4wMx",
    "type":"request",
    "event":"cooling",
    "options":{
      "url":"https://maker.ifttt.com/trigger/bksxGL4wMx.cooling/with/key/bFbh7mj_PeM6ppxW1_Tq7H"
    }
  }
}
```

#### Request Arguments

- **device:** (string) ID of the device with which to associate the action
- **type:** (string) type of action
  + *"request":* HTTP(s) request
- **event:** (string) Event that triggers the action
- **options:** (object) options for the action

##### Light/Switch Events
- **turnOn**
- **turnOff**

##### Thermostat Events
- **heating**
- **cooling**
- **off**

##### Door Events
- **opened**
- **closed**

##### Motion Events
- **motion**
- **clear**

##### Request Options
- **url**
- **method**

<hr>
### Update Action

```sh
POST /v1/actions/$ACTION_ID
```

#### Example Request
```sh
curl -X PUT https://api.automategreen.com/v1/actions/WJNShxzKNl \
-H "Authorization: Bearer $TOKEN" \
-d "device=bksxGL4wMx" \
-d "type=request" \
-d "event=heating" \
-d "options[url]=https://maker.ifttt.com/trigger/bksxGL4wMx.cooling/with/key/bFbh7mj_PeM6ppxW1_Tq7H"
```


<hr>
### Delete Action

```sh
DELETE /v1/actions/$ACTION_ID
```

#### Example Request
```sh
curl -X DELETE https://api.automategreen.com/v1/actions/WJNShxzKNl \
-H "Authorization: Bearer $TOKEN"
```

<hr>


