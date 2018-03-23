---
title: Changes in Version 3.1.0 (2018-03-23)
description: The changelog for the 3.1.0 release
permalink: /docs/changelog/changelog-3.1.0/

---

### Enhancements
* Fields in page object can now be annotated with @Private. This will generate the field as *private* instead of *public*.
* The CsvDataSource can now be used with optional fields in the data container. Other generic types are still not supported, but are now shown as error.
* *tapir* supports now the headless modes of Firefox and Chrome.
* Assertions are now backed up by *AssertJ*. This enhancement comes with a completely new API for using assertions in your test cases.
* Various performance improvements.

### Bugfixes
* *tapir* does no longer open an empty browser window at the end of a test.
* It is no longer necessary to specify user name and password for HTTP proxies if the proxy does not expect an authentication.
* Issue tags are now included in the execution plan.
* The Allure listener now includes the parameters into the title of a test class. This makes sure that Allure does no longer aggregate test classes with different parameters into a single run.
