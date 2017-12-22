---
title: Why does tapir use Xtend?
description: tapir uses Xtend because of its syntactic sugar and code generation capabilities.
permalink: /docs/usingtapir/xtend/
---

Xtend is a statically-typed programming language which translates to
comprehensible Java source code. Syntactically and semantically Xtend
has its roots in the Java programming language but improves it on many
aspects.

All of Xtend's features can be used in <i>tapir</i>, but we focus only on the
most important ones in this documentation. To get a full set of the
advantages over plain Java consult the Xtend documentation.

## Active Annotations

<div class="panel panel-info">
  <div class="panel-heading">
    <div class="panel-title"><span class="fa fa-info-circle"></span> Hint</div>
  </div>
  <div class="panel-body">
  The complete documentation can be found <a href="http://www.eclipse.org/xtend/documentation/204_activeannotations.html">here</a>.
  </div>
</div>

Active annotations allow developers to participate in the translation
process of Xtend source code to Java code via library code. 

<i>tapir</i> uses this feature a lot as it facilitates the user to focus on his
domain without struggling with boilerplate and glue code. Most of the
annotations provided by <i>tapir</i> are Active Annotations. <i>tapir</i> uses Xtend
to guide the test developer. You could say that <i>tapir</i> provides an
internal DSL (Domain Specific Language) for Xtend.

## Example

<i>tapir</i> Testcases are organized in steps which are executed sequentially.
Unfortunately the order of methods is not included in Java's bytecode.
Therefore we need another way to determine the order at runtime. <i>tapir</i>
uses the Active Annotation [@Step](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/annotations/step/Step.html) to achieve this. A [@DependsOn](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/annotations/dependency/DependsOn.html) which
refers the name of the predecessor is generated. This information is
evaluated at runtime and the methods can be sorted and executed in the
desired order.

**MyTest.xtend**

``` xtend
@TestClass
class MyTest {
    @Step
    def void step1() {
    }
 
    @Step
    def void step2() {
    }
}
```

 

**MyTest.java**

``` java
@TestClass
public class MyTest {
    @Step
    public void step1() {
    }
 
    @Step
    @DependsOn("step1")
    public void step2() {
    }
}
```

Consult the javadoc of the concrete annotation in order to understand
how it is processed.

## Extension Methods

<div class="panel panel-info">
  <div class="panel-heading">
    <div class="panel-title"><span class="fa fa-info-circle"></span> Hint</div>
  </div>
  <div class="panel-body">
  The complete documentation can be found <a href="http://www.eclipse.org/xtend/documentation/202_xtend_classes_members.html#extension-methods">here</a>.
  </div>
</div>

Extension methods allow to add new methods to existing types without
modifying them. This feature is actually where Xtend got its name from. 

Extension methods enrich <i>tapir</i>'s API when writing test cases. On every
[@TestClass](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/model/TestClass.html) annotated class [TapirAssertions](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/util/extensions/TapirAssertions.html) is registered as extension.
Therefore you can use methods like assertThat or containsString. By
using [@UseExtension](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/core/annotation/useextension/UseExtension.html) it is possible to add custom extensions like
[BrowserInteractionService](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/selenium/service/BrowserInteractionService.html) which provides *openURL* and *getTitle*.

**GoogleTest.xtend**

``` xtend
@TestClass
@UseExtension(BrowserInteractionService)
class GoogleTest {

    @Step
    def void openWebsite() {
        openURL("http://google.com/?hl=en")
    }

    @Step
    def void assertTitle() {
        assertThat(title, containsString("Google"))
    }
}
```

Generally, extension methods facilitate the *Composition over
Inheritence principle*. Most of the <i>tapir</i> classes choose [composition
over
inheritence](https://en.wikipedia.org/wiki/Composition_over_inheritance)
for the known reasons.

## Syntactic Sugar

Xtend offers a lot of syntactic sugar like

-   [Getter
    access](https://eclipse.org/xtend/documentation/203_xtend_expressions.html#property-access) -
    You can access getters by the property name

    **Xtend**

    ``` xtend
     println(googlePage.queryField.text)
    ```

    **Generated Java**

    ``` java
    InputOutput.<String>println(this.googlePage.getQueryField().getText());
    ```

-   [Setter
    access](https://eclipse.org/xtend/documentation/203_xtend_expressions.html#property-assignments) -
    Calling setters can be done with assignments

    **Xtend**

    ``` xtend
    googlePage.queryField.text = "tapir" 
    ```

    **Generated Java**

    ``` java
    this.googlePage.getQueryField().setText("tapir");
    ```

-   [it
    keyword](https://eclipse.org/xtend/documentation/203_xtend_expressions.html#implicit-variables) -
    e.g. in lamdba expression you do not have to name the parameter
    explictly

This is just a small insight to Xtend. You can use any Xtend feature in
conjunction with <i>tapir</i>. We highly recommend to take a look at Xtend as
it's a very powerful JVM-based language. You can find more information
at their [website](https://eclipse.org/xtend/).
