---
title: Structuring your Code
description: this chapter gives a introduction in how to structure your tets code.
permalink: /docs/usingtapir/code-structure/
---

In the previous chapters test suites, test classes and page objects are
introduced. This chapter helps you to understand how to structure these
test artifacts.

# The Page Module

It's recommended to have a specific Inclusion module which contains all
page objects. This offers the possiblity to reuse these pages from
different test/bootstrap modules.

In this module you have to add a dependency to tapir-page and the ui
technlogy module you would like to use (e.g. tapir-selenium).

``` xml
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-page</artifactId>
</dependency>
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-selenium</artifactId>
</dependency>
```

Beside a class annotated
by [@ModuleConfiguration](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/bootstrap/annotation/ModuleConfiguration.html),
you just need to declare your pages in a (sub-) package of the module
configuration.

# The Test Module

Your test suites and classes should be located in a dedicated module
which depends on your pages-module. You need a @BootstrapConfiguration
annotated class. Locate all your test suites and classes in a (sub-)
package, so they are scanned automatically.

Inheriting from a tapir-starter module is the easiest way to get your
dependencies and plugins into place.

# Additional Modules

Of course you could have as many modules as you would like to.
Modularity is one of <i>tapir's</i> key paradigms, so we encourage you to build
reusable modules. These modules are similar to the page module explained
above, but the dependencies might differ due to the module's purpose.
