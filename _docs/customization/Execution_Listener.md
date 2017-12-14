---
title: Execution Listener
permalink: /docs/customization/executionlistener/
---

As you might remember (or might look up in the chapter [How does it
work?](45219845.html)), Tapir builds an execution plan based on the test
suites, cases, steps and various annotations. The execution plan is
executed by the
[ExecutionPlanExecutor](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/executor/ExecutionPlanExecutor.html)
which itself notifies the execution listeners. In this chapter we take a
more detailed look at this and show you how to hook into the execution
of the test plan. The execution listeners are part of Tapir's
*execution* module.

# Dependency

``` xml
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-execution</artifactId>
</dependency>
```

# Custom Execution Listener

In order to get notified during the test execution, you have to
implement the interface
[ExecutionListener](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/executor/ExecutionListener.html)
and make sure that Spring is aware of your component.

A more convenient base might be the
[AbstractExecutionListener](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/executor/AbstractExecutionListener.html).
The interface *ExecutionListener* has 15 methods which you would have to
implement, although you probably need only a few of them. The
*AbstractExecutionListener* implements all those methods with an empty
method body. By inheriting from this class, you only have to override
the methods you really need. We will therefore use the
*AbstractExecutionListener* from now on.

A minimal execution listener would look as following.

**MyExecutionListener.xtend**

``` java
@Component
class MyExecutionListener extends AbstractExecutionListener {
}
```

At the moment the listener has no real function. So let us implement one
of the methods to be notified once a test step is executed.

**MyExecutionListener.xtend**

``` java
@Component
class MyExecutionListener extends AbstractExecutionListener {

    override stepStarted(TestStep testStep) {
        println("stepStarted: " + testStep.name)
    }
}
```

Once in the Spring context (the *Component* annotation takes care of
that), the listener is already notified during the test execution and
prints the name of all started test steps.

# Order

As mentioned in the chapter [How does it work?](45219845.html), there
are already various listeners per default active during the test
execution. There is one listener responsible for making screenshots in
case that the execution failed, one listener is responsible for writing
the Allure report files and so on. If you want to hook into the test
plan execution, you should keep an eye on the order of the listeners. By
using Spring's
[@Order](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/core/annotation/Order.html)
annotation, the listeners are notified in a deterministic order. In the
following table you can find the listeners within Tapir.

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th>Execution Listener</th>
<th>Order</th>
<th>Desription</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><a href="https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/executor/StepStartedStateUpdater.html">StepStartedStateUpdater</a></td>
<td>-10000</td>
<td>Sets the current step of the <a href="https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/executor/ExecutionState.html">ExecutionState</a>.</td>
</tr>
<tr class="even">
<td><em><a href="https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/junit/listener/JUnitExecutionListener.html">JUnitExecutionListener</a></em></td>
<td>-7000</td>
<td>Fulfils the reporting API for JUnit.</td>
</tr>
<tr class="odd">
<td><em><a href="https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/selenium/listener/HtmlPageCaptureListener.html">HtmlPageCaptureListener</a></em></td>
<td>-4000</td>
<td>Saves the static HTML content in case a step fails.</td>
</tr>
<tr class="even">
<td><em><a href="https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/selenium/listener/JavaScriptErrorListener.html">JavaScriptErrorListener</a></em></td>
<td>-1500</td>
<td>Saves the dynamic HTML content in case a step fails.</td>
</tr>
<tr class="odd">
<td><em><a href="https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/executor/LoggingExecutionListener.html">LoggingExecutionListener</a></em></td>
<td>1500</td>
<td><p>Logs each event based on the logging configuration.</p></td>
</tr>
<tr class="even">
<td><em><a href="https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/selenium/listener/ScreenshotListener.html">ScreenshotListener</a></em></td>
<td>4000</td>
<td>Makes a screenshot in case a step fails.</td>
</tr>
<tr class="odd">
<td><em><a href="https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/junit/allure/listener/AllureExecutionListener.html">AllureExecutionListener</a></em></td>
<td>7000</td>
<td>Fulfils the reporting API for Allure and attaches all screenshots and saved HTML contents.</td>
</tr>
<tr class="even">
<td><em><a href="https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/executor/StepFinishedStateUpdater.html">StepFinishedStateUpdater</a></em></td>
<td>10000</td>
<td>Resets the <a href="https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/executor/ExecutionState.html">ExecutionState</a>.</td>
</tr>
</tbody>
</table>

Your own execution listeners should usually have an order between -10000
and 10000. The precise order depends on the task you are performing. If,
for instance, you want to make screenshots each time a step is started
or succeeded (and not only if the step failed), you would have to use an
order between -10000 and 7000 - because you have to provide the
screenshot before the *AllureExecutionListener* starts to assemble the
report files.

**MyScreenshotListener.xtend**

``` java
@Component
@Order(0)
class MyScreenshotListener extends AbstractExecutionListener {

    @Autowired
    ScreenshotService screenshotService

    override stepStarted(TestStep testStep) {
        val name = '''«testStep.parentTestClass.name».«testStep.name»-Screenshot-Before'''
        screenshotService.takeScreenshot(name)
    }

    override stepSucceeded(TestStep testStep) {
        val name = '''«testStep.parentTestClass.name».«testStep.name»-Screenshot-After'''
        screenshotService.takeScreenshot(name)
    }
}
```
