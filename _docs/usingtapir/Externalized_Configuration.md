---
title: Externalized Configuration
permalink: /docs/usingtapir/externalizedconfiguration/
---

Tapir allows you to externalize your configuration so you can work with
the same test code in different environments. You can use properties
files and System properties to externalize configuration. Property
values can be injected directly into your beans using
the @Value annotation.

The scope of available properties is very much dependent on the Tapir
modules you use. Therefore no complete reference is provided, but the
documentation of each modules explains it's own properties.

# @PropertySource

Spring's @PropertySource annotation provides a convenient and
declarative mechanism to include properties files. Most likely you
annotate your @BootstrapConfiguration annotated class
with @PropertySource in order to use one or more properties files.

## Example

**TestConfiguration.xtend**

``` java
@BootstrapConfiguration
@PropertySource(value = "classpath:test.properties")
public class TestConfiguration {
}
```

**test.properties**

``` java
browser=chrome
```

Showcase

Used by
[de.bmiag.tapir.showcase.TestConfiguration](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/showcase/TestConfiguration.html).

# System Property

In addition to defining properties via properties files it's possible to
use JAVA VM System properties. System properties have higher precendence
as property sources and overwrite values defined in properties files.

 

``` java
-Dbrowser=chrome
```
