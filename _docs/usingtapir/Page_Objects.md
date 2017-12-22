---
title: Page Objects
description: Page Objects encapsulate implementation details of the Application under Test and just expose a business API to the test code.
permalink: /docs/usingtapir/page-objects/
---

<div class="panel panel-default">
    <div class="panel-body">
    <i>"If you have WebDriver APIs in your test methods, You're Doing
    It Wrong."</i>
    <br/><br/>
    Simon Stewart, creator of Selenium WebDriver
    </div>
</div>

You have to take it seriously if the creator on an API gives you such a
serious suggestion on how to use his API. <i>tapir</i> highly encourages you to
use Page Objects by making the creation and usage as easy as possible.

Page Objects encapsulate implementation details of the SUT and just
provide a business API for the test classes. The test classes just
interact with the page objects and the implementation details are
shadowed. This approach is very robust against functional and technical
changes in the SUT as you always have only a single point to adjust. The
test cases can focus on the behaviour of the application and do not have
to deal with technical issues.

![]({{"/img/docs/45219869/45220094.png" | prepend: site.baseurl}}){:height="192px" width="600px"}

<div class="panel panel-info">
  <div class="panel-heading">
    <h3 class="panel-title"><span class="fa fa-info-circle"></span> Hint</h3>
  </div>
  <div class="panel-body">
  There is a lot of information about Page Objects around the web. One of
  the most fundamental abstracts is written by <a href="https://martinfowler.com/bliki/PageObject.html">Martin
  Fowler]</a>.
  </div>
</div>

In <i>tapir</i>'s Selenium integration you need these dependencies:

``` xml
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-page</artifactId>
</dependency>
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-selenium</artifactId>
</dependency>
```

A Page Object for the Google website looks like this:

``` xtend
@Page
class GooglePage {
    @SeleniumElement(name="q")
    TextField queryField

    @SeleniumElement(name="btnG")
    Button searchButton
}
```

You just have to provide some fundamental information without any
boilerplate or glue
code. [@Page](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/page/annotation/Page.html)
declares the class as a page object. There is a
[TextField](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/htmlbasic/api/TextField.html) called
*queryField* and a
[Button](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/htmlbasic/api/Button.html) called
*searchButton* on the
page. [@SeleniumElement](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/selenium/annotation/SeleniumElement.html)
tells <i>tapir</i> to use its Selenium implementation. The provided name
attributes *"g"* and *"btnG"* finally bind the *TextField* and the
*Button* to their HTML counterparts.

You can use the page object in your test class like described in the
example below. You can just inject the page as a field by using Spring's
*@Autowired* annotation.

``` xtend
@TestClass
class GoogleTest {

    @Autowired
    GooglePage googlePage

    @Step
    def void searchForTapir() {
        googlePage.queryField.text ="tapir"
        googlePage.searchButton.click
    }
}
```

<div class="panel panel-info">
  <div class="panel-heading">
    <h3 class="panel-title"><span class="fa fa-info-circle"></span> Hint</h3>
  </div>
  <div class="panel-body">
  Please notice the syntactic sugar Xtend provides. For more information
  why <i>tapir</i> chooses Xtend over plain Java, consult the chapter <a href="{{"/docs/usingtapir/xtend/" | prepend: site.baseurl}}">Why does
  tapir use Xtend?</a>.
  </div>
</div>

<div class="panel panel-info">
  <div class="panel-heading">
    <h3 class="panel-title"><i class="fa fa-external-link" aria-hidden="true"></i> Showcase</h3>
  </div>
  <div class="panel-body">
  <ul>
    <li>
        <a href="https://github.com/tapir-test/tapir-showcase/blob/master/google/google-pages/src/main/java/de/bmiag/tapir/showcase/google/pages/page/GooglePage.xtend">GooglePage</a>
    </li>
    <li>
        <a href="https://github.com/tapir-test/tapir-showcase/blob/master/wikipedia/src/main/java/de/bmiag/tapir/showcase/wikipedia/page/WikipediaMainPage.xtend">WikipediaMainPage</a>
    </li>
    <li>
        <a href="https://github.com/tapir-test/tapir-showcase/blob/master/wikipedia/src/main/java/de/bmiag/tapir/showcase/wikipedia/page/WikipediaContentPage.xtend">WikipediaContentPage</a>
    </li>
  </ul>
  </div>
</div>


##  Assert that a Page is Active

Optionally, pages can implement
[PageActiveAssertion](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/page/annotation/PageActiveAssertion.html).
If so you have to implement *assertPageActive( )*. The page checks by
itself if it's active, e.g. by checking for a specific element or a
headline text. If the page is not active, you have to throw an
*AssertionError*.

<div class="panel panel-info">
  <div class="panel-heading">
    <h3 class="panel-title"><i class="fa fa-external-link" aria-hidden="true"></i> Showcase</h3>
  </div>
  <div class="panel-body">
  <ul>
      <li>
          <a href="https://github.com/tapir-test/tapir-showcase/blob/master/google/google-pages/src/main/java/de/bmiag/tapir/showcase/google/pages/page/GooglePage.xtend">GooglePage</a>
      </li>
    <li>
        <a href="https://github.com/tapir-test/tapir-showcase/blob/master/wikipedia/src/main/java/de/bmiag/tapir/showcase/wikipedia/page/WikipediaMainPage.xtend">WikipediaMainPage</a>
    </li>
  </ul>
  </div>
