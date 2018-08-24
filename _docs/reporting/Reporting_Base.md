---
title: Reporting Base
description: A base for reporting modules
permalink: /docs/reporting/reporting-base/
tapir-extensions-module: tapir-extensions-reporting-base
---

This module contains an implementation of *tapir*'s execution listener, which can be used as a base for concrete reporting classes. To use it, you simply need to add it as Maven dependency.

## Dependency

``` xml
<dependency>
  <groupId>io.tapirtest</groupId>
  <artifactId>tapir-extensions-reporting-base</artifactId>
  <version>{{site.latesttapirextensionsversion}}</version>
</dependency>
```

## Usage

*tapir*'s default implementations use either frameworks which have to be informed about each event (JUnit) or have an internal model, which stores the events (Allure). However, some people might want to develop reporting listeners which simply convert the resulting execution at the end into a report instead of listening to each single execution event. The *tapir extensions* reporting base provides the *AbstractBaseReportingListener* class which collects all the events during the execution. The concrete implementation of this class is informed after the execution and is provided with *tapir*'s execution plan and a mapping to retrieve information about the execution.
