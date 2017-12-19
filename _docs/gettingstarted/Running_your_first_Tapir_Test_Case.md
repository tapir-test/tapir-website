---
title: Running your first tapir Test Case
permalink: /docs/gettingstarted/firsttapirtestcase/
---

# Setting up the Test Module

The easiest way to get started with <i>tapir</i> is to use the corresponding
Maven Archtetype. You can do this from the command-line or the Eclipse
IDE:

## Commandline

``` text
mvn archetype:generate -DarchetypeGroupId=de.bmiag.tapir -DarchetypeArtifactId=tapir-bootstrap-archetype -DarchetypeVersion=2.0.0
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

## Eclipse

Eclipse provides a project wizard to create Maven projects:

-   Select *File* \| <i>New</i> \| <i>Other...</i> \| <i>Maven</i> \| <i>Maven Project</i> and click
    <i>Next</i>
-   Proceed to the location selection by clicking *Next* again
-   Select the Archtype with GroupId *de.bmiag.tapir* and ArtifactId
    *tapir-test-archetype*, click *Next*
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
    <h3 class="panel-title"><span class="fa fa-info-circle"></span> Hint</h3>
  </div>
  <div class="panel-body">
  For additional information on archetypes, consult the <a href="{{ "/docs/usingtapir/archetypes/" | prepend: site.baseurl }}">dedicated
  chapter</a>.
  </div>
</div>

# Running your First Test

A very simple test case is included in the generated test module. The
test class is called GoogleTest and contains three test steps:

1.  Visit google.com
2.  Assert that the browser title contains Google
3.  Assert that the value which is typed into the query field persists  

<div class="panel panel-warning">
  <div class="panel-heading">
    <h3 class="panel-title"><span class="fa fa-warning"></span> Warning</h3>
  </div>
  <div class="panel-body">
  The tests are executed by using the headless
  browser <a href="http://htmlunit.sourceforge.net/">HtmlUnit</a>. Therefore you
  won't see any browser interaction while running the test. If you have a
  Firefox browser in place and want to use it, you could modify
  the <i>test.properties</i> located in <i>src/test/resources</i> by switching the
  browser property from <i>htmlunit</i> to<i>firefox</i>. For more information on
  how to switch the browser take a look at the <a href="{{ "/docs/selenium/webbrowsermodule/" | prepend: site.baseurl }}">web browser chapter</a>.
  </div>
</div>



## Commandline

Switch to the newly created directory and type:

``` text
mvn clean integration-test site jetty:run
```

This command builds the module, runs the <i>tapir</i> tests, creates a report
and fires up a Jetty servlet container served at port 8080 in order to
visualize the test results.

Open <http://localhost:8080> in your browser to see the test results.

## Eclipse

In the newly created project you can find launch files in the launch
subfolder. Just right-click the $\{artifactId\}-eclipse.launch file
and select Run as in order to run your first test. The test results are
available in Eclipse's JUnit View.

Alternatively you can run the Maven launch
file $\{artifactId\}-maven.launch. The launch configuration builds the
module, runs the <i>tapir</i> tests, creates a report and fires up a Jetty
servlet container served at port 8080 in order to visualize the test
results.

Open [http://localhost:8080](http://localhost:8080/) in your browser to
see the test results.

# Summary

This chapter demonstrated how easy and fast it is to set up a <i>tapir</i> test
module. In the next chapter we focus on the concepts and explain them
more detailed.
