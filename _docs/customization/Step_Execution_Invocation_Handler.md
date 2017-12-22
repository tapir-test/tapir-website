---
title: Step Execution Invocation Handler
description: The Step Execution Invocation Handler is notified before and after a step is executed and can influenxe the result of the step execution.
permalink: /docs/customization/step-execution-invocation-handler/
---

A
[StepExecutionInvocationHandler](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/executor/StepExecutionInvocationHandler.html)
is notified before and after a step is executed. In constrast to an [execution listener]({{"/docs/customization/executionlistener/" | prepend: site.baseurl}}) the StepExecutionInvocationHandler can influence the result of the step execution.

# Dependency

``` xml
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-execution</artifactId>
</dependency>
```

# Custom Step Execution Invocation Handler

Let us assume we would like to check if the browser we use for our tests
displays the expected page before we start with a step execution. We
could provide an annotation:

**AssertEntryPage.xtend**

``` xtend
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
annotation AssertEntryPage {
    Class<? extends PageActiveAssertion> value
}
```

The given class is the one you expect to be active when entering the
step. A *StepExecutionInvocationHandler* is the perfect fit for this
check:

**AssertEntryPageeStepExecutionInvocationHandler.xtend**

``` xtend
@Component
class AssertEntryPageStepExecutionInvocationHandler implements StepExecutionInvocationHandler {

    @Autowired
    BeanFactory beanFactory

    override handlePreInvoke(TestStep testStep, Object testInstance) {
        val method = testStep.javaMethod
        val assertPostPageAnnotation = method.getAnnotation(AssertEntryPage)
        if(assertPostPageAnnotation !== null) {
            val pageObjectClass = assertPostPageAnnotation.value
            val pageObject = beanFactory.getBean(pageObjectClass)
            pageObject.assertPageActive
        }
        Result.PROCEED
    }

    override handlePostInvoke(TestStep testStep, Object testInstance) {
    }
}
```

In the handlePreInvoke we obtain the java method and check for
the *AssertEntryPage* annotation. If it's available, we get the page
object class which is expected to be active and assert it's activity. If
assertPageActive throws an exception, the step execution is omitted and
the step is marked as failed.

The *@Component* annotation is sufficient to make the bean visible for
Spring, if the class is located in a configuration's (sub-) package.
