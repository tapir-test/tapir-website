---
title: Assertions
description: Assertions
permalink: /docs/usingtapir/assertions/
---
For writing tests in general assertions are a fundamental element. They represent the expectation of the tester regarding the System Under Test (SUT). To understand how *tapir* treats assertions we have to split them into two blocks: implicit and explicit assertions.

## Implicit assertions
Implicit assertions are assertions you do not write down in your test code. They are derived from the statements you choose for interacting with the SUT. Implicit assertions wait for prerequisites to be fulfilled before executing subsequent statements. If the assertion fails constantly within a certain time (configurable via the [implicit wait time property]({{"/docs/usingtapir/general-properties/#implicit-wait-time" | prepend: site.baseurl}})) the test fails. There are several layers where you use *tapir's* implicit assertions.

### Interaction with an UI element
Whenever you interact with an ui component implicit assertions are checked by the framework. Let's explain this by example:
We have a simple button we would like to click. In order to be able to click on a button, the following prerequisites have to be fulfilled:
1. The button must be displayed
1. The button must be enabled (clickable)

When you call *button.click* these prerequisites are asserted automatically. You do not have to check them explicitly, because *tapir* derives them from your intent to click the button.

### Interaction with an UI element on a page
Imagine you have two pages which both have a button which is located via the name *submit*. Clicking the button on Page1 redirects you to Page2. We want to automate this flow:
1. Click on submit-button on Page1
1. Click on submit-button on Page2

While this seems to be trivial on the first sight, a major problem arises when taking a deeper look: the submit-button of both pages is addressed by the same locator (name=submit). After clicking the submit-button on Page1, the very same submit-button might be clicked again, because the SUT didn't switch to Page 2 fast enough. Even worse, it might lead to flakiness as the SUT *sometimes* switches to Page 2 fast enough. You could explicitly assert that Page 2 is active, but that information can be derived from your intent as well.

In *tapir* UI elements are organized within Page Objects. You inject these pages into your test code in order to interact with the contained UI elements. If your page implements [PageActiveCheck](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/page/annotation/PageActiveCheck.html) (which is highly recommended!) *tapir* derives additional implicit assertions.

This is the corresponding test code:
``` xtend
page1.submitButton.click
page2.submitButton.click
```

You define your intent by telling the framework on which page you would like to click the submit-button. This causes *tapir* to implicitly wait for Page 2 to be active as it otherwise wouldn't be possible to click on a button on that page. There is no need to declare this explicitly.

## Explicit assertions
Explicit assertions can by used rarely because *tapir* asserts a lot implicitly. Just by using a couple of UI interaction statements you can test, if your SUT's screenflow works as expected. You do not need any explicit assertions for that. Anyway, there are two main use-cases where a explicit assertion is necessary and reasonable:
1. Assert the value of UI elements
1. Wait for a long-running task to be completed

### Asserting the value of UI elements
Your tests gain additional value by asserting the states or values of your UI elements. You might want to check, if the text of a label is equal to your expectation. *tapir* reuses [AssertJ](http://joel-costigliola.github.io/assertj/) which provides a great fluent API for this purpose. By default the [CoreAssertions](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/coreassertion/CoreAssertions.html) class is injected as an extension in all your test classes and actions. The *CoreAssertions* provide a fluent API for all common Java types like String, Integer, BigDecimal, etc..

``` xtend
assertThat[page1.nameLabel.text].isEqualTo("Peter")
```

Unfortunately asserting values is error-prone as it is likely that in the moment you check the assertion the actual value does not match the expected one. Therefore *tapir* again waits implicitly for the value to match the expected one. This is an extension to the core AssertJ library which checks the condition once and fails on violation. The implicit waiting makes your tests much more stable and reliable.

In order to use [CoreAssertions](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/coreassertion/CoreAssertions.html) you might add this dependency:
``` xml
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-core-assertion</artifactId>
</dependency>
```

<div class="panel panel-warning">
  <div class="panel-heading">
    <div class="panel-title"><span class="fas fa-exclamation-circle"></span> Caution</div>
  </div>
  <div class="panel-body">
  In order to set the description of an assertion, AssertJ provides you with the method <i>as</i>. However, <i>as</i> is also a reserved keyword in Xtend, which may confuse Eclipse and the Xtend compiler. To solve this, escape the method name with the circumflex character and write <i>&circ;as</i> instead of <i>as</i>.
  </div>
</div>

### Waiting for long-running tasks
All implicit assertions wait until the condition is fulfilled or the implicit wait time is exceeded. There might be situation where you have to wait for a long-running task performed by your SUT. The implicit wait time's purpose is to handle short delays of your SUT and shall not be configured to exceed 10 seconds. Therefore we need another concept for waiting for long-running tasks.

The following statements expects the name-label to be "Peter" within 60 seconds (In the example *import static java.util.concurrent.TimeUnit.\** is omitted).

``` xtend
assertThatWithin(60, SECONDS)[page1.nameLabel.text].isEqualTo("Peter")
```

## Adding custom assertions

If the assertions provided by [CoreAssertions](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/coreassertion/CoreAssertions.html) are not sufficient for you, you have two options:

1. Reuse assertions provided by AssertJ
1. Write assertions for your custom types

You need this dependency:
``` xml
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-assertion</artifactId>
</dependency>
```

### Reuse assertions provided by AssertJ
*tapir's* *CoreAssertions* are a subset of AssertJ's [Assertions](http://joel-costigliola.github.io/assertj/core-8/api/org/assertj/core/api/Assertions.html) class. If your would like to have a *tapir* API for a type which is already handled by an assertThat method of *Assertions*, proceed with the section [Generating waiting assertions from AssertJ Assertions class](#generating-waiting-assertions-from-assertj-assertions-class).

### Write assertions for your custom types
In case you want to add assertions for your custom types, AssertJ describes how to do that: [Custom assertions](http://joel-costigliola.github.io/assertj/assertj-core-custom-assertions.html).

We recommend to follow this guide. You end-up with a \*Assertions class which contains one or more static methods called *assertThat*. This is the equivalent to the AssertJ [Assertions](http://joel-costigliola.github.io/assertj/core-8/api/org/assertj/core/api/Assertions.html) class. In order to use it with *tapir*, proceed with the chapter [Generating waiting assertions from AssertJ Assertions class](#generating-waiting-assertions-from-assertj-assertions-class).

### Generating waiting assertions from AssertJ Assertions class
*tapir* provides a generator which transforms an AssertJ Assertions class containing static assertThat-methods into assertThat methods which expect a lambda expression and provide the functionality to wait for the assertion to pass.

You just have to create a class and annotate it with [@AssertJAssertionsWrapper](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/assertion/annotation/AssertJAssertionsWrapper.html). You have to define the class to be wrapped by using the annotation's *value* attribute.

In our example we would like to provide assertion for *java.io.File*. As this is already provided by *org.assertj.core.api.Assertions*, we do not have to implement this by ourselves.

With *includes* and *excludes* you select/deselect the assertThat-method by the type of their first parameter. So for our File assertion this is all we need to do.

``` xtend
import de.bmiag.tapir.assertion.annotation.AssertJAssertionsWrapper
import java.io.File
import org.assertj.core.api.Assertions

@AssertJAssertionsWrapper(value=Assertions, includes=#[File])
class MyAssertions {

}
```

In order to use *MyAssertions* in our test code we can inject it as an extension:
``` xtend
@TestClass
@UseExtension(MyAssertions)
class MyTest {
    @Step
    def step() {
        val file = new File(<somePath>)
        assertThat[file].hasExtension("xtend")
    }
}
```
