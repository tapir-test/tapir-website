---
title: Web Framework Module
description: tapir's Selenium integration works with any web framework. You can build testing components which reflect the components of your Application under Test.
permalink: /docs/selenium/framework/
---
<i>tapir's</i> Selenium integration is able to automate the interaction with
any web framework. By default, only basic HTML components are
implemented, but you can build <i>tapir</i> components for the components of
your web application. For further information consult the chapter [HTML
Components]({{"/docs/customization/htmlcomponents/" | prepend: site.baseurl}}).

It's recommended to divide each web framework binding into an API and an
Implementation module. The API module provides some interfaces which
reflect the possibilities a component offers to the user. The
Implementation module provides an implementation of the API.

## Dependencies

In order to use the basic HTML components you have to add this
compile-time dependency...

``` xml
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-html-basic-api</artifactId>
</dependency>
```

... and this runtime dependency:

``` xml
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-html-basic-impl</artifactId>
</dependency>
```

## Example

Let's take a closer look at a Button component. Imagine how a user can
interact with a button. The major action he can perform is clicking the
button. Beside this action he can decide, if the button is displayed (or
hidden) and if it is enabled (clickable). The corresponding interface
exactly reflects these possibilities by providing the following methods:

-   boolean isDisplayed()
-   boolean isEnabled()
-   void click()

All of these methods are inherited from interfaces which are defined in
<i>tapir's</i> UI API:

-   [Displayable](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/ui/api/Displayable.html)
    provides *isDisplayed()*
-   [Enabable](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/ui/api/Enabable.html)
    provides *isEnabled()*
-   [Clickable](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/ui/api/Clickable.html)
    provides *click()*

This is the complete
[Button](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/htmlbasic/api/Button.html)
interface:

**Button.java**

``` java
public interface Button extends TapirElement, Displayable, Clickable, Enabable {
}

```
<div class="panel panel-warning">
  <div class="panel-heading">
    <div class="panel-title"><span class="fa fa-warning"></span> Caution</div>
  </div>
  <div class="panel-body">
  Notice the extended
  <a href="https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/ui/api/TapirElement.html">TapirElement</a>.
  This is an important marker interface as <i>tapir</i> handles interfaces which
  extend <i>TapirElement</i> specifically. Read <a href="{{"/docs/selenium/core/" | prepend: site.baseurl}}">Selenium Core
  module</a> for more information.
  </div>
</div>

We don't want to investigate the implementation further as this is
subject of the corresponding [customization chapter]({{"/docs/customization/htmlcomponents/" | prepend: site.baseurl}}).
