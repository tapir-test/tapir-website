---
title: UI Technology
permalink: /docs/customization/ui-technology/
---

<i>tapir</i> is not restricted to the usage of Selenium. Selenium is just one
framework you can use for automated interaction with a software under
test.

The Selenium modules are not part of <i>tapir's</i> core modules, so it's easy
to exchange them with your prefered automation framework.

<i>tapir</i> is not stucked on web applications. You can also test desktop
applications if you have a suitable automation framework which is
implemented in Java. <i>tapir's</i> API is completely technology-independent.

<div class="panel panel-warning">
  <div class="panel-heading">
    <h3 class="panel-title"><span class="fa fa-warning"></span> Warning</h3>
  </div>
  <div class="panel-body">
  In <i>tapir</i> this is the most complex task as you need to build a UI
  technology binding from scratch. It's time-consuming, but you will
  likely do this rarely or never.
  </div>
</div>



# How to Start?

These is a single point where you could integrate your custom UI
technology module: Page objects. In your page object each field is bound
to a specific UI technology implementation. This binding is established
by an annotation which is annotated by
[@PageElementAnnotation](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/page/annotation/PageElementAnnotation.html).
<i>tapir's</i> Selenium module provides
the [@SeleniumElement](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/selenium/annotation/SeleniumElement.html)
annotation in order to bind the field to a html element which is located
by Selenium. The annotated fields are processed and initialized by the
bound [PageObjectFieldInitializer](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/page/aop/pageobject/PageObjectFieldInitializer.html).
In case of Selenium
the [SeleniumPageObjectFieldInitializer](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/selenium/aop/pageobject/SeleniumPageObjectFieldInitializer.html)
solves this task.

