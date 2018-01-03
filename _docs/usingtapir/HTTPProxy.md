---
title: HTTP-Proxy
description: This chapter explains how to run tapir tests behind a http proxy.
permalink: /docs/usingtapir/http-proxy/
---

From time to time you need to establish a HTTP connection from your tapir tests. If you have to use a HTTP proxy, tapir provides some properties to configure the connection.

## Properties
| Property | Info | Description |
|--------------------------|---------------|--------------------------------------------------------|
| http.proxy.host |  | Specifies the proxy host |
| http.proxy.port | Default: 3128 | Specifies the proxy port |
| http.proxy.user | Optional | Specifies the proxy user for authentification |
| http.proxy.password | Optional | Specifies the proxy password for authentification |
| http.proxy.nonproxyhosts | Optional | Specifies for which hosts the proxy should be bypassed |

<div class="panel panel-warning">
  <div class="panel-heading">
    <div class="panel-title"><span class="fa fa-warning"></span> Caution</div>
  </div>
  <div class="panel-body">
  The configuration only affects connections established by the tapir Java Virtual Machine. The web browsers (except HtmlUnit) have their own proxy configurations.
  </div>
</div>
