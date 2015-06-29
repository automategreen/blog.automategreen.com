---
layout: post
title: Under the Insteon Hub Hood
author: Brandon Goode
permalink: post/under-the-insteon-hub-hood
excerpt_separator: <!--more-->
tags:
  - HomeAutomation
  - INSTEON
  - Hub
  - HomeControllerAPI
  - nodejs
  - UnderTheInsteonHubHood

---

This post gives an overview of the functionality provided by the Insteon Hub's HTTP interface. Our [home-controller API](https://github.com/automategreen/home-controller) exposes the Hub's functionality in a Node.js module.  This is the first of a series of posts.  The later posts will detail how the API uses the Hub's HTTP interface.

![Hub](/assets/posts/hub.png)

<!--more-->

## Insteon Hub is an Updated SmartLinc

When you browse to the Hub's IP address (default port is 25105), Insteon appears to have removed the old SmartLinc interface and directs you to connect.insteon.com. As we'll see, only the homepage has been replaced.  The Hub uses more or less the same HTTP interface as the legacy SmartLinc.

![Hub vs Linc Homepage](/assets/posts/hub-vs-link-home-screen.png)

At their core, both the Hub and SmartLinc are Insteon power line modems (PLMs) with an HTTP interface. The Hub has a slightly newer version of PLM, 9C.  The SmartLinc's PLM version is 9B.  Only the newer Hub supports the i2cs Insteon protocol version. The HTTP interface to access the PLM functionality is identical.  Because of this, the majority of this post can apply to both devices.

In addition to exposing the PLM function, they both support the same *basic* scheduling.

The Hub has a couple of unique features. The Hub is (now) dual band.  It will send notifications up to the Insteon service and it will send the notification to you.

## HTTP Resources

If you open up your favorite protocol trace tool (Wireshark) and capture the HTTP traffic between the Insteon App and the Hub, you'll see the functionality at work. The HTTP resource can be divided into two groups: Hub configuration and PLM control.

![Hub HTTP Capture](/assets/posts/hub-http-trace.png)

### Hub Configuration

The Hub configurations are "hidden" from the default homepage; however, they are the same paths as used for the SmartLinc.

#### System Configuration

**/network.htm** is the main resource for viewing the network configuration.  It provides you with the IP and Insteon network info.  It also allows you to configure the system clock. *Why isn't there NTP support?*

**/config.htm** is used to configure your IP address settings. This is where DHCP is enabled/disabled.

**/sun.htm** allows for the configuration of your location and daylight savings time settings. In addition, it is used to set sunrise and sunset times.

**/a.htm** is the authentication resource.  It allows you to set the user name and password. More on security later.

**/1?L=USER=1=PASS** updates the user name, `USER`, and the password, `PASS`.

#### Room Configuration

**/rooms.htm** configures the room names.  The visible check box is not used for the Hub.  On the SmartLinc, it is used to control what rooms are visible on the homepage.

**/rRN.htm** displays the scenes configured for the room.  The room number, `RN`, can be `01` to `16`.

**/scenes.htm?1=RN=F** configures the scene names and visibility within a room.

**/setup.htm?RN=SN=F** is used to configure the scenes' features.  Valid scene numbers, `SN`, are `1` to `16`. This allows you to configure basic scheduling and enable notification for a device. As you'll see later, true scene/group control is done via the PLM.

**/2?S215=Hall_Lights=2=t=00:00=ff=00:00=ff=f=f=f=f=f=f=f=f=f=f=t=AABBCC01=t=f22** Creates a new scene. Here's each option:

```
S#=name=2=show(t/f)=TimeStart=AM(t/f)PM(t/f)=TimeEnd=AM(t/f)PM(t/f)=Mon(t/f)=Tue(t/f)=Wen(t/f)=Thu(t/f)=Fri(t/f)=Sat(t/f)=Sun(t/f)=CntlUp(t/f)=CntlOn(t/f)=CntlOff(t/f)=CntlDown(t/f)=StatusDeviceID=ReportStatus(t/f)=DimCntlInc(t/f)StartTimeType(1/2/3,Sunset/Minute/Sunrise)TimeEndType(1/2/3,Sunset/Minute/Sunrise)
```

### PLM Control

The PLM controls are the heart of the Hub.  All Insteon device configurations are done with the PLM.  The main PLM HTTP controls are detailed below.

**/0?08=I=0**  stops linking on the PLM.  This can also be done with the generic PLM command resource.

**/0?09GN=I=0**  starts linking for a group number, `GN`.  The group number can be `00` to `FF`.

**/0?0AGN=I=0**  starts unlinking for a group number, `GN`.  The group number can be `00` to `FF`.

**/Linkstatus.xml** provides the current linking status. This can also be parsed from the buffer.

**/3?PLM_CMD=I=3** is the generic PLM command.  This sends whatever command (`PLM_CMD`) is provided to the PLM for execution. This is the most powerful of all the Hub resources.

**/sx.xml?ID=SD_CMD** is the synchronous standard Insteon command.  This resource can be used to send a simple standard command (`SD_CMD`) to the Insteon device ID (`ID`).  It will wait for the device to respond and provide the device's response in the HTTP response. *This resource is unique to the Hub.*

**/buffstatus.xml** retrieves the current PLM buffer. This is another difference between the Hub and the SmartLinc. The Hub's buffer is padded with zeros when empty. The XML format of the response is below.

```xml
<!-- Empty Hub Buffer -->
<response>
<BS>0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000</BS>
</response>

<!-- Empty SmartLinc Buffer -->
<response><BS></BS></response>
```

**/1?XB=M=1** clears the PLM buffer. The buffer will look like the examples above.

## Notifications

One notable difference with the Hub is the addition of the notifications.  Notifications works by the Hub sending the Insteon ID and command to the Insteon service.  The service then maps the ID and command to a SMS/email notification. The Hub is hard-coded to send the notification to connect.insteon.com.  Insteon is using Amazon cloud computing to run the service.

Below is an example notification to turn on a light.

```http
http://connect.inston.com/AlertWS/Alerts/send?insteonid=AABBCC&command=1122331101
```

Notifications are sent for all commands from the monitored device in each scene.

In addition to sending the notifications to Insteon's server, the Hub also sends its IP address, port, and MAC. This is used by the Mobile Apps to access the device remotely.  Below is an example of this communication.

```http
http://connect.inston.com/setinfo.asp?PrI=192.168.1.73&PrP=25105&mac=000EF3AABBCC
```


## Security Warning

This article would be incomplete if it didn't touch on the Hub's security, or better put, its lack of security.  It would be incorrect to say it doesn't have any security, but the security it uses is outdated and very weak.

The Hub only uses basic HTTP authentication for security.  These means everything is transmitted in clear text including the user name and password. Out of the box, the authentication is disabled (i.e. no user name and password is required).  The Insteon App initializes the Hub's authentication when it first connects; however, the user name and password it uses are easily guessed.

Does this mean you shouldn't use the Hub?  Not necessarily, but you should be aware of its limitations. That said, if you have an evil neighbor that wants to hack into your house's lighting control, it is possible.  Most people don't have someone that wants to hack into their lighting control.

If you are using a Hub (or SmartLinc), here are some suggestions to help improve its security.

* Change the default user name and password to something unique
    - **DO NOT** use the same password for your bank account, Facebook, email, etc.
* Change port from 25105 to a random port
* Disable UPnP on your router

<hr>

*Want more details?  Did the post miss something?  Let me know; leave a comment or contact me [@brandongoode](https://twitter.com/brandongoode)*