<i>tapir</i> provides an experimental JavaFX module which is based
on [TestFX](https://github.com/TestFX/TestFX). We use this binding to
exemplify the implementation of a custom UI technology.

<div class="panel panel-warning">
  <div class="panel-heading">
    <h3 class="panel-title"><span class="fa fa-warning"></span> Warning</h3>
  </div>
  <div class="panel-body">
  As we don't want to get lost in Java FX implementation details we focus
  on the <i>tapir</i> API. Explanation of the JavaFX/TestFX API are omitted
  unless they are essential to understand the use case.
  </div>
</div>

## PageElementAnnotation

First of all you need an annotation which binds page fields as JavaFX
elements. Each JavaFX element can have an (unique) id, which can be used
to locate it.

**JavaFXElement.xtend**

``` xtend
@DynamicActive(processorRequired = false)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@PageElementAnnotation
annotation JavaFXElement {
 String id
}
```

## PageObjectFieldInitializer

You have to implement your own [PageObjectFieldInitializer](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/page/aop/pageobject/PageObjectFieldInitializer.html) in order to inject the fields of the page objects.

**JavaFXPageObjectFieldInitializer.xtend**

``` xtend
@Component
class JavaFXPageObjectFieldInitializer implements PageObjectFieldInitializer {
    @Autowired
    JavaFxElementFactory javaFxElementFactory
    @Autowired
    FxRobotInterface fxRobot
    /**
     * @since 2.0.0
     */
    override void initializeFields(Object element) {
        // Get all fields in the element which are annotated with 'JavaFXElement'
        val allFields = element.class.declaredFields
        val annotatedFields = allFields.filter[isAnnotationPresent(JavaFXElement)]
        for (field : annotatedFields) {
            // Get the id from the annotation
            var javaFXElementAnnotation = field.getAnnotation(JavaFXElement)
            val id = javaFXElementAnnotation.id()
            val typeToken = TypeToken.of(field.genericType);
            // Get the (proxied) tapir element from the factory
            val tapirElement = javaFxElementFactory.getJavaFxElement(fxRobot.lookup(id).queryFirst, typeToken);
            // Inject the field value
            FieldUtils.writeField(field, element, tapirElement, true)
        }
    }
}
```

The initializer collects all fields which are annotated by *JavaFXElement* (line 13) and transforms them to <i>tapir</i> elements (line 20) and injects the *TapirElement* into the field (line 22).

## Component

Each field which is annotated by JavaFXElement needs a type which implements/extends *TapirElement*. It's nearly the same as described in the chapter [HTML Components]({{"/docs/customization/htmlcomponents/" | prepend: site.baseurl}}) with the difference that your implementation relies on TestFX instead of Selenium.

This is a example interface and its implementation:

**Button.java**

``` java
public interface Button extends TapirElement, Displayable, Clickable, Enabable {
}
```

**DefaultJavaFXButton.xtend**

``` xtend
@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
class DefaultJavaFXButton extends AbstractJavaFXElement implements Button {
    @Autowired
    FxRobotInterface fxRobot

    override isDisplayed() {
        node.isVisible()
    }

    override click() {
        fxRobot.clickOn(node)
    }

    override isEnabled() {
        !node.disabled
    }
}
```

## Query lately

As decribed in the chapter [Selenium Core module]({{"/docs/selenium/seleniumcoremodule/" | prepend: site.baseurl}})
you should query elements as late as possible. Unfortunately JavaFX
makes extensive use of final methods without providing interfaces.
Therefore it's impossible to use proxies. In this example we focus on
proxying the *NodeQuery* interface which is provided by TestFX:

**JavaFxConfiguration.xtend**

``` xtend
@ModuleConfiguration
@AutoConfigureOrder(8000)
class JavaFxConfiguration {

    @Autowired
    AutowireCapableBeanFactory beanFactory

    @Bean
    def ApplicationTestFixture applicationTestFixture(@Value("${javafx.headless:#{false}}") boolean headless) {
        System.setProperty("java.awt.headless", headless.toString)
        new ApplicationTestFixture
    }
    @Bean
    @Primary
    def FxRobotInterface fxRobot(ApplicationTestFixture applicationTestFixture) {
        val searchContextMethodInterceptor = new NodeQueryMethodInterceptor[applicationTestFixture]
        beanFactory.autowireBeanProperties(searchContextMethodInterceptor, AutowireCapableBeanFactory.AUTOWIRE_NO, true)
        val proxyFactory = new ProxyFactory()
        proxyFactory.interfaces = FxRobotInterface
        proxyFactory.addAdvice(searchContextMethodInterceptor)
        val proxy = proxyFactory.getProxy(class.classLoader) as FxRobotInterface
        proxy
    }
}

```

Each FxRobot method call is interecepted by *NodeQueryMethodInterceptor*
which is explained below:

**NodeQueryMethodInterceptor.xtend**

``` xtend
class NodeQueryMethodInterceptor implements MethodInterceptor {
 
    @Autowired
    extension NodeProxyFactory
    final Supplier<?> cache
    new(Supplier<?> nodeQuerySupplier) {
        cache = Suppliers.memoize(nodeQuerySupplier)
    }
    def private getNodeQuery() {
        cache.get
    }
    override invoke(MethodInvocation invocation) throws Throwable {
        val method = invocation.method
        val args = invocation.arguments
        val returnTypeToken = TypeToken.of(method.genericReturnType)
        if(returnTypeToken.isSubtypeOf(NodeQuery)) {
            return getNodeQueryProxy[
                method.invokeReflective(args) as NodeQuery
            ]
        }
        return method.invokeReflective(args)
    }
    def protected Object invokeReflective(Method method, Object... args) {
        val nodeQuery = getNodeQuery
        try {
            method.accessible = true
            return method.invoke(nodeQuery, args)
        } catch(InvocationTargetException e) {
            throw e.targetException
        }
    }
}
```

Whenever a method at *NodeQuery* is called which returns a subtype of
*NodeQuery*, a NodeQueryProxy is built by *NodeProxyFactory*. All other
method calls are forwarded to the proxied *NodeQuery* which is obtained
lazily and cached by the *cache* field.

``` xtend
@Component
class NodeProxyFactory {
    @Autowired
    private AutowireCapableBeanFactory beanFactory
    def NodeQuery getNodeQueryProxy(Supplier<NodeQuery> nodeQuerySupplier) {
        val nodeQueryMethodInterceptor = new NodeQueryMethodInterceptor(nodeQuerySupplier)
        beanFactory.autowireBeanProperties(nodeQueryMethodInterceptor, AutowireCapableBeanFactory.AUTOWIRE_NO, true)
        val proxyFactory = new ProxyFactory(NodeQuery, nodeQueryMethodInterceptor)
        val proxy = proxyFactory.getProxy(class.classLoader) as NodeQuery
        proxy
    }
}
```

The *NodeProxyFactory* just intercpets method calls to the given
nodeQuerySupplier with the *NodeQueryMethodInterceptor*. This code is
much the same as in *JavaFxConfiguration*, but using the interceptor
again enables proxying nested *NodeQuery* calls
like *NodeQuery.lookup(String query)* which returns a *NodeQuery*.

# Conclusion

Integrating a new UI technology in <i>tapir</i> is a complex task, but most
users never ever get in touch as you could rely on the UI technologies
bindings that already exist.

If you have to get your handy dirty by implementing a UI technology
binding, it's definitely worth the effort as you benefit from all the
great features <i>tapir</i> provides. Users which already use another <i>tapir</i> UI
technology do not need time to learn the ropes as they are familiar with
the API and all the concepts.

This is a Page Object based on the JavaFX module:

**MainPage.xtend**

``` xtend
@Page
class MainPage {
    @JavaFXElement(id='#button')
    Button button

    @JavaFXElement(id='#textField')
    TextField textField

    @JavaFXElement(id='#label')
    Label label
}
```

And an example test:

**MainTestClass.xtend**

``` xtend
@TestClass
class MainTestClass {

    @Autowired
    MainPage mainPage

    @Step
    def void step1() {
        mainPage.button.click
        assertThat(mainPage.label.text, is('Button pressed'))
    }

    @Step
    def void step2() {
        mainPage.textField.text = 'Hallo world'
    }
}
```
