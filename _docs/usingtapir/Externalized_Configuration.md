---
title: Externalized Configuration
permalink: /docs/usingtapir/externalized-configuration/
---

<i>tapir</i> allows you to externalize your configuration so you can work with
the same test code in different environments. You can use properties
files and System properties to externalize configuration. Property
values can be injected directly into your beans using
the [@Value](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/beans/factory/annotation/Value.html) annotation.

The scope of available properties is very much dependent on the <i>tapir</i>
modules you use. Therefore no complete reference is provided, but the
documentation of each modules explains it's own properties.

# @PropertySource

Spring's [@PropertySource](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/context/annotation/PropertySource.html) annotation provides a convenient and
declarative mechanism to include properties files. Most likely you
annotate your [@BootstrapConfiguration](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/bootstrap/annotation/BootstrapConfiguration.html) annotated class
with *@PropertySource* in order to use one or more properties files.

## Example

**TestConfiguration.xtend**

``` java
@BootstrapConfiguration
@PropertySource(value = "classpath:test.properties")
public class TestConfiguration {
}
```

**test.properties**

``` text
browser=chrome
```

<div class="panel panel-info">
  <div class="panel-heading">
    <h3 class="panel-title"><span class="fa fa-info-circle"></span> Showcase</h3>
  </div>
  <div class="panel-body">
  Used by
  <a href="https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/showcase/TestConfiguration.html">de.bmiag.tapir.showcase.TestConfiguration</a>.
  </div>
</div>

# System Property

In addition to defining properties via properties files it's possible to
use JAVA VM System properties. System properties have higher precendence
as property sources and overwrite values defined in properties files.

``` text
-Dbrowser=chrome
```
