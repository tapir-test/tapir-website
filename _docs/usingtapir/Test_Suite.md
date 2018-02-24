---
title: Test Suite
description: This chapter explains the concept of test suites.
permalink: /docs/usingtapir/test-suite/
---

In order to use test suites in your project, you need the tapir-execution module.

``` xml
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-execution</artifactId>
</dependency>
```

Test suites compose other test suites or test classes. They are a
structural utility. You define a test suite by annotating a class
with [@TestSuite](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/annotations/suite/TestSuite.html).

``` xtend
@TestSuite(#[
    MyTestClass,
    MyNestedTestSuite
])
class MyTestSuite {
}
```

Test suites do not have any members (field, methods). They just declare
their children as an attribute list in the *@TestSuite* annotation.

There are some exceptions, in which test suites do have methods. For
instance, if you use the [variant management]({{"/docs/extensions/variant-management/" | prepend: site.baseurl}}) module
or the [conditional]({{"/docs/extensions/conditional/" | prepend: site.baseurl}}) module.


## Failure Handling

By default subsequent children are skipped if the execution of one child
failed. You can customize this behaviour by annotating the test suite
with [@ProceedOnFailure](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/annotations/behaviour/ProceedOnFailure.html).

<div class="panel panel-info">
  <div class="panel-heading">
    <div class="panel-title"><i class="fa fa-external-link" aria-hidden="true"></i> Showcase</div>
  </div>
  <div class="panel-body">
  <ul>
    <li>
        <a href="https://github.com/tapir-test/tapir-showcase/blob/master/wikipedia/src/test/java/de/bmiag/tapir/showcase/wikipedia/test/WikipediaTestSuite.xtend">WikipediaTestSuite</a>
    </li>
  </ul>
  </div>
</div>
