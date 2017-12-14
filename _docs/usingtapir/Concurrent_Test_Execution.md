---
title: Concurent Test Execution
permalink: /docs/usingtapir/concurrenttestexecution/
---

Tapir provides the possibility to execute tests concurrently. This can
be useful to speed up the test execution or if you want to test how your
application handles concurrent access (possibly to detect concurrency
issues or as a load test). The concurrent test execution is part of
Tapir's execution module.

``` xml
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-execution</artifactId>
</dependency>
```

Keep in mind that a concurrent test execution can also mean that it is
more difficult to reproduce error scenarios. Also, Tapir doesn't provide
explicit support for locking and unlocking shared resources for the test
cases. You still have to care about this yourself.

# Parallelize Test Suites and Test Cases

The annotation @Parallel can be used to mark test classes or test suites
for concurrent execution.

``` java
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

If you annotate a test suite with *Parallel*, Tapir executes each test
class (or test suite) of the suite in parallel. In the above example,
the execution of *TestSuite1* would start *TestClass2* and *TestClass3*
in parallel. Annoting a test class becomes interesting when you use the
[@IteratedParameter](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/annotations/parameter/IteratedParameter.html)annotation
from the [data provider module](Data_Provider) on a field. If a field of
a test class is annotated with *IteratedParameter*, then the test class
is executed for each element of the corresponding data collection. If
the test class itself is annotated with the *Parallel* annotation, then
each of these executions is started in parallel.

However, the *Parallel* annotation affects only the direct children of
the annotated element. Assume the following example in which
*MyTestSuite1* is annotated and consists just of the execution of
*MyTestSuite2* which itself has three test classes as children.

``` java
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

Showcase

*Parallel* is used by
*de.bmiag.tapir.showcase.test.WikipediaContentTableTest*.

# Execution of the Tasks

Per default, the
[TapirTaskExecutor](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/executor/TapirTaskExecuter.html)is
responsible for executing the *Runnables* for the test suites and test
cases. The executor is a Spring component with the name
*tapirTaskExecutor*, which means that you can overwrite it, if you feel
that this is necessary. The component delegates the task execution to
Spring's *ThreadPoolTaskExecutor* with a default pool size of four. You
can change this value by setting the property *threadPoolSize* to
another value. Take a look at the chapter [Externalized
Configuration](Externalized_Configuration) on how to do this.

 

 
