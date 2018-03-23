---
title: General Properties
description: This chapter explains tapir's general properties.
permalink: /docs/usingtapir/general-properties/
redirect_from:
 - /docs/usingtapir/http-proxy/
---

## Implicit wait time

In case of using Selenium the implicit wait time is passed to *org.openqa.selenium.WebDriver.Timeouts.implicitlyWait(long, TimeUnit)*. Additionally the [WaitExtensions](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/util/extensions/WaitExtensions.html) rely on this value.

| Property | Info | Description |
|--------------------------|---------------|--------------------------------------------------------|
| implicitWaitTime | 5,000 ms  | Implicit wait time (in ms). |

## HTTP-Proxy
From time to time you need to establish a HTTP connection from your tapir tests. If you have to use a HTTP proxy, tapir provides some properties to configure the connection.

| Property | Info | Description |
|--------------------------|---------------|--------------------------------------------------------|
| http.proxy.host |  | Specifies the proxy host |
| http.proxy.port | Default: 3128 | Specifies the proxy port |
| http.proxy.user | Optional | Specifies the proxy user for authentification |
| http.proxy.password | Optional | Specifies the proxy password for authentification |
| http.proxy.nonproxyhosts | Optional | Specifies for which hosts the proxy should be bypassed |

<div class="panel panel-warning">
  <div class="panel-heading">
    <div class="panel-title"><span class="fas fa-exclamation-circle"></span> Caution</div>
  </div>
  <div class="panel-body">
  The configuration only affects connections established by the tapir Java Virtual Machine. The web browsers (except HtmlUnit) have their own proxy configurations.
  </div>
</div>

## Localization

| Property | Info | Description |
|--------------------------|---------------|--------------------------------------------------------|
| locale.language | *java.util.Locale.getDefault*  | Specifies the locale language |
| locale.country | Optional | Specifies the locale country |
| locale.variant | Optional | Specifies the locale variant |
| dateformat | Derived from locale in *java.time.format.FormatStyle.MEDIUM* | Specifies the date format pattern following *java.time.format.DateTimeFormatter.ofPattern(String)* |
