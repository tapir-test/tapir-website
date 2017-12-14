---
title: Custom Implementation
permalink: /docs/customization/customimplementation/
---

As all instances are managed by Spring Tapir enables you to overwrite
any implementation, even those provided by Tapir's core or any optional
module. This offers maximum flexibility to the user.

Handle this feature with care! Violating contracts might lead to elusive
errors.

# Example

Tapir's Selenium integration captures a screenshot every time a test
step fails. The name of the screenshot has the following format: 

    {TestClassName}.{StepName}-FailScreenshot

Imagine you want to change this identifier to

    {TestClassName}-{StepName}-Failure

The name is built
by [ScreenshotListener](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/selenium/listener/ScreenshotListener.html)
whose bean name is its fully qualified name
*de.bmiag.tapir.selenium.listener.ScreenshotListener*.

The [FilesystemAttachmentListener](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/attachment/FilesystemAttachmentListener.html)captures
the attachment, stores it on the disk and outputs the file path:

    The attachment GoogleTest.assertTitle-FailScreenshot has been written to {somepath}/GoogleTest.assertTitle-FailScreenshot.png

We can register a custom screenshot listener which uses our identifier:

**CustomScreenshotListener.xtend**

``` java
@Component
@Order(4000)
class CustomScreenshotListener extends AbstractExecutionListener {
    @Autowired
    ScreenshotService screenshotService
    /**
     * @since 2.0.0
     */
    override void stepFailed(TestStep testStep, Throwable throwable) {
        val name = '''«testStep.parentTestClass.name»-«testStep.name»-Failure'''
        screenshotService.takeScreenshot(name)
    }
}
```

This would just add another ExecutionListener. In the end you get two
screenshots. 

    The attachment GoogleTest.assertTitle-FailScreenshot has been written to {somepath}/GoogleTest.assertTitle-FailScreenshot.png
    The attachment GoogleTest-assertTitle-Failure has been written to {somepath}/GoogleTest-assertTitle-Failure.png

That's not the desired behaviour as we would like to override the old
ScreenshotListener. Unfortunately Spring does not allow to override a
bean via component scan. You have to declare the bean in your
configuration class:

**MyConfiguration.xtend**

``` java
@ModuleConfiguration
public class MyConfiguration {
    @Bean("de.bmiag.tapir.selenium.listener.ScreenshotListener")
    def CustomScreenshotListener customScreenshotListener() {
        return new CustomScreenshotListener
    }
}
```

This declaration overrides the bean
"de.bmiag.tapir.selenium.listener.ScreenshotListener". The result is
this logged message:

    The attachment GoogleTest-assertTitle-Failure has been written to {somepath}/GoogleTest-assertTitle-Failure.png

# Conclusion

Overriding a bean is quite simple. All you need to know is the name of
the bean you would like to override, Of course you have to make sure
that the type of your bean is compatible with the type of the overridden
bean.

Beans which are registered via component scan cannot override other
beans. You have to declare them in your module's configuration class.
