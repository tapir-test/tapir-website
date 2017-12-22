---
title: Concurent Test Execution
description: tapir tests can optionally executed in parallel.
permalink: /docs/usingtapir/concurrency/
---

<i>tapir</i> provides the possibility to execute tests concurrently. This can
be useful to speed up the test execution or if you want to test how your
application handles concurrent access (possibly to detect concurrency
issues or as a load test). The concurrent test execution is part of
<i>tapir's</i> execution module.

``` xml
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-execution</artifactId>
</dependency>
```
<div class="panel panel-warning">
  <div class="panel-heading">
    <h3 class="panel-title"><span class="fa fa-warning"></span> Caution</h3>
  </div>
  <div class="panel-body">
  Keep in mind that a concurrent test execution can also mean that it is
  more difficult to reproduce error scenarios. Also, <i>tapir</i> doesn't provide
  explicit support for locking and unlocking shared resources for the test
  cases. You still have to care about this yourself.
  </div>
</div>

# Parallelize Test Suites and Test Cases

The annotation [@Parallel](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/annotations/behaviour/Parallel.html) can be used to mark test classes or test suites
for concurrent execution.

``` xtend
@TestSuite(#[TestClass2, TestClass3])
@Parallel
class TestSuite1 {
    ...
}

@TestClass
@Parallel
class TestClass1 {
   ...
}
```

If you annotate a test suite with *Parallel*, <i>tapir</i> executes each test
class (or test suite) of the suite in parallel. In the above example,
the execution of *TestSuite1* would start *TestClass2* and *TestClass3*
in parallel. Annoting a test class becomes interesting when you use the
[@IteratedParameter](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/annotations/parameter/IteratedParameter.html)annotation
from the [data provider module]({{"/docs/usingtapir/data-provider/" | prepend: site.baseurl}}) on a field. If a field of
a test class is annotated with *IteratedParameter*, then the test class
is executed for each element of the corresponding data collection. If
the test class itself is annotated with the *Parallel* annotation, then
each of these executions is started in parallel.

However, the *Parallel* annotation affects only the direct children of
the annotated element. Assume the following example in which
*MyTestSuite1* is annotated and consists just of the execution of
*MyTestSuite2* which itself has three test classes as children.

``` xtend
@TestSuite(#[MyTestSuite2])
@Parallel
class MyTestSuite1 {
}

@TestSuite(#[MyTestCase1, MyTestCase2, MyTestCase3])
class MyTestSuite2 {
}
```

Executing *MyTestSuite1* will **not** start the three test cases
*MyTestCase1*, *MyTestCase2* and *MyTestCase3* in parallel. It will only
start *MyTestSuite2* in parallel (which doesn't have any effect, as
there are no further children of *MyTestSuite1*). If you would want to
start the test cases in parallel, you would have to annotate
*MyTestSuite2*.

# Execution of the Tasks

Per default, the
[TapirTaskExecutor](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/executor/TapirTaskExecuter.html)is
responsible for executing the *Runnables* for the test suites and test
cases. The executor is a Spring component with the name
*tapirTaskExecutor*, which means that you can overwrite it, if you feel
that this is necessary. The component delegates the task execution to
Spring's *ThreadPoolTaskExecutor* with a default pool size of four. You
can change this value by setting the property *threadPoolSize* to
another value. Take a look at the chapter [Externalized
Configuration]({{"/docs/usingtapir/externalized-configuration/" | prepend: site.baseurl}}) on how to do this.
