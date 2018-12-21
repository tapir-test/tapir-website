---
title: Changes in Version 3.2.1 (2018-12-21)
description: The changelog for the tapir 3.2.1 release
permalink: /docs/tapir-changelog/3.2.1/
---

*tapir* 3.2.1 is a bugfix release. We had to release this one quickly because of the [broken maven-xtend-plugin](https://github.com/eclipse/xtext/issues/1373) which causes all tapir builds to fail.

As *tapir-extensions* is also affected by this bug, we had to release [tapir Extensions 1.0.2]({{"/docs/tapir-extensions-changelog/1.0.2" | prepend: site.baseurl}}) at the same time.

### Bugfixes
* Workaround for the [broken maven-xtend-plugin](https://github.com/eclipse/xtext/issues/1373)
* NullPointerException in *ConfigurationProcessor*
* A couple of minor bugfixes
