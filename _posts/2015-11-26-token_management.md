---
layout: post
title: Token Management
author: Brandon Goode
permalink: how-to/token-management/
excerpt_separator: <!--more-->
tags:
  - IFTTT
  - API
  - HowTo
---


This HowTo will cover the options for managing API tokens.  Tokens can be generated and managed either with the new web interface or directly via the API. 

<!--more-->

## Your Tokens

Tokens are used by Automate Green to authenticate and authorize API commands.  We use the JSON Web Token (JWT) standard [RFC 7519](https://tools.ietf.org/html/rfc7519). 

There are two ways to generate a token. Every time you sign in to the Web App, a token is automatically generated.  These tokens are used by the Web App to communicate with the server.  Tokens can also be manually generated for use with the API for services like IFTTT Maker Channel 

API tokens and Web App tokens are the same (since the Web App uses the API) except the expires time.  Web tokens have a default expire time of 14 days.  API tokens, on the other hand, have customizable expire times.


## Web App Token Management

We've recently added the ability to manage tokens via the Web App.  This will make using the API for services such as IFTTT easier.  You no longer need to use another tool, like cURL, to generate your tokens.

### Viewing Your Tokens

You can access the token management page by going to the User menu in the navigation section and selecting tokens

![Tokens Navigation](/assets/posts/tokens-nav.png)

This page will list all your current tokens.  Most, if not all of the tokens, are from the Web App.  These tokens will have no description. The number of days (or hours, or months, or years) till the token expires is beside each description.  You'll also notice the option to delete the token. 

![Tokens List](/assets/posts/tokens-list.png)

### Deleting a Token

If you no longer need a token and don't want to wait for it to expire, you can click the delete button.  This will remove the token from the system. This prevents future use of the token.

**This cannot be undone - This is your warning**

### Generating a New Token

The most useful aspect of the web interface is the ability to generate a new token.  You enter a description for the token, how long you want the token to be valid, and your account password.

![Generate Token](/assets/posts/tokens-generate.png)

Your new token will be displayed.  You can copy the token for use in your API calls.  The token will be saved until you reload the Web App or until you clear the token.  This allows for Automate Green to generate API calls for you on the Device Action page, making for easy IFTTT copy and paste. 

**API call generation is currently under development and may not be available**

![Generated Token](/assets/posts/tokens-generated.png)

## API Token Management

The API has always supported API token generation with the HTTPS API.  It now supports viewing tokens and deleting tokens too.

### Generating a New Token

To generate a token, you send a sign-in request to the API. In the request, you provide your `email`, `password`, `expires`, and `desc`. Expires is the number of seconds you want the token to be valid. Expires defaults to two week.  I've set it to be a year here.  The `desc` is the description to give the token.  

```sh
curl https://api.automategreen.com/v1/signin \
-d "user[email]=user@example.com" \
-d "user[password]=mypassword" \
-d "desc=IFTTT" \
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

To make the token easier to work with, I like to set an environment variable with the token.  All API call examples use this variable.

```sh
export TOKEN="vgdBwL149wfE8upzCY4PiaQOQZsrcIAV4fC1.Zl3vKu5bKhkdBJoCBbJ4ujqMtpvgdBwL149wfE8upzCY4PiaQOQZsrcIAV4fC1xZl3vKu5b.hkdBJoCBbJ4ujqMtpvgdBwL149wfE8upzCY4PiaQOQZ"
```


### Viewing Your Tokens

Once you have a valid token, you can view your current tokens with an HTTP GET to `/v1/tokens`.

```sh
curl https://api.automategreen.com/v1/tokens \
-H "Authorization: Bearer $TOKEN"
```

The JSON response will contain the token ID, the expires date, and the description.  The desc is optional and will not be present for a token created by the Web App sign-in. 

```json
{
  "tokens":[
  {
    "id":"by11BZbDte",
    "expires":"2015-11-30T00:44:28.494Z"
  },
  {
    "id":"b1aDLMaAtl",
    "expires":"2016-11-25T15:43:17.956Z",
    "desc":"IFTTT"
  }]
}
```

### Deleting a Token

You can use the token ID to remove a token from the system with an HTTP DELETE to `/v1/tokens/TOKEN_ID`.

```sh
curl https://api.automategreen.com/v1/tokens/b1aDLMaAtl \
-X DELETE \
-H "Authorization: Bearer $TOKEN"
```


Once the token is deleted, it can no longer be used to control Automate Green.  The server will respond with a 401 Unauthorized if it used. 

```sh
curl https://api.automategreen.com/v1/tokens \
-H "Authorization: Bearer $TOKEN"

Unauthorized
```

<hr>

*Want more details?  Did this How-To miss something or have an error?  Let me know; leave a comment*

