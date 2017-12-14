---
title: Test Suite
permalink: /docs/usingtapir/testsuite/
---

Test suites compose other test suites or test classes. They are a
structural utility. You define a test suite by annotating a class
with [@TestSuite](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/annotations/suite/TestSuite.html).

``` java
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
instance, if you use the [variant management](Variant_Management) module
or the [conditional](Conditional)module.

# Failure Handling

By default subsequent children are skipped if the execution of one child
failed. You can customize this behaviour by annotating the test suite
with [@ProceedOnFailure](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/annotations/behaviour/ProceedOnFailure.html).

Showcase

There is one test class in the showcase:

-   de.bmiag.tapir.showcase.test.WikipediaTestSuite
