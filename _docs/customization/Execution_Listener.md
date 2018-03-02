---
title: Execution Listener
description: Execution Listeners are notified whenever a test suite, class or step is started or finished.
permalink: /docs/customization/executionlistener/
---

As you might remember (or might look up in the chapter [How does it work?]({{"/docs/usingtapir/how-does-it-work/" | prepend: site.baseurl}})), <i>tapir</i> builds an execution plan based on the test suites, cases, steps and various annotations. The execution plan is executed by the
[ExecutionPlanExecutor](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/executor/ExecutionPlanExecutor.html)
which itself notifies the execution listeners. In this chapter we take a more detailed look at this and show you how to hook into the execution of the test plan. The execution listeners are part of <i>tapir's</i> *execution* module.

## Dependency

``` xml
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-execution</artifactId>
</dependency>
```

## Custom Execution Listener

In order to get notified during the test execution, you have to implement the interface [ExecutionListener](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/executor/ExecutionListener.html) and make sure that Spring is aware of your component.

<div class="panel panel-info">
  <div class="panel-heading">
    <div class="panel-title"><span class="fas fa-info-circle"></span> Hint</div>
  </div>
  <div class="panel-body">
  A more convenient base might be the <a href="https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/executor/AbstractExecutionListener.html">AbstractExecutionListener</a>.
  The interface <i>ExecutionListener</i> has 15 methods which you would have to
  implement, although you probably need only a few of them. The
  <i>AbstractExecutionListener</i> implements all those methods with an empty
  method body. By inheriting from this class, you only have to override
  the methods you really need. We will therefore use the
  <i>AbstractExecutionListener</i> from now on.
  </div>
</div>

A minimal execution listener would look as following.

**MyExecutionListener.xtend**

``` xtend
@Component
class MyExecutionListener extends AbstractExecutionListener {
}
```

At the moment the listener has no real function. So let us implement one
of the methods to be notified once a test step is executed.

**MyExecutionListener.xtend**

``` xtend
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

## Order

As mentioned in the chapter [How does it work?]({{"/docs/usingtapir/how-does-it-work/" | prepend: site.baseurl}}), there
are already various listeners per default active during the test
execution. There is one listener responsible for making screenshots in
case that the execution failed, one listener is responsible for writing
the Allure report files and so on. If you want to hook into the test
plan execution, you should keep an eye on the order of the listeners. By
using Spring's
[@Order](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/core/annotation/Order.html)
annotation, the listeners are notified in a deterministic order. In the
following table you can find the listeners within <i>tapir</i>.

| Execution Listener | Order | Description |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [StepStartedStateUpdater](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/executor/StepStartedStateUpdater.html) | -10000 | Sets the current step of the [ExecutionState](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/executor/ExecutionState.html). |
| [JUnitExecutionListener](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/junit/listener/JUnitExecutionListener.html) | -7000 | Fulfils the reporting API for JUnit. |
| [HtmlPageCaptureListener](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/selenium/listener/HtmlPageCaptureListener.html) | -4000 | Saves the static HTML content in case a step fails. |
| [JavaScriptErrorListener](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/selenium/listener/JavaScriptErrorListener.html) | -1500 | Saves the dynamic HTML content in case a step fails. |
| [LoggingExecutionListener](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/executor/LoggingExecutionListener.html) | 1500 | Logs each event based on the logging configuration. |
| [ScreenshotListener](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/selenium/listener/ScreenshotListener.html) | 4000 | Makes a screenshot in case a step fails. |
| [AllureExecutionListener](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/junit/allure/listener/AllureExecutionListener.html) | 7000 | Fulfils the reporting API for Allure and attaches all screenshots and saved HTML contents. |
| [StepFinishedStateUpdater](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/executor/StepFinishedStateUpdater.html) | 10000 | Resets the [ExecutionState](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/executor/ExecutionState.html). |

Your own execution listeners should usually have an order between -10000
and 10000. The precise order depends on the task you are performing. If,
for instance, you want to make screenshots each time a step is started
or succeeded (and not only if the step failed), you would have to use an
order between -10000 and 7000 - because you have to provide the
screenshot before the *AllureExecutionListener* starts to assemble the
report files.

**MyScreenshotListener.xtend**

``` xtend
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
