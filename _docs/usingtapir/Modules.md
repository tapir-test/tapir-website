---
title: Modules
permalink: /docs/usingtapir/modules/
---

Tapir distinguishes between Inclusion modules and Bootstrap modules. In
contrast to Inclusion modules, Bootstrap modules are executable and
there can only be one Bootstrap module in your execution classpath.

# Spring Boot

Tapir relies on [Spring Boot](https://projects.spring.io/spring-boot/)
and its
[auto-configuration](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#using-boot-auto-configuration)
capabilities. Tapir attempts to automatically configure your Test
execution based on the jar dependencies that you have added. The
AutoConfiguration just collects all available configurations at runtime
and weaves them together. The main entry point in Tapir's context is the
class which is annotated by @BootstrapConfiguration.

If you are not familiar with Spring so far, consult the chapter [How
does it work?](45219845.html).

Take care of the
[@AutoConfigureOrder](http://docs.spring.io/spring-boot/docs/current/api/org/springframework/boot/autoconfigure/AutoConfigureOrder.html)
annotation. It declares the precedence of the configuration processing.
Beans defined in configurations with a higher order value override beans
of lower-ordered configurations. For more information on overriding
beans, consult the chapter [Custom
Implementation](Custom_Implementation).

# Bootstrap Module

A Bootstrap module has to contain a class which is annotated
by [@BootstrapConfiguration](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/bootstrap/annotation/BootstrapConfiguration.html)*.*
This class is the main entry point for the configuration of your test
execution environment. You do not have to add anything in this class,
unless you would like to customize or extend Tapir. These possibilities
are convered in the chapter [Customiziation](Customiziation).

Beside a Bootstrap Configuration you need a class annotated
by [@TestClass](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/annotations/testclass/TestClass.html)
which contains at least one method which is annotated
by [@Step](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/annotations/step/Step.html).
So the most simple setup to run a Tapir test looks like this:

``` java
import de.bmiag.tapir.bootstrap.annotation.BootstrapConfiguration
 
@BootstrapConfiguration
class MyConfiguration {
}
```

Showcase

The showcase bootstrap configuration is
[de.bmiag.tapir.showcase.TestConfiguration](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/showcase/TestConfiguration.html).

``` java
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
archetype](Archetypes_47218729.html#Archetypes-tapir-bootstrap-archetype).

 

# Inclusion Module

These modules cannot be executed, but provide some functionality which
might (directly or transitively) be used by a Bootstrap module. Like
Bootstrap modules, Inclusion modules have a main configuration class as
well which is annotated
by [@ModuleConfiguration](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/bootstrap/annotation/ModuleConfiguration.html).
You don't need to have any further configuration as
*BootstrapConfiguration* and *ModuleConfiguration* are aware of Spring's
component-scan capabilities.

The easiest way to create an inclusion module is the [corresponding
archetype](Archetypes_47218729.html#Archetypes-tapir-module-archetype).
