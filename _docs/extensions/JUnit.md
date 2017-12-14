---
title: JUnit
permalink: /docs/extensions/junit/
---

Tapir does not enforce the usage of JUnit. Tapir tests can be started
using a Java main mathod as stated in [Running your Tapir
Tests](Running_your_Tapir_Tests). Anyway, using JUnit enables a lot of
additional amenities. JUnit is widespread and integrates into existing
ecosystems quite well. There are many tools which are aware of JUnit's
API.

# Dependency

``` xml
<dependency>
  <groupId>de.bmiag.tapir</groupId>
  <artifactId>tapir-junit</artifactId>
</dependency>
```

# Eclipse

You can start your Tapir tests directly from Eclipse by rightclicking
the test class and selecting *Run as...* *\| JUnit Test*.

![](img/docs/46497836/46497856.png){width="600"}

The progress and the results are displayed in the JUnit view.

![](img/docs/46497836/46497857.png)

You can select any method/step and execute it with *Run As* \| *JUnit
Test*. The selected and all upcoming steps are executed.

# Maven

The maven-failsafe-plugin is a perfect match for running integration
tests with Tapir. If you inherit from *tapir-starter-selenium-allure*
all classes ending with TestSuite are executed. You can customize the
filter by overriding the property *test.suite.filter*. You can specify
an Ant-like filter, e.g.

``` xml
<properties>
    <test.suite.filter>**/GoogleTest.java</test.suite.filter>
</properties>
```

You can execute the tests by running this command:

``` text
> mvn clean integration-test
```

# Jenkins

[Jenkins](https://jenkins.io/) provides a[JUnit
plugin](https://plugins.jenkins.io/junit) which is 100% compatible with
Tapir. The JUnit plugin consumes XML test reports (which as generated ba
Tapir's JUniit module) and provides some graphical visualization of the
historical test results as well as a web UI for viewing test reports,
tracking failures, and so on. 

There are a couple of additional plugins which are based on the JUnit
API, like Test In Progress which visualizes the current test execution
progress.

In general all the frameworks and tools which are compatible to JUnit
are compatible to Tapir as well.

## Attachments:

![](images/icons/bullet_blue.gif){width="8" height="8"}
[RunAsJUnit.png](img/docs/46497836/46497856.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[JUnit-Result.png](img/docs/46497836/46497857.png) (image/png)  