</div>

## Explicit check

### Check using PageActiveAssertionExtensions

Test classes can check, if a page is active by using
the [PageActiveAssertionExtensions](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/page/extensions/PageActiveAssertionExtensions.html)as
an extension.

``` xtend
@UseExtension(PageActiveAssertionExtensions)
class GoogleTest {

    @Autowired
    GooglePage googlePage

    @Step
    def void assertGooglePageActive() {
        assertThat(googlePage.pageActive)
    }
}
```

### Check by calling assertPageActive()

Alternatively you can explicitly call the *assertPageActive( )* method:

``` xtend
 @Step
    def void assertGooglePageActive() {
        googlePage.assertPageActive
    }
```

### Check by declaring *@AssertPostPage*

Using
the [*@*AssertPostPage](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/page/annotation/AssertPostPage.html)
annotation you can ensure that the given page is active after the step
is completed:

``` xtend
 @Step
    @AssertPostPage(GooglePage)
    def void assertGooglePageActive() {
    }
```

<div class="panel panel-info">
  <div class="panel-heading">
    <h3 class="panel-title"><i class="fa fa-external-link" aria-hidden="true"></i> Showcase</h3>
  </div>
  <div class="panel-body">
  <ul>
    <li>
        <a href="https://github.com/tapir-test/tapir-showcase/blob/master/wikipedia/src/test/java/de/bmiag/tapir/showcase/wikipedia/test/WikipediaSmokeTest.xtend#L21">WikipediaSmokeTest.openWebsite()</a>
    </li>
  </ul>
  </div>
</div>

## Implicit check

Explicitly checking for a page to be active is not needed mostly,
because <i>tapir</i> does this check for you whenever you interact with the
page (e.g. click a button or set a value into an input field). Before
<i>tapir</i> interacts with an element on a page, it calls the page's
*assertPageActive( )* method and only proceeds if no AssertionError is
thrown.

## Page Component

In order to facilitate modularity you can specify Page components
(annotated by
[@PageComponent](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/page/annotation/PageComponent.html)) which
are reusable parts of your pages. Several pages can reference or include
the same page component. Page components do not "know" where they are
embedded, in other words, they are contextless and can not implement
*PageActiveAssertion*.

Comparison of a page and a page component:

<table style="width: 75%">
  <colgroup>
    <col style="width: 33%" />
    <col style="width: 33%" />
    <col style="width: 33%" />
  </colgroup>

  <tr class="header">
    <th></th>
    <th style="text-align: center;">Page</th>
    <th style="text-align: center;">Page Component</th>
  </tr>

  <tr>
    <td>Nestable</td>
    <td style="text-align: center;"><div class="fa fa-check"/></td>
    <td style="text-align: center;"><div class="fa fa-check"/></td>
  </tr>

  <tr>
    <td>Standalone</td>
    <td style="text-align: center;"><div class="fa fa-check"/></td>
    <td style="text-align: center;"><div class="fa fa-times"/></td>
  </tr>

  <tr>
    <td>PageActiveAssertion</td>
    <td style="text-align: center;"><div class="fa fa-check"/></td>
    <td style="text-align: center;"><div class="fa fa-times"/></td>
  </tr>
</table>

<div class="panel panel-info">
  <div class="panel-heading">
    <h3 class="panel-title"><i class="fa fa-external-link" aria-hidden="true"></i> Showcase</h3>
  </div>
  <div class="panel-body">
  <ul>
    <li>
        <a href="https://github.com/tapir-test/tapir-showcase/blob/master/wikipedia/src/main/java/de/bmiag/tapir/showcase/wikipedia/page/WikipediaHeader.xtend">WikipediaHeader</a>
    </li>
  </ul>
  </div>
</div>

## Nested Pages

Pages and Page components can be nested by using the *@Include*
and *@Reference* annotations.

## @Reference

[@Reference](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/core/annotation/reference/Reference.html)
just generates a getter for the referenced Page (component).

``` xtend
@Page
class Page1 {
    @Reference
    PageComponent1 pageComponent1
}
```

<div class="panel panel-info">
  <div class="panel-heading">
    <h3 class="panel-title"><i class="fa fa-external-link" aria-hidden="true"></i> Showcase</h3>
  </div>
  <div class="panel-body">
  <ul>
    <li>
        <a href="https://github.com/tapir-test/tapir-showcase/blob/master/wikipedia/src/main/java/de/bmiag/tapir/showcase/wikipedia/page/WikipediaMainPage.xtend#L13">WikipediaMainPage.header</a>
    </li>
  </ul>
  </div>
</div>

## @Include

In contrast
to *@Reference,* [@Include](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/core/annotation/include/Include.html)
generates delegate methods for all public members of the annotated
field. Include solves the problem of multiple inheritance as it is
possible to include multiple pages / page components.

``` xtend
@Page
class Page1 {
    @Include
    PageComponent1 pageComponent1
}
```
