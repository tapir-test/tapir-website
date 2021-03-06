---
title: Test Class
description: This chapter explains the concept of test classes.
permalink: /docs/usingtapir/test-class/
---

In order to use test classes in your project, you need the tapir-execution module.

``` xml
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-execution</artifactId>
</dependency>
```

## Structure

A test class (annotated with
[@TestClass](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/annotations/testclass/TestClass.html)) is
an executable unit which contains at least one step. All the steps
(annotated with
[@Step](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/annotations/step/Step.html)) declared
in a test class are executed sequentially. The most simple test class
looks like this:

``` xtend
@TestClass
class MyTest {
    @Step
    def void step1() {
        println("Step 1 is executed")
    }
}
```

## Using Page Objects

Test classes should use page objects to interact with the SUT. Like any
other Spring bean these page objects can be autowired by using
Spring's *@Autowire* annotation. You can find additional information
about page objects in the [dedicated chapter]({{ "/docs/usingtapir/page-objects/" | prepend: site.baseurl }}).

<div class="panel panel-info">
  <div class="panel-heading">
    <div class="panel-title"><span class="fas fa-info-circle"></span> Hint</div>
  </div>
  <div class="panel-body">
  You can inject any bean by using <i>@Autowired</i>. This capability is not
  limited to page objects.
  </div>
</div>

``` xtend
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

## Extensions

In every Test
class [TapirAssertions](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/util/extensions/TapirAssertions.html)
is registered and all its visible members can be used in the test class:

``` xtend
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
using [@UseExtension](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/core/annotation/useextension/UseExtension.html).

## UseBean

You can use the annotation [@UseBean](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/core/annotation/usebean/UseBean.html) to inject arbitrary beans into your test class. It adds the given bean classes under a default name as a field and adds Spring's *Autowired* annotation. This works similar to *@UseExtension*, but does not add the new field as *extension*. This annotation is useful if you want to use multiple page objects in your test and don't want to add each of them as a field.

``` xtend
@TestClass
@UseBean(MyPage)
class MyTest {
 
    @Step
    def void step1() {
        assertThat(myPage.textField.text, is("Test"))
    }
}
```

## Documentation

Test classes can and should be documented. There is a dedicated chapter
about [Documentation]({{"/docs/extensions/documentation/" | prepend: site.baseurl}}).

<div class="panel panel-info">
  <div class="panel-heading">
    <div class="panel-title"><i class="fa fa-external-link" aria-hidden="true"></i> Showcase</div>
  </div>
  <div class="panel-body">
  <ul>
    <li>
        <a href="https://github.com/tapir-test/tapir-showcase/blob/master/google/google-systemtest/src/test/java/de/bmiag/tapir/showcase/google/systemtest/GoogleSuggestSystemTest.xtend">GoogleSuggestSystemTest</a>
    </li>
    <li>
        <a href="https://github.com/tapir-test/tapir-showcase/blob/master/wikipedia/src/test/java/de/bmiag/tapir/showcase/wikipedia/test/WikipediaSmokeTest.xtend">WikipediaSmokeTest</a>
    </li>
    <li>
        <a href="https://github.com/tapir-test/tapir-showcase/blob/master/wikipedia/src/test/java/de/bmiag/tapir/showcase/wikipedia/test/WikipediaContentTableTest.xtend">WikipediaContentTableTest</a>
    </li>
  </ul>
  </div>
</div>
