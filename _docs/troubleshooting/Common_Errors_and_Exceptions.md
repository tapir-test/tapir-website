---
title: Common Errors and Exceptions
description: This chapter shows some common errors and exceptions and how to solve them.
permalink: /docs/troubleshooting/common-errors-and-exceptions/
---

This chapter shows some common errors and exceptions, which can occur when working with <i>tapir</i>, and shows you how to solve them.

## Old Xtend Version

### Error

```
Error during annotation processing:
java.lang.IllegalArgumentException: org.springframework.context.annotation.ComponentScan.Filter[] is not applicable at this location. Expected org.springframework.context.annotation.ComponentScan$Filter[]
  at com.google.common.base.Preconditions.checkArgument(Preconditions.java:122)
  at org.eclipse.xtend.core.macro.ConditionUtils.checkTypeName(ConditionUtils.java:80)
```

### Solution

This error is a result of a [Bug in Xtend](https://bugs.eclipse.org/bugs/show_bug.cgi?id=487559), which is solved in Version 2.13. In order to avoid this problem, please make sure that your Eclipse contains Xtend 2.13. You might also want to consider to use the [Eclipse installer]({{"/docs/gettingstarted/installation/#alternative-1-eclipse-installer-recommended" | prepend: site.baseurl}}), as the package contains already everything to start directly with <i>tapir</i>.

## Missing Bootstrap configuration

### Error
```
java.lang.IllegalStateException: The Spring application sources cannot be determined.
```

### Solution

This error is usually the result of a missing bootstrap configuration. Each module in which you want to execute tests, needs a bootstrap configuration class as described in the [Module chapter]({{"/docs/usingtapir/modules/#bootstrap-module" | prepend: site.baseurl}}).
