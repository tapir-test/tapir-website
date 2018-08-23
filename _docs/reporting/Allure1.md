---
title: Allure 1
description: Allure is a framework/tool which generates comprehensive reports for your test executions.
permalink: /docs/reporting/allure1/
redirect_from:
 - /docs/extensions/allure/
---

Allure is a framework/tool which generates comprehensive reports for
your test executions. This happens in two steps:

1.  The test results are captured and written to xml files
2.  The xml files are transformed into beautiful reports

Please consult the [Allure website](http://allure.qatools.ru/) to obtain
further information about Allure.

The Allure module acts as an adapter between <i>tapir's</i> Notification API
and Allure's Reporting API. If the optional module is in the classpath
at test runtime, the corresponding xml files are generated. These xml
files are picked up by Allure and transformed to a good-looking report.

## Dependency

``` xml
<dependency>
  <groupId>de.bmiag.tapir</groupId>
  <artifactId>tapir-allure</artifactId>
</dependency>
```

## Example

The screenshot below displays a sample test execution report.

![]({{"/img/docs/46137538/46497870.png" | prepend: site.baseurl}}){:width="600px"}

## Maven

Allure seamlessly integrates into Maven by providing a [dedicated
plugin](https://github.com/allure-framework/allure-maven). By
extending *tapir-starter-selenium-allure* you do not have to care about
the configuration as this is done by the parent pom. In order to run the
tests (using the [Maven failsafe plugin]({{"/docs/extensions/junit/" | prepend: site.baseurl}})), generate the report
and deploying the report, run the following command:

``` text
> mvn clean integration-test allure:serve
```

Maven fires up a web server and starts the browser which renders the Allure report.

## Jenkins

Allure provides a [plugin for Jenkins](https://plugins.jenkins.io/allure-jenkins-plugin).
Please consult the documentation on their website, but in general the
defaults are fine to work with <i>tapir</i>. 

The Allure Report is stored for every build and you can switch from the
Jenkins UI to the Allure report and vice versa.
