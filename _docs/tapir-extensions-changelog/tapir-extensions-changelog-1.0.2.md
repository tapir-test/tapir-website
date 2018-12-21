---
title: Changes in Version 1.0.2 (2018-12-21)
description: The changelog for the tapir extensions 1.0.2 release
permalink: /docs/tapir-extensions-changelog/1.0.2/
---

This is a bugfix release for *tapir-extensions*. We had to release this one quickly because of the [broken maven-xtend-plugin](https://github.com/eclipse/xtext/issues/1373) which causes all tapir builds to fail.

As *tapir* is also affected by this bug, we had to release [tapir 3.2.1]({{"/docs/tapir-changelog/3.2.1" | prepend: site.baseurl}}) at the same time.

We included a couple of additional bugfixes in this release which improve the JUnit 5 support in particular.

### Bugfixes
* [xtend-maven-plugin doesn't work anymore](https://github.com/tapir-test/tapir-extensions/issues/14)
* JUnit 5 issues
  * [Confusing error message when using empty test classes with JUnit5 runner](https://github.com/tapir-test/tapir-extensions/issues/5)
  * [JUnit5 tries to serialize immutable objects and fails](https://github.com/tapir-test/tapir-extensions/issues/7)
  * [JUnit5 cannot be executed from a certain step](https://github.com/tapir-test/tapir-extensions/issues/8)
* Excel reporting
  * [Incorrect parameter names in Excel reporting](https://github.com/tapir-test/tapir-extensions/issues/10)

You can find the full list [here](https://github.com/tapir-test/tapir-extensions/milestone/4?closed=1).
