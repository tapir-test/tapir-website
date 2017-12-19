---
title: Web Framework Module
permalink: /docs/selenium/webframeworkmodule/
---
Tapir's Selenium integration is able to automate the interaction with
any web framework. By default, only basic HTML components are
implemented, but you can build Tapir components for the components of
your web application. For further information consult the chapter [HTML
Components](HTML_Components).

It's recommended to divide each web framework binding into an API and an
Implementation module. The API module provides some interfaces which
reflect the possibilities a component offers to the user. The
Implementation module provides an implementation of the API.

# Dependencies

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

# Example

Let's take a closer look at a Button component. Imagine how a user can
interact with a button. The major action he can perform is clicking the
button. Beside this action he can decide, if the button is displayed (or
hidden) and if it is enabled (clickable). The corresponding interface
exactly reflects these possibilities by providing the following methods:

-   boolean isDisplayed()
-   boolean isEnabled()
-   void click()

All of these methods are inherited from interfaces which are defined in
Tapir's UI API:

-   [Displayable](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/ui/api/Displayable.html)
    provides *isDisplayed()*
-   [Enabable](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/ui/api/Enabable.html)
    provides *isEnabled()*
-   [Clickable](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/ui/api/Clickable.html)
    provides *click()*

This is the complete
[Button](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/htmlbasic/api/Button.html)
interface:

**Button.java**

``` java
public interface Button extends TapirElement, Displayable, Clickable, Enabable {
}
```

Notice the extended
[TapirElement](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/ui/api/TapirElement.html).
This is an important marker interface as Tapir handles interfaces which
extend *TapirElement* specifically. Read [Selenium Core
module](Selenium_Core_module) for more information.

We don't want to investigate the implementation further as this is
subject of the corresponding [customization chapter](HTML_Components).
