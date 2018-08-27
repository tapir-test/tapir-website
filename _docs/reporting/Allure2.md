---
title: Allure 2
description: Allure is a framework/tool which generates comprehensive reports for your test executions.
permalink: /docs/reporting/allure2/
redirect_from:
 - /docs/extensions/allure/
 tapir-extensions-module: tapir-extensions-junit5-execution
---

Allure is a framework/tool which generates comprehensive reports for
your test executions. This happens in two steps:

1.  The test results are captured and written to json files
2.  The json files are transformed into beautiful reports

Please consult the [Allure website](http://allure.qatools.ru/) to obtain
further information about Allure.

The Allure module acts as an adapter between <i>tapir's</i> Notification API
and Allure's Reporting API. If the optional module is in the classpath
at test runtime, the corresponding xml files are generated. These xml
files are picked up by Allure and transformed to a good-looking report.

## Dependency

``` xml
<dependency>
  <groupId>io.tapirtest</groupId>
  <artifactId>tapir-extensions-allure2</artifactId>
  <version>{{site.latesttapirextensionsversion}}</version>
</dependency>
```

## Example

The screenshot below displays a sample test execution report.

![]({{"/img/docs/46137538/46497870.png" | prepend: site.baseurl}}){:width="600px"}

## Maven

Allure seamlessly integrates into Maven by providing a [dedicated
plugin](https://github.com/allure-framework/allure-maven).
If you use [JUnit 4]({{"/docs/execution/junit4/" | prepend: site.baseurl}}) or [JUnit 5]({{"/docs/execution/junit5/" | prepend: site.baseurl}}), consult the corresponding documentation.

In general you can just use this command:

``` text
> mvn clean test allure:serve
```

Maven fires up a web server and starts the browser which renders the Allure report.

## Jenkins

Allure provides a [plugin for Jenkins](https://plugins.jenkins.io/allure-jenkins-plugin).
Please consult the documentation on their website, but in general the
defaults are fine to work with <i>tapir</i>. 

The Allure Report is stored for every build and you can switch from the
Jenkins UI to the Allure report and vice versa.
