---
title: How does it work?
permalink: /docs/usingtapir/howdoesitwork/
---

Tapir's architecture is fundamentaly based on the [Spring
Framework](https://projects.spring.io/spring-framework/), more precisely
on [Spring Boot](https://projects.spring.io/spring-boot/). You do not
need to be a Spring expert in order to use Tapir, but a basic
understanding of the main concepts helps you while exploring Tapir. It
does not make sense to read the whole Spring (Boot) reference as Spring
is a General Purpose Framework with a lot of features. Tapir only uses a
small subset of this. Therefore we introduce the main concepts in this
chapter and refer to the Spring reference selectively.

# Bootstrapping

Spring manages all instances of classes (so called beans) in a
container. So to fire up a Spring based application you have to build
the Spring Container first. This job is done by the
[TapirBootstrapper](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/bootstrap/TapirBootstrapper.html).
It searches for a module in the classpath which contains
a [@BootstrapConfiguration](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/bootstrap/annotation/BootstrapConfiguration.html)
annotated class.

Exactly one *@BootstrapConfiguration* annotated class has to be in the
classpath, otherwise Tapir does not know how to build the Spring
Container and exits with an error message.

Beside the Bootstrap modules all inclusion modules are picked up by
searching
for [@ModuleConfiguration](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/bootstrap/annotation/ModuleConfiguration.html)
annotated classes. All of these configurations provide so-called beans
which are just instances of certain classes. These beans can be defined
by adding
a [@Bean](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/context/annotation/Bean.html)
annotated method in the configuration class or by placing a
[@Component](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/stereotype/Component.html)
annotated class in a (sub-) package of the configuration class.

This is a very simplified view. If you would like to understand Spring's
container configuration more detailed, please consult the [Spring
reference](http://docs.spring.io/spring/docs/current/spring-framework-reference/htmlsingle/#beans-java).


![](img/docs/45219845/45219848.png){width="600"}

After picking up the configurations and their beans the Spring Container
is built. Nearly all instances used in Tapir are managed by Spring.
Therefore it is possible to access these instances in any class. 

# Building your Execution Plan

The test execution runs completely within the Spring container and
therefore all involved instances are managed by Spring.

The picture looks similar to the one above, but has a completely
different purpose. The
[TapirExecutor](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/TapirExecutor.html)picks
up all
the [@TestSuite](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/annotations/suite/TestSuite.html)and
[@TestClass](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/annotations/testclass/TestClass.html)
annotated classes which are provided by the picked up configurations. In
other words, TestSuites and TestClasses are Spring beans and the
*TapirExecuter* collects all Spring beans which are annotated
by *@TestSuite* or *@TestClass*. Test suites help you structuring your
test classes. You can also nest your test suites infinitely.

 

![](img/docs/45219845/45219857.png){width="600"}

The test suites and classes are transformed to an execution plan which
is executed afterwards.

It's possible to influence the execution plan creation by using some
Tapir extensions, but this is subject of later chapters.

# Running your Execution Plan

The execution of the execution plan is delegated to the
[ExecutionPlanExecutor](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/executor/ExecutionPlanExecutor.html).
The Executio*nPlanExecuter* traverses the execution plan and executes
the test classes and their steps. If a test class fails, the whole test
class/suite is skipped unless you annotate it
with [@ProceedOnFailure](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/annotations/behaviour/ProceedOnFailure.html).

The executor notifies registered execution listeners about every event
(suite/class/step started/succeeded/failed/skipped). These execution
listeners can use this information, e.g. for building reports.

![](img/docs/45219845/45219863.png){width="600"}

There are a couple of additional annotations which influence the
execution, but this is subject of later chapters, too.

# Dependency Injection

Tapir heavily uses Dependency Injection. Nearly all instances are
managed by Spring. Therefore it's possible to inject any bean in any
other bean by using
the [@Autowired](http://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/beans/factory/annotation/Autowired.html)
annotation. As Tapir just leverages the features Spring provides, it's
most reasonable to read the corresponding [Spring
documentation](http://docs.spring.io/spring/docs/current/spring-framework-reference/htmlsingle/#beans-dependencies).

# Tapir modules

Tapir is shipped with a couple of modules. These modules can be
distinguishes into core, ui and extension modules. The core modules
driveTapir's fundamental concepts like annotation processing, using
immutables or building and executing an execution plan. The ui modules
provide some basic technology agnostic API and concrete implemtations
like Selenium.

Extensions are completely independent of any other extension. They use
the API provided by the core modules (mostly the execution module) to
hook in. On the one hand, there are extensions which extend the features
while writing tests like Conditional, Configuration and Variant, on the
other hand there are extensions which are just used at runtime like
Allure or CLI.

![](img/docs/45219845/52527108.png){width="600"}

While developing the page objects you just need the Page module and an
API modules which provides interfaces for the UI elements on your page.
The test classes and their steps can use these pages to declare tests.
If approriate, additional extensions like Conditional can be used.

When it comes to the execution of test suits and classes additional
extensions step in. The test execution decides which browser should be
used to execute the tests and which reports (Allure, JUnit,...) should
be generated. Of yourse the test execution is also aware of the
extensions which have been used by the test classes and interprets them.

![](img/docs/45219845/52527110.png){width="600"}

## Attachments:

![](images/icons/bullet_blue.gif){width="8" height="8"}
[Tapir-Bootstrapping.png](img/docs/45219845/45219856.png)
(image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[Tapir-Bootstrapping.png](img/docs/45219845/45219848.png)
(image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[TapirExecutor.png](img/docs/45219845/45219864.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2017-5-29
8:41:53.png](img/docs/45219845/45219859.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[TapirExecution.png](img/docs/45219845/45219863.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[TapirExecutor.png](img/docs/45219845/45219857.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[Tapir-Module.png](img/docs/45219845/52527108.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[Tapir-Entwicklung-Ausführung.png](img/docs/45219845/52527109.png)
(image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[Tapir-Development-Execution.png](img/docs/45219845/52527110.png)
(image/png)  
