---
title: Excel Reporting
description: This module allows to create reports in the Excel format.
permalink: /docs/reporting/excel/
tapir-extensions-module: tapir-extensions-reporting-excel
---

<div class="panel panel-warning">
  <div class="panel-heading">
    <div class="panel-title"><span class="fas fa-exclamation-circle"></span> Caution</div>
  </div>
  <div class="panel-body">
  Note that this module uses the Apache Poi library, which means that the licenses of Apache Poi apply, when you use them.
  </div>
</div>

This module contains a reporting listener which writes an Excel report about the test execution. To use it, you simply need to add it as Maven dependency.

## Dependency

``` xml
<dependency>
  <groupId>io.tapirtest</groupId>
  <artifactId>tapir-extensions-reporting-excel</artifactId>
  <version>{{site.latesttapirextensionsversion}}</version>
</dependency>
```

## Usage

As many other *tapir* modules, it contains an auto configuration, which means that it is already executed once it is part of the classpath. The execution listener has an order of 7000, which is equal to the Allure listener. Specify the output directory for the export with the property *rapid.reporting.excel.outputDirectory*. If you want the report to show step parameters, set the property *rapid.reporting.excel.displayStepParameters* to *true*. In this case it is recommended to use a custom labeled data container with *singleLine* set to *true*.
