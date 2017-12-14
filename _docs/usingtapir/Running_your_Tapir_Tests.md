---
title: Running your tapir Tests
permalink: /docs/usingtapir/runningtapirtests/
---

# JUnit

# Standalone

Tapir test suites can be started standalone. For every class annotated
with
[@TestSuite](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/annotations/suite/TestSuite.html) or [@TestClass](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/annotations/testclass/TestClass.html) a
main method is generated, which means that it can be started as a Java
application.

If you start your test suite from within Eclipse with *Run As -&gt; Java
Application*, Eclipse might report the error that the main class could
not be found. That happens when your test suite lies in a test source
folder. Move the file to the main source folder in order to start it as
Java application.

You can also run the test suite or class from the commandline:

``` text
> java de.bmiag.example.MyTestClass
```

# CLI

Tapir provides a dedicated cli module which can be used to run test
suites or classes. Currently this module does not provide any advantages
compared to the way introduced in the last chapter, but later on you
might be able to provide some custom properties which influence the
execution.

## Dependency

``` xml
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-cli</artifactId>
</dependency>
```

## Example

The *TapirLauncher* contains a main method, which means you can start it
via the command line. The class to be executed is given as parameter.

``` text
> java de.bmiag.tapir.cli.TapirLauncher de.bmiag.example.MyTestClass
```
