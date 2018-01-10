---
title: Selenium Core Module
description: The Selenium Core module acts as a bridge between tapir and Selenium. It encapsulates the Selenium WebDriver API.
permalink: /docs/selenium/core/
---

The Selenium Core module acts as a bridge between <i>tapir</i> and Selenium
without being bound to a specific browser or web framework. It
encapsulates the Selenium WebDriver API and provides some features which
simplify the communication between the test code and the browser.

## Dependency

``` xml
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-selenium</artifactId>
</dependency>
```

## HTML binding

<i>tapir</i> relies on the usage of Page objects. The binding to a specific UI
technology like Selenium is realized via annotations. The Selenium
module provides
the [@SeleniumElement](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/selenium/annotation/SeleniumElement.html)
annotation for this purpose.

Annotating a page object field
with [@SeleniumElement](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/selenium/annotation/SeleniumElement.html) instructs
<i>tapir</i> to identify the element with Selenium. The annotation offers a
couple of ways how to identify the element in the HTML DOM. The
corresponding annotation methods are inspired by
Selenium's [@FindBy](https://seleniumhq.github.io/selenium/docs/api/java/org/openqa/selenium/support/FindBy.html)
annotation. 

In the example below the query field is located by the name "q".

``` xtend
@Page
class GooglePage {
    @SeleniumElement(name="q")
    TextField queryField
}
```

## Services and Execution Listeners

The Selenium module provides a couple of Selenium-specific services.

-   [HtmlPageCaptureService](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/selenium/service/HtmlPageCaptureService.html):  Reads
    the currently displayed browser content as HTML code and provides it
    as an attachment
-   [ScreenshotService](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/selenium/service/ScreenshotService.html):
    Captures a screenshot from the currently displayed browser
    window and provides it as an attachment
