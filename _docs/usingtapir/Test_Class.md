---
title: Test Class
permalink: /docs/usingtapir/testclass/
---
# Structure

A test class (annotated with
[@TestClass](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/annotations/testclass/TestClass.html)) is
an executable unit which contains at least one step. All the steps
(annotated with
[@Step](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/annotations/step/Step.html)) declared
in a test class are executed sequentially. The most simple test class
looks like this:

``` java
@TestClass
class MyTest {
    @Step
    def void step1() {
        println("Step 1 is executed")
    }
}
```

# Using Page Objects

Test classes should use page objects to interact with the SUT. Like any
other Spring bean these page objects can be autowired by using
Spring's *@Autowire* annotation. You can find additional information
about page objects in the [dedicated chapter](Page_Objects).

You can inject any bean by using *@Autowired*. This capability is not
limited to page objects.

``` java
@TestClass
class MyTest {
 
    @Autowired
    MyPage myPage

    @Step
    def void step1() {
        myPage.textField.text = "Test"
    }
}
```

# Extensions

In every Test
class [TapirAssertions](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/util/extensions/TapirAssertions.html)
is registered and all its visible members can be used in the test class:

``` java
@TestClass
class MyTest {
 
    @Autowired
    MyPage myPage

    @Step
    def void step1() {
        assertThat(myPage.textField.text, is("Test"))
    }
}
```

You can add custom extensions by
using [@UseExtension](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/core/annotation/useextension/UseExtension.html).

# Documentation

Test classes can and should be documented. There is a dedicated chapter
about [Documentation](Documentation).

Showcase

There are two test classes in the showcase:

-   de.bmiag.tapir.showcase.test.WikipediaContentTableTest
-   de.bmiag.tapir.showcase.test.WikipediaSmokeTest

 

 
