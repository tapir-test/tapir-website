---
title: Web Browser Module
description: For each supported web browser (Chrome, Firefox, Internet Explorer, HtmlUnit) tapir provides an optional module.
permalink: /docs/selenium/browser/
---
<i>tapir's</i> web browser implementations are organized in optional modules.
<i>tapir</i> delivers four built-in browser modules, but feel free to add a
module for your favorite web browser (emulation).

-   [Chrome](#WebBrowsermodule-Chrome)
-   [Firefox](#WebBrowsermodule-Firefox)
-   [Internet Explorer](#WebBrowsermodule-InternetExplorer)
-   [HtmlUnit](#WebBrowsermodule-HtmlUnit)

## Chrome {#WebBrowsermodule-Chrome}

### Dependency

``` xml
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-selenium-chrome</artifactId>
</dependency>
```

### Activation

Chrome is activated by setting the *browser* property:

``` java
browser=chrome
```

### Properties

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th>Property</th>
<th>Info</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>chrome.connection.mode</td>
<td><p>Possible values: local, remote</p>
<p>Default: local</p></td>
<td>Specifies if the Chrome connection should be established locally or remotely, see <a href="https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/selenium/chrome/driver/ChromeConnectionMode.html">ChromeConnectionMode</a>.</td>
</tr>
<tr class="even">
<td>chrome.chromedriver.binary</td>
<td> </td>
<td>Location of the ChromeDriver binary. If this property is not specified, tapir tries to download the latest chrome driver (or uses a cached one).</td>
</tr>
<tr class="odd">
<td>chrome.browser.binary</td>
<td> </td>
<td>Location of the Chrome browser binary. Required if the connection mode is local and the binary is not in the path environment variable</td>
</tr>
<tr class="even">
<td>chrome.driverservice.url</td>
<td> </td>
<td>URL of the driver server. Required if the connection mode is remote.</td>
</tr>
<tr class="odd">
<td>chrome.headless.mode</td>
<td>Default: false</td>
<td>Specifies if Chrome should be started in headless mode (without visible UI)</td>
</tr>
</tbody>
</table>

To run <i>tapir</i> tests with Chrome, you have to fire up the
ChromeDriver which acts as a bridge between your test code and the
Chrome browser. For further information consult [the ChromeDriver
website](https://sites.google.com/a/chromium.org/chromedriver). Ensure
that the ChromeDriver you use is compatible with your Chrome browser
version.

The Chrome integration is very fast and reliable, so using <i>tapir</i> in
conjunction with Chrome is recommended.

## Firefox {#WebBrowsermodule-Firefox}

### Dependency

``` xml
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-selenium-firefox</artifactId>
</dependency>
```

### Activation

Firefox is activated by setting the *browser* property:

``` java
browser=firefox
```

### Properties

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th>Property</th>
<th>Info</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>firefox.connection.mode</td>
<td><p>Possible values: local, remote, legacy</p>
<p>Default: legacy</p></td>
<td><p>Specifies if the Firefox connection should be established via the legacy mode or the gecko driver (local/remote), see <a href="https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/selenium/firefox/driver/FirefoxConnectionMode.html">FirefoxConnectionMode</a>.</p></td>
</tr>
<tr class="even">
<td>firefox.geckodriver.binary</td>
<td> </td>
<td>Location of the GeckoDriver binary.  If this property is not specified, tapir tries to download the latest gecko driver (or uses a cached one).</td>
</tr>
<tr class="odd">
<td>firefox.browser.binary</td>
<td> </td>
<td>Location of the Firefox browser binary. Required if the connection mode is local or legacy and the binary is not in the path environment variable</td>
</tr>
<tr class="even">
<td>firefox.driverservice.url</td>
<td> </td>
<td>URL of the driver server. Required if the connection mode is remote.</td>
</tr>
<tr class="odd">
<td>firefox.headless.mode</td>
<td>Default: false</td>
<td>Specifies if Firefox should be started in headless mode (without visible UI)</td>
</tr>
<tr class="even">
<td>firefox.connection.timeout</td>
<td>Default: 60</td>
<td>Connection timeout to the Firefox browser in seconds.</td>
</tr>
</tbody>
</table>

Firefox 48 and above does not support the legacy connection mode
anymore. To run <i>tapir</i> tests, you have to fire up the GeckoDriver which
acts as a bridge between your test code and the Firefox browser. For
further information consult [the GeckoDriver
website](https://github.com/mozilla/geckodriver). Ensure that the
GeckoDriver you use is compatible with your Firefox browser version.

Firefox &lt; 48 does not require the GeckoDriver. Selenium WebDriver
interacts with the web browser directly. You have to switch the
connection mode to *legacy*.

The Firefox integration (especially the one based on the GeckoDriver) is
not feature-complete and therefore not as stable as the Chrome
integration.

## Internet Explorer {#WebBrowsermodule-InternetExplorer}

### Dependency

``` xml
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-selenium-ie</artifactId>
</dependency>
```

### Activation

Internet Explorer is activated by setting the *browser* property:

``` java
browser=internetexplorer
```

### Properties

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th>Property</th>
<th>Info</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>internetexplorer.connection.mode</td>
<td><p>Possible values: local, remote</p>
<p>Default: local</p></td>
<td><p>Specifies if the Internet Explorer connection should be established locally or remotely, see <a href="https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/selenium/ie/driver/InternetExplorerConnectionMode.html">InternetExplorerConnectionMode</a>.</p></td>
</tr>
<tr class="even">
<td>internetexplorer.driverservice.binary</td>
<td> </td>
<td>Location of the DriverServer binary.  If this property is not specified, tapir tries to download the latest Internet Explorer driver (or uses a cached one).</td>
</tr>
<tr class="odd">
<td>internetexplorer.driverservice.url</td>
<td> </td>
<td>URL of the driver server. Required if the connection mode is remote.</td>
</tr>
</tbody>
</table>

To run <i>tapir</i> tests with Internet Explorer, you have to fire up
the DriverServer which acts as a bridge between your test code and the
Internet Explorer. For further information consult [the
InternetExplorerDriver
website](https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver).

<div class="panel panel-warning">
  <div class="panel-heading">
    <div class="panel-title"><span class="fas fa-exclamation-circle"></span> Caution</div>
  </div>
  <div class="panel-body">
    The Internet Explorer will only work on Windows!
  </div>
</div>

## HtmlUnit {#WebBrowsermodule-HtmlUnit}

### Dependency

``` xml
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-selenium-htmlunit</artifactId>
</dependency>
```

### Activation

HtmlUnit is activated by setting the *browser* property:

``` java
browser=htmlunit
```

### Properties

There are no special HtmlUnit properties. The proxy settings are configured via [HTTP Proxy]({{"/docs/usingtapir/http-proxy/" | prepend: site.baseurl}}).

HtmlUnit is a headless web browser implemented in Java. Therefore it
does not need any additional binaries. All required depdendencies are
provided by <i>tapir</i>. HtmlUnit does not require a graphical user interface.

HtmlUnit is very fast as it does emulate the browser interaction and
does not render the web site. For further information consult the [HtmlUnitDriver website](https://github.com/SeleniumHQ/htmlunit-driver).

<div class="panel panel-warning">
  <div class="panel-heading">
    <div class="panel-title"><span class="fas fa-exclamation-circle"></span> Caution</div>
  </div>
  <div class="panel-body">
  HtmlUnit does not have a rendering engine, so you cannot see any browser
  interaction on the screen. Moreover, it's not possible to capture
  screenshots.
  </div>
</div>
