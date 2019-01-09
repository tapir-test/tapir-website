---
title: Changes in Version 3.3.0 (2018-01-09)
description: The changelog for the tapir 3.3.0 release
permalink: /docs/tapir-changelog/3.3.0/
---

### Enhancements
* New annotation *UseBean*. For further information consult the [Test Class chapter]({{"/docs/usingtapir/test-class/" | prepend: site.baseurl}}).
* New element *FeatureBasedContainer* and service *FeatureBasedContainerFilterService*. For further information consult the [Variant Management chapter]({{"/docs/controlflow/variant-management/" | prepend: site.baseurl}}).

### Deprecations
Deprecated API will be removed with tapir 4.0.0.
* The *evaluate* methods of *de.bmiag.tapir.variant.filter.FeatureBasedParameterFilter* are marked as deprecated and should be replaced with the *evaluate* methods of *de.bmiag.tapir.variant.service.FeatureCheckService*.
