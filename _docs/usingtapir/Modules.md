---
title: Modules
description: Modularization is one of tapir's core concepts. tapir distinguishes between Inclusion modules and Bootstrap modules.
permalink: /docs/usingtapir/modules/
---

<i>tapir</i> distinguishes between Inclusion modules and Bootstrap modules. In
contrast to Inclusion modules, Bootstrap modules are executable and
there can only be one Bootstrap module in your execution classpath.

## Spring Boot

<i>tapir</i> relies on [Spring Boot](https://projects.spring.io/spring-boot/)
and its
[auto-configuration](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#using-boot-auto-configuration)
capabilities. <i>tapir</i> attempts to automatically configure your Test
execution based on the jar dependencies that you have added. The
AutoConfiguration just collects all available configurations at runtime
and weaves them together. The main entry point in <i>tapir</i>'s context is the
class which is annotated by @BootstrapConfiguration.

<div class="panel panel-info">
  <div class="panel-heading">
    <h3 class="panel-title"><span class="fa fa-info-circle"></span> Hint</h3>
  </div>
  <div class="panel-body">
  If you are not familiar with Spring so far, consult the chapter <a href="{{ "/docs/usingtapir/how-does-it-work/" | prepend: site.baseurl }}">How
  does it work?</a>
  </div>
</div>

<div class="panel panel-warning">
  <div class="panel-heading">
    <h3 class="panel-title"><span class="fa fa-warning"></span> Caution</h3>
  </div>
  <div class="panel-body">
  Take care of the
  <a href="http://docs.spring.io/spring-boot/docs/current/api/org/springframework/boot/autoconfigure/AutoConfigureOrder.html">@AutoConfigureOrder</a>
  annotation. It declares the precedence of the configuration processing.
  Beans defined in configurations with a higher order value override beans
  of lower-ordered configurations. For more information on overriding
  beans, consult the chapter <a href="{{ "/docs/customization/custom-implementation/" | prepend: site.baseurl }}">Custom
  Implementation</a>.
  </div>
</div>


## Bootstrap Module

A Bootstrap module has to contain a class which is annotated
by [@BootstrapConfiguration](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/bootstrap/annotation/BootstrapConfiguration.html)*.*
This class is the main entry point for the configuration of your test
execution environment. You do not have to add anything in this class,
unless you would like to customize or extend <i>tapir</i>. These possibilities
are convered in the chapter [Customiziation]({{ "/docs/customization/executionfilter/" | prepend: site.baseurl }}).

Beside a Bootstrap Configuration you need a class annotated
by [@TestClass](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/annotations/testclass/TestClass.html)
which contains at least one method which is annotated
by [@Step](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/annotations/step/Step.html).
So the most simple setup to run a <i>tapir</i> test looks like this:

``` xtend
import de.bmiag.tapir.bootstrap.annotation.BootstrapConfiguration
 
@BootstrapConfiguration
class MyConfiguration {
}
```

<div class="panel panel-info">
  <div class="panel-heading">
    <h3 class="panel-title"><i class="fa fa-external-link" aria-hidden="true"></i> Showcase</h3>
  </div>
  <div class="panel-body">
  <ul>
    <li>
        <a href="https://github.com/tapir-test/tapir-showcase/blob/master/google/google-systemtest/src/test/java/de/bmiag/tapir/showcase/google/systemtest/GoogleSystemtestConfiguration.xtend">GoogleSystemtestConfiguration</a>
    </li>
    <li>
        <a href="https://github.com/tapir-test/tapir-showcase/blob/master/google/google-unittest/src/test/java/de/bmiag/tapir/showcase/google/unittest/GoogleUnitTestConfiguration.xtend">GoogleUnitTestConfiguration</a>
    </li>
    <li>
        <a href="https://github.com/tapir-test/tapir-showcase/blob/master/wikipedia/src/main/java/de/bmiag/tapir/showcase/wikipedia/WikipediaTestConfiguration.xtend">WikipediaTestConfiguration</a>
    </li>
  </ul>
  </div>
</div>


``` xtend
import de.bmiag.tapir.execution.annotations.step.Step
import de.bmiag.tapir.execution.annotations.testclass.TestClass
 
@TestClass
class MyTest {

    @Step
    def void step1() {
        println("step1 has been executed!")
    }
}
```

The easisiest way to create a bootstrap module is the [corresponding
archetype]({{ "/docs/usingtapir/archetypes#Archetypes-tapir-bootstrap-archetype" | prepend: site.baseurl }}).

## Inclusion Module

These modules cannot be executed, but provide some functionality which
might (directly or transitively) be used by a Bootstrap module. Like
Bootstrap modules, Inclusion modules have a main configuration class as
well which is annotated
by [@ModuleConfiguration](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/bootstrap/annotation/ModuleConfiguration.html).

<div class="panel panel-info">
  <div class="panel-heading">
    <h3 class="panel-title"><i class="fa fa-external-link" aria-hidden="true"></i> Showcase</h3>
  </div>
  <div class="panel-body">
  <ul>
    <li>
        <a href="https://github.com/tapir-test/tapir-showcase/blob/master/google/google-pages/src/main/java/de/bmiag/tapir/showcase/google/pages/GooglePagesConfiguration.xtend">GooglePagesConfiguration</a>
    </li>
  </ul>
  </div>
</div>

You don't need to have any further configuration as
*BootstrapConfiguration* and *ModuleConfiguration* are aware of Spring's
component-scan capabilities.

The easiest way to create an inclusion module is the [corresponding
archetype]({{ "/docs/usingtapir/archetypes#Archetypes-tapir-module-archetype" | prepend: site.baseurl }}).
