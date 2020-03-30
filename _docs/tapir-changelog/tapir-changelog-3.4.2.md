---
title: Changes in Version 3.4.2 (2020-03-26)
description: The changelog for the tapir 3.4.2 release
permalink: /docs/tapir-changelog/3.4.2/
---

### Enhancements
* The annotations *Variant* and *ConfigurationVariant* have now additional fields to set the property names, which are used to determine the active variant and configuration variant respectively.

### Bugfixes
* If *tapir* encounters an *ElementClickInterceptedException* due to an overlay or a dialog, it tries again to interact with the hidden element.
