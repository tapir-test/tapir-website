---
title: Page Objects
permalink: /docs/usingtapir/pageobjects/
---

*"If you have WebDriver APIs in your test methods, You're Doing
It Wrong."*

Simon Stewart, creator of Selenium WebDriver

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

![](img/docs/45219869/45220094.png){width="600"}

There is a lot of information about Page Objects around the web. One of
the most fundamental abstracts is written by [Martin
Fowler](https://martinfowler.com/bliki/PageObject.html).

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

``` java
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
code. [@Page](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/page/annotation/Page.html)
declares the class as a page object. There is a
[TextField](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/htmlbasic/api/TextField.html)called
*queryField* and a
[Button](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/htmlbasic/api/Button.html)called
*searchButton* on the
page. [@SeleniumElement](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/selenium/annotation/SeleniumElement.html)
tells <i>tapir</i> to use its Selenium implementation. The provided name
attributes *"g"* and *"btnG"* finally bind the *TextField* and the
*Button* to their HTML counterparts.

You can use the page object in your test class like described in the
example below. You can just inject the page as a field by using Spring's
*@Autowired* annotation.

``` java
@TestClass
class GoogleTest {

    @Autowired
    GooglePage googlePage

    @Step
    def void searchForTapir() {
        googlePage.queryField.text ="Tapir"
        googlePage.searchButton.click
    }
}
```

Please notice the syntactic sugar Xtend provides. For more information
why <i>tapir</i> chooses Xtend over plain Java, consult the chapter [Why does
Tapir use Xtend?](45219887.html).

Showcase

There are two pages in the show case:

-   [de.bmiag.tapir.showcase.page.WikipediaContentPage](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/showcase/page/WikipediaContentPage.html)
-   [de.bmiag.tapir.showcase.page.WikipediaMainPage](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/showcase/page/WikipediaMainPage.html)

#  Assert that a Page is Active

Optionally, pages can implement
[PageActiveAssertion](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/page/annotation/PageActiveAssertion.html).
If so you have to implement *assertPageActive( )*. The page checks by
itself if it's active, e.g. by checking for a specific element or a
headline text. If the page is not active, you have to throw an
*AssertionError*.

Showcase

In the showcase
[de.bmiag.tapir.showcase.page.WikipediaMainPage](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/showcase/page/WikipediaMainPage.html)
implements *PageActiveAssertion*.

## Explicit check

### Check using PageActiveAssertionExtensions

Test classes can check, if a page is active by using
the [PageActiveAssertionExtensions](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/page/extensions/PageActiveAssertionExtensions.html)as
an extension.

``` java
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

``` java
 @Step
    def void assertGooglePageActive() {
        googlePage.assertPageActive
    }
```

### Check by declaring *@AssertPostPage*

Using
the [*@*AssertPostPage](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/page/annotation/AssertPostPage.html)
annotation you can ensure that the given page is active after the step
is completed:

``` java
 @Step
    @AssertPostPage(GooglePage)
    def void assertGooglePageActive() {
    }
```

Showcase

Used by *de.bmiag.tapir.showcase.test.WikipediaSmokeTest.openWebsite()*

## Implicit check

Explicitly checking for a page to be active is not needed mostly,
because <i>tapir</i> does this check for you whenever you interact with the
page (e.g. click a button or set a value into an input field). Before
<i>tapir</i> interacts with an element on a page, it calls the page's
*assertPageActive( )* method and only proceeds if no AssertionError is
thrown.

# Page Component

In order to facilitate modularity you can specify Page components
(annotated by
[@PageComponent](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/page/annotation/PageComponent.html)) which
are reusable parts of your pages. Several pages can reference or include
the same page component. Page components do not "know" where they are
embedded, in other words, they are contextless and can not implement
*PageActiveAssertion*.

Comparison of a page and a page component:

|                     |                                  Page                                 |                              Page component                             |
|:--------------------|:---------------------------------------------------------------------:|:-----------------------------------------------------------------------:|
| Nestable            | ![(tick)](images/icons/emoticons/check.png){.emoticon .emoticon-tick} |  ![(tick)](images/icons/emoticons/check.png){.emoticon .emoticon-tick}  |
| Standalone          | ![(tick)](images/icons/emoticons/check.png){.emoticon .emoticon-tick} | ![(error)](images/icons/emoticons/error.png){.emoticon .emoticon-cross} |
| PageActiveAssertion | ![(tick)](images/icons/emoticons/check.png){.emoticon .emoticon-tick} | ![(error)](images/icons/emoticons/error.png){.emoticon .emoticon-cross} |

Showcase

In the showcase the
[de.bmiag.tapir.showcase.page.WikipediaHeader](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/showcase/page/WikipediaHeader.html)
is declared as *PageComponent*.

# Nested Pages

Pages and Page components can be nested by using the *@Include*
and *@Reference* annotations.

## @Reference

[@Reference](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/core/annotation/reference/Reference.html)
just generates a getter for the referenced Page (component).

``` java
@Page
class Page1 {
    @Reference
    PageComponent1 pageComponent1
}
```

Showcase

Used by de.bmiag.tapir.showcase.page.WikipediaMainPage.header

## @Include

In contrast
to *@Reference,* [@Include](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/core/annotation/include/Include.html)
generates delegate methods for all public members of the annotated
field. Include solves the problem of multiple inheritance as it is
possible to include multiple pages / page components.

``` java
@Page
class Page1 {
    @Include
    PageComponent1 pageComponent1
}
```

## Attachments:

![](images/icons/bullet_blue.gif){width="8" height="8"}
[TapirPageObject.png](img/docs/45219869/45220094.png) (image/png)  
