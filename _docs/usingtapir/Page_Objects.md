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
    <div class="panel-title"><span class="fas fa-info-circle"></span> Hint</div>
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
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-html-basic-api</artifactId>
</dependency>
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-html-basic-impl</artifactId>
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
    <div class="panel-title"><span class="fas fa-info-circle"></span> Hint</div>
  </div>
  <div class="panel-body">
  Please notice the syntactic sugar Xtend provides. For more information
  why <i>tapir</i> chooses Xtend over plain Java, consult the chapter <a href="{{"/docs/usingtapir/xtend/" | prepend: site.baseurl}}">Why does
  tapir use Xtend?</a>.
  </div>
</div>

<div class="panel panel-info">
  <div class="panel-heading">
    <div class="panel-title"><i class="fa fa-external-link" aria-hidden="true"></i> Showcase</div>
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


##  Check that a Page is active

Optionally, pages can implement
[PageActiveCheck](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/page/annotation/PageActiveCheck.html).
If so you have to implement *isPageActive( )*. The page checks by
itself if it's active, e.g. by checking for a specific element or a
headline text. If the page is active, the method returns true, otherwise false.

<div class="panel panel-info">
  <div class="panel-heading">
    <div class="panel-title"><i class="fa fa-external-link" aria-hidden="true"></i> Showcase</div>
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
### Explicit assertions

#### Assertions using PageActiveCheckExtensions

Test classes can assert that a page is active or inactive by using
the [PageActiveCheckExtensions](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/page/extensions/PageActiveCheckExtensions.html) as an extension.

``` xtend
@UseExtension(PageActiveCheckExtensions)
class GoogleTest {

    @Autowired
    GooglePage googlePage

    @Step
    def void assertGooglePageActive() {
        googlePage.assertPageActive
    }
}
```

#### Assertions by declaring *@AssertPostPage*

Using
the [*@*AssertPostPage](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/pageexecution/annotation/AssertPostPage.html)
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
    <div class="panel-title"><i class="fa fa-external-link" aria-hidden="true"></i> Showcase</div>
  </div>
  <div class="panel-body">
  <ul>
    <li>
        <a href="https://github.com/tapir-test/tapir-showcase/blob/master/wikipedia/src/test/java/de/bmiag/tapir/showcase/wikipedia/test/WikipediaSmokeTest.xtend#L21">WikipediaSmokeTest.openWebsite()</a>
    </li>
  </ul>
  </div>
</div>

### Implicit assertions

Explicitly checking for a page to be active is not needed mostly,
because <i>tapir</i> does this check for you whenever you interact with the element of your
page (e.g. click a button or set a value into an input field). Before
<i>tapir</i> interacts with an element on a page, it asserts that the expected page is active.

## Private page fields

The fields of page objects are usually generated with a getter method to access them.
However, sometimes it is useful to have pure *private* visible page object fields.
This is especially useful if you need some elements inside your page active check method but don't want them accessible from the outside.
You can use the [@Private](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/page/annotation/Private.html) annotation to make sure that no *public* getter is generated.

``` xtend
@Page
class MyPage {

    @Private
    @SeleniumElement(name="message")
    Label message

    ...

}
```

Now the field *message* can only be accessed from inside *MyPage*.

## Page Component

In order to facilitate modularity you can specify Page components
(annotated by
[@PageComponent](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/page/annotation/PageComponent.html)) which
are reusable parts of your pages. Several pages can reference or include
the same page component. Page components do not "know" where they are
embedded, in other words, they are contextless and can not implement
*PageActiveCheck*.

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
    <td>PageActiveCheck</td>
    <td style="text-align: center;"><div class="fa fa-check"/></td>
    <td style="text-align: center;"><div class="fa fa-times"/></td>
  </tr>
</table>

<div class="panel panel-info">
  <div class="panel-heading">
    <div class="panel-title"><i class="fa fa-external-link" aria-hidden="true"></i> Showcase</div>
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

### @Reference

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
    <div class="panel-title"><i class="fa fa-external-link" aria-hidden="true"></i> Showcase</div>
  </div>
  <div class="panel-body">
  <ul>
    <li>
        <a href="https://github.com/tapir-test/tapir-showcase/blob/master/wikipedia/src/main/java/de/bmiag/tapir/showcase/wikipedia/page/WikipediaMainPage.xtend#L13">WikipediaMainPage.header</a>
    </li>
  </ul>
  </div>
</div>

### @Include

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
##  Tables

Tables are special components, as they are very heterogeneous throughout different applications. Fortunately *tapir* provides a base implementation which allows you already to work with most default tables. The main difference between tables and the other basic HTML elements is that tables are typed with a generic - the row type.

 ``` xtend
 @SeleniumElement(xpath="//table")
 Table<ProductTableRow> products
```

For technical reasons, the row type has to be an interface for which you can define multiple (but at least one) implementation.

 ``` xtend
 interface ProductTableRow extends TableRow {

   def Label getProductID()

   def Label getName()

}
 ```

In most cases you should let your implementation of the row extend the base class
[DefaultSeleniumTableRow](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/htmlbasic/impl/DefaultSeleniumTableRow.html). This class provides a helpful method to define the columns of a single row: *getTapirElementFromColumn*. If your table row consists of columns, each containing only a single HTML component, you just have to specify the column number and the type of the component.

 ``` xtend
@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
class ProductTableRowImpl extends DefaultSeleniumTableRow implements ProductTableRow {

  override getProductID() {
    getTapirElementFromColumn(0, Label)
  }

  override getName() {
    getTapirElementFromColumn(1, Label)
  }

}
 ```

 Note that your row implementation has to have the prototype scope, as the row implementation is created for each row of your table. For simple tables you are already finished. But let us assume that your column is a little bit more complex and contains two buttons. In this case you have to query the web element of the row directly and have to use the [SeleniumElementFactory](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/selenium/element/SeleniumElementFactory.html) to create instances of the components.

 ``` xtend
 @Autowired
 SeleniumElementFactory seleniumElementFactory

 override getEdit() {
   val element = webElement.findElement(By.linkText('Edit'))
   seleniumElementFactory.getSeleniumElement(element, Button)
 }

 override getDelete() {
   val element = webElement.findElement(By.linkText('Delete'))
   seleniumElementFactory.getSeleniumElement(element, Button)
 }
  ```

  <div class="panel panel-info">
    <div class="panel-heading">
      <div class="panel-title"><span class="fas fa-info-circle"></span> Hint</div>
    </div>
    <div class="panel-body">
    The <i>SeleniumElementFactory</i> provides multiple methods to create components. Some of them work with instances of
    <a href="https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/selenium/element/WebElementProvider.html">WebElementProvider</a>. Together with <a href="https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/selenium/element/WebElementQuery.html">WebElementQuery</a>, you can define the query rather than just querying the web element yourself. This allows <i>tapir</i> to query the web elements in certain situations again and ensures in return a more stable test execution.
    </div>
  </div>
