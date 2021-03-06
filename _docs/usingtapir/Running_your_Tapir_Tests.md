---
title: Running your tapir Tests
description: tapir tests can be executed with JUnit or as a standalone application. Moreover, it's possible to add custom launchers.
permalink: /docs/usingtapir/running-tapir-tests/
---

## JUnit

<i>tapir</i> tests can be executed as JUnit tests. Therefore it's possible just to perform <i>Run As -&gt; JUnit Test</i> in Eclipse to start the test. For this to work you need to include the JUnit modules for <i>tapir</i>.

``` xml
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-junit</artifactId>
</dependency>
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-junit-execution</artifactId>
</dependency>
```
## Standalone

<i>tapir</i> test suites can be started standalone. For every class annotated
with
[@TestSuite](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/annotations/suite/TestSuite.html) or [@TestClass](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/annotations/testclass/TestClass.html) a
main method is generated, which means that it can be started as a Java
application.

<div class="panel panel-warning">
  <div class="panel-heading">
    <div class="panel-title"><span class="fas fa-exclamation-circle"></span> Caution</div>
  </div>
  <div class="panel-body">
  If you start your test suite from within Eclipse with <i>Run As -&gt; Java
  Application</i>, Eclipse might report the error that the main class could
  not be found. That happens when your test suite lies in a test source
  folder. Move the file to the main source folder in order to start it as
  Java application.
  </div>
</div>

You can also run the test suite or class from the commandline:

``` text
> java de.bmiag.example.MyTestClass
```

## CLI

<i>tapir</i> provides a dedicated cli module which can be used to run test
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
