---
title: Changes in Version 3.1.0 (2018-03-23)
description: The changelog for the 3.1.0 release
permalink: /docs/changelog/changelog-3.1.0/

---

### Enhancements
* Fields in page object can now be annotated with @Private. This will avoid the generation of a *public* getter.
* The CsvDataSource can now be used with optional fields in the data container. Other generic types are still not supported, but are now marked as error.
* *tapir* now supports the headless mode of Firefox.
* Assertions are now backed up by *AssertJ*. This enhancement comes with a completely new API for using assertions in your test cases. For further information consult the [Assertions chapter]({{"/docs/usingtapir/assertions/" | prepend: site.baseurl}}).
* Various performance improvements.

### Bugfixes
* *tapir* does no longer open an empty browser window at the end of a test.
* It is no longer necessary to specify user name and password for HTTP proxies if the proxy does not expect an authentication.
* Issue tags are now included in the execution plan.
* The Allure listener now includes the parameters into the title of a test class. This makes sure that Allure does no longer aggregate test classes with different parameters into a single run.

### Deprecations
Deprecated API will be removed with tapir 4.0.0.
* *de.bmiag.tapir.util.action.Action* is marked as deprecated and should be replaced by *de.bmiag.tapir.execution.annotations.action.Action*
* *de.bmiag.tapir.util.extensions.TapirAssertions* and all its methods are marked as deprecated. Please use the AssertJ based assertions like  *de.bmiag.tapir.coreassertion.CoreAssertions*.
* *de.bmiag.tapir.selenium.element.InvalidTapirElementStateException* is marked as deprecated, instead throw an *java.lang.AssertionError*.
