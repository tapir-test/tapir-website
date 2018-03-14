---
title: Running your first tapir Test Case
description: How do I start with tapir and create and run my first test case?
permalink: /docs/gettingstarted/first-tapir-test-case/
---

## Setting up the Test Module

The easiest way to get started with <i>tapir</i> is to use the corresponding
Maven Archetype. You can do this from the command-line or the Eclipse
IDE:

### Commandline

``` text
mvn archetype:generate -DarchetypeGroupId=de.bmiag.tapir -DarchetypeArtifactId=tapir-bootstrap-archetype -DarchetypeVersion={{site.latesttapirversion}}}
```

Maven will ask you for the following properties:

-   groupId: The GroupId of your test project
-   artifactId: The ArtifactId of your test project
-   version: The version of your test project
-   package: The base package of your test project
-   moduleName: The name of your test project. The name should start
    with an upper case letter and shouldn't contain spaces.

After confirming the properties the new Maven module is generated into a
subfolder which is named like your artifactId.

### Eclipse

Eclipse provides a project wizard to create Maven projects:

-   Select *File* \| <i>New</i> \| <i>Other...</i> \| <i>Maven</i> \| <i>Maven Project</i> and click
    <i>Next</i>
-   Proceed to the location selection by clicking *Next >* again
-   Select *Add Archetype...* and enter these coordinates:
    -   Archetype Group Id: *de.bmiag.tapir*
    -   Archetype Artifact Id: *tapir-bootstrap-archetype*
    -   Archetype Version: *{{ site.latesttapirversion }}*
-   Click *OK*
-   Ensure that the archetype is selected and click *Next >*
-   Eclipse asks you to specify the following properties:
    -   groupId: The GroupId of your test project
    -   artifactId: The ArtifactId of your test project
    -   version: The version of your test project
    -   package: The base package of your test project
    -   moduleName: The name of your test project. The name should start
        with an upper case letter and shouldn't contain spaces.
-   After clicking *Finish* the module is available in your workspace as
    an Eclipse project.

<div class="panel panel-info">
  <div class="panel-heading">
    <div class="panel-title"><span class="fas fa-info-circle"></span> Hint</div>
  </div>
  <div class="panel-body">
  For additional information on archetypes, consult the <a href="{{ "/docs/usingtapir/archetypes/" | prepend: site.baseurl }}">dedicated
  chapter</a>.
  </div>
</div>

## Writing your First Test

Our first test should test the Wikipedia website. We want to test this workflow:
1. Visit Wikipedia website
1. Type *tapir* into the search field
1. Press the search button
1. Assert that *Tapir* is contained in the title of the displayed page

First of all we have to create a Page Object. For our first test we pare down the Page Object to the minimum. It only includes elements we need for our test: The search field and the search button.

Create a new Xtend class by choosing *File* | *New* | *Xtend Class* with these properties:
-   Source folder: {yourprojectname}/src/main/java
-   Package: {yourbasepackage}.page
-   Name: WikipediaPage

This is the implementation of our first Page Object. We mark the class as a Page Object by using the *@Page* annotation. Each UI element is annotated by *@SeleniumElement*. The UI element is bound to the HTML Page by passing a locator like *id ="searchInput"*.

``` xtend
package de.bmiag.firsttapirtest.firsttapirtest.page

import de.bmiag.tapir.page.annotation.Page
import de.bmiag.tapir.htmlbasic.api.TextField
import de.bmiag.tapir.selenium.annotation.SeleniumElement
import de.bmiag.tapir.htmlbasic.api.Button

@Page
class WikipediaPage {

	@SeleniumElement(id = "searchInput")
	TextField searchField

	@SeleniumElement(id = "searchButton")
	Button searchButton
}
```

Having the Page Object in place we can create our first test class.
Create a new Xtend class by choosing *File* | *New* | *Xtend Class* with these properties:
-   Source folder: {yourprojectname}/src/test/java
-   Package: {yourbasepackage}.test
-   Name: WikipediaSearchTest

Our test class exactly reflects the workflow we described above. The test class becomes an executable specification. Every test class is annotated by *@TestClass* and has steps which are executed sequentially. The *WikipediaPage* is injected by using Spring *@Autowired* annotation.

Additonally, we use the *BrowerInteractionService* which is shipped with tapir in order to have the *openURL* and *title* method. Note that *BrowerInteractionService* is injected as an extension. This is an Xtend feature which means that you can call visible methods of the *BrowerInteractionService* directly from your test class without need of referencing the field. This syntactic sugar makes your test code much more readable.

``` xtend
package de.bmiag.firsttapirtest.firsttapirtest.test

import org.springframework.beans.factory.annotation.Autowired
import de.bmiag.tapir.selenium.service.BrowserInteractionService
import de.bmiag.tapir.execution.annotations.step.Step
import de.bmiag.tapir.execution.annotations.testclass.TestClass
import de.bmiag.firsttapirtest.firsttapirtest.page.WikipediaPage

@TestClass
class WikipediaSearchTest {

	@Autowired
	WikipediaPage wikipediaPage

	@Autowired
	extension BrowserInteractionService

	@Step
	def visitWikipediaWebsite() {
		openURL("https://en.wikipedia.org")
	}

	@Step
	def searchForTapir() {
		wikipediaPage.searchField.text = "tapir"
		wikipediaPage.searchButton.click
		assertThat(title, containsString("Tapir"))

	}
}
```

## Running your First Test

tapir offers the possibility to launch your test class directly from Eclipse or via the command-line with maven.

<div class="panel panel-warning">
  <div class="panel-heading">
    <div class="panel-title"><span class="fas fa-exclamation-circle"></span> Caution</div>
  </div>
  <div class="panel-body">
  The tests are executed by using the headless
  browser <a href="http://htmlunit.sourceforge.net/">HtmlUnit</a>. Therefore you
  won't see any browser interaction while running the test. If you are behind a proxy consult <a href="{{ "/docs/usingtapir/http-proxy/" | prepend: site.baseurl }}">this page</a> for information.

  In case you want to run your test with another browser, you could modify
  the <i>test.properties</i> located in <i>src/test/resources</i> by switching the
  browser property. For more information on how to use different browsers take a look at the <a href="{{ "/docs/selenium/browser/" | prepend: site.baseurl }}">web browser chapter</a>.
  </div>
</div>



### Commandline

Switch to the newly created directory and type:

``` text
mvn clean integration-test allure:serve
```

This command builds the module, runs the <i>tapir</i> tests, creates a report
and fires up a servlet container in order to visualize the test results in your browser.

### Eclipse

In order to run your test class from Eclipse just right-click on the test class name and select *Run As* | *JUnit Test* as the screenshots illustrates.

![]({{"/img/docs/firsttapirtest-junit.png" | prepend: site.baseurl}}){:height="500px" width="600px"}

## Summary

This chapter demonstrated how easy and fast it is to set up a <i>tapir</i> test
module. In the next chapter we focus on the concepts and explain them
more detailed.
