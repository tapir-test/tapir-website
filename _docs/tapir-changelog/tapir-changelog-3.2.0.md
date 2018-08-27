---
title: Changes in Version 3.2.0 (2018-08-27)
description: The changelog for the tapir 3.2.0 release
permalink: /docs/tapir-changelog/3.2.0/
---

### Enhancements
* Several libraries are updated:
  - Xtend 2.13.0 --> 2.14.0
  - Spring Boot: 1.5.9 --> 1.5.14
  - Selenium: 3.8.1 --> 3.14.0
  - HtmlUnit: 2.29.0 --> 2.32.0
  - Allure2: 2.0-BETA21 --> 2.7.0
  - WebDriver-Manager 2.1.0 --> 2.2.5
* New module *tapir-xunit*
* This release is the first one which works hand in hand with the tapir-extensions modules. Many modules have been developed as open-source modules, see [tapir Extensions 1.0.0]({{"/docs/tapir-extensions-changelog/1.0.0" | prepend: site.baseurl}}).

### Bugfixes
* *tapir-executiontest-lib* is deployed to Maven Central now (it was accidently omitted before)

### Deprecations
Deprecated API will be removed with tapir 4.0.0.
* *de.bmiag.tapir.junit.annotations.UnitTest* is marked as deprecated and should be replaced by *de.bmiag.tapir.xunit.annotations.UnitTest*
