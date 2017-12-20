---
title: Test Suite
permalink: /docs/usingtapir/test-suite/
---

Test suites compose other test suites or test classes. They are a
structural utility. You define a test suite by annotating a class
with [@TestSuite](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/annotations/suite/TestSuite.html).

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


# Failure Handling

By default subsequent children are skipped if the execution of one child
failed. You can customize this behaviour by annotating the test suite
with [@ProceedOnFailure](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/annotations/behaviour/ProceedOnFailure.html).

<div class="panel panel-info">
  <div class="panel-heading">
    <h3 class="panel-title"><span class="fa fa-info-circle"></span> Showcase</h3>
  </div>
  <div class="panel-body">
  There is one test class in the showcase:
  <ul>
    <li>de.bmiag.tapir.showcase.test.WikipediaTestSuitet</li>
  </ul>
  </div>
</div>