-   [ImplicitWaitService](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/selenium/service/ImplicitWaitService.html):
    Executes a given code with a given [implicit wait
    time](http://www.seleniumhq.org/docs/04_webdriver_advanced.jsp)

You can use these services in your client code. Additionally <i>tapir</i>
provides some execution listeners which make use of these services:

-   [HtmlPageCaptureListener](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/selenium/listener/HtmlPageCaptureListener.html):
    Calls
    the [HtmlPageCaptureService](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/selenium/service/HtmlPageCaptureService.html) whenever
    a step fails
-   [ScreenshotListener](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/selenium/listener/ScreenshotListener.html):
    Calls the
    [ScreenshotService](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/selenium/service/ScreenshotService.html) whenever
    a step fails

For more information on execution listeners, consult the [corresponding chapter]({{"/docs/customization/executionlistener/" | prepend: site.baseurl}}).

## WebDriver Interaction

<i>tapir</i> encapsulates the interaction between the test code and the website
by using page objects. These page objects have fields of a specific
element interface type. Each field represents a component on the HTML
page.

Whenever the test code obtains a <i>tapir</i> element (e.g. a test field) by
calling the corresponding getter on the page object, a proxied element
is returned. Clients always get an instance (never *null*), whether or
not the element is displayed on the page. The WebDriver API is queried
as late as possible. Whenever you call a method which returns a
TapirElement or a list of TapirElement a proxy is returned which just
points to your query. This is done until you call a method which does
not return a TapirElement or a list of TapirElement. In this case, the
whole query stack is executed.

It's much easier to demonstrate this by example.

## Simple Example

This is our first simple page object,...

**GooglePage.xtend**

``` xtend
@Page
class GooglePage {
    @SeleniumElement(name="q")
    TextField queryField
}
```

..., our TextField,...

**TextField.java**

``` java
public interface TextField extends TapirElement, Enabable, Displayable {
    public String getText( );
    public void setText( String text );
}
```

..., and our client code (class and method body omitted):

**MyTest.xtend**

``` xtend
val queryField = googlePage.queryField // no interaction with the WebDriver API
println(queryField.text) // TextField.getText() returns a String which does not implement TapirElement, WebDriver API is queried
```

The example above prints the text of the query field. If the query field
is not displayed a NoSuchElementException is thrown in **line 2** and
not in line 1, as the WebDriver API is not queried until
it's inevitable.

## Advanced Example

In our advaced example we want to interact with the result list of a
Google query.

This is our page object:

**GooglePage.xtend**

``` xtend
@Page
class GooglePage {
    @SeleniumElement(id="res")
    SearchResultList searchResultList
}
```

The element interfaces we use in this example:

**SearchResultList.java**

``` java
public interface SearchResultList extends TapirElement, Displayable {
    public SearchResult selectSingleResult( Predicate<? super SearchResult> searchResultSelectionCriteria );
    public List<SearchResult> selectResults( Predicate<? super SearchResult> searchResultSelectionCriteria );
    public List<SearchResult> getResults( );}
```

**SearchResult.java**

``` java
public interface SearchResult extends TapirElement, Displayable {
    public Link getHeadline( );
    public String getURL( );
    public String getDescription( );
}
```

**Link.java**

``` java
public interface Link extends TapirElement, Displayable, Clickable, Enabable {
    public String getText( );
}
```


The client code:

**MyTest.xtend**

``` xtend
val searchResultList = googlePage.searchResultList// no interaction with the WebDriver API
val tapirResults = searchResultList.selectResults[headline.text.contains("tapir")] // Searches for all headlines which include "tapir", this query is NOT executed now, because the method returns a List of SearchResult which is a TapirElement subtype
val firstTapirResult = tapirResults.get(0) // Returns the first entry in tapirResults, still no interaction with the WebDriver API as a TapirElement (subtype) is returned
println("URL of first result containing 'tapir': " + firstTapirResult.URL) // Finally a getter which returns a String is called. tapir needs to consult the HTML page to obtain the needed information.
```

When *firstTapirResult.URL* is called (line 4) <i>tapir</i> executes the whole
query stack which has been recorded:

1.  Selects all the results whose headline contains "tapir"
2.  Selects the first element of the results
3.  Reads the url of this entry and returns it

It's important to understand this behaviour as you might face errors you
don't expect at a certain method call. Imagine there is no headline
which contains "tapir". *tapirResults* is an empty list and you might
expect an IndexOutOfBoundsException in line 3. But this method call
doesn't throw this exception as <i>tapir</i> just doesn't know that there are
no results, because the queries have not been called so far. Instead
the IndexOutOfBoundsException is thrown in line 4 because getURL()
returns a String and <i>tapir</i> has to execute the query stack. While
excuting this stack the *IndexOutOfBoundsException* is thrown.

You might argue that you prefer failing fast. In the next chapter we
discuss <i>tapir's</i> failure handling which is the main reason why we
interact with the WebDriver API as late as possible.

## Failure Handling

<i>tapir</i> tries to keep away technical issues from the test developer.
Therefore it tries to handle a couple of exceptions thrown by the
WebDriver internally.

Regardless of the configured implicit wait time, <i>tapir</i> executes all
method invocations against the WebDriver API with an implicit wait time
of 0 ms. Whenever
a [StaleElementReferenceException](https://seleniumhq.github.io/selenium/docs/api/java/org/openqa/selenium/StaleElementReferenceException.html),
[NoSuchElementException](https://seleniumhq.github.io/selenium/docs/api/java/org/openqa/selenium/NoSuchElementException.html)
or [InvalidTapirElementStateException](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/selenium/element/InvalidTapirElementStateException.html) is
thrown, the whole query stack is re-executed. That means that you can
relocate an element at any time. Considering the design of modern web
applications where elements are added, removed and hidden constantly
this is a huge benefit.

Test developers suffer under race conditions and hence flaky tests which
are mostly green and turn red from time to time. These exceptions occur
rarely, but they make your tests unreliable which might lead to an
attitude that "it's ok that these tests fail sometimes". While the
problem is well described in [this blog
post](http://darrellgrainger.blogspot.de/2012/06/staleelementexception.html),
the solution propagated there is a mess as it requires the test code to
handle the error situation. Because of <i>tapir's</i> built-in error handling
test developers do not have to keep struggling with error handling which
bloats their test code and makes it less comprehensible.
