---
title: HTML Components
description: tapir offers the possibility to build testing components for the web components of your application under test.
permalink: /docs/customization/htmlcomponents/
---

At some point you may encounter a situation where you need to develop
own <i>tapir</i> web components. Either because your application uses (custom)
components not covered by the default <i>tapir</i> components or simply because
the components in your application have a different behaviour.

In order to create a custom web component, you should start with an
interface. This interface should reflect actions or checks that could be
done by the end-user sitting in front of the web browser, as well.
Always set yourself in the user's place when defining the interface
methods. What can he do with your component?

<div class="panel panel-info">
  <div class="panel-heading">
    <h3 class="panel-title"><i class="fa fa-external-link" aria-hidden="true"></i> Showcase</h3>
  </div>
  <div class="panel-body">
  <h4>Interfaces</h4>
  <ul>
    <li>
        <a href="https://github.com/tapir-test/tapir-showcase/blob/master/google/google-pages/src/main/java/de/bmiag/tapir/showcase/google/pages/component/Listbox.xtend">Listbox</a>
    </li>
    <li>
        <a href="https://github.com/tapir-test/tapir-showcase/blob/master/wikipedia/src/main/java/de/bmiag/tapir/showcase/wikipedia/component/ContentElement.xtend">ContentElement</a>
    </li>
    <li>
        <a href="https://github.com/tapir-test/tapir-showcase/blob/master/wikipedia/src/main/java/de/bmiag/tapir/showcase/wikipedia/component/WikipediaContentTable.xtend">WikipediaContentTable</a>
    </li>
  </ul>
  <h4>Implementations</h4>
  <ul>
    <li>
        <a href="https://github.com/tapir-test/tapir-showcase/blob/master/google/google-pages/src/main/java/de/bmiag/tapir/showcase/google/pages/component/impl/ListboxImpl.xtend">ListboxImpl</a>
    </li>
    <li>
        <a href="https://github.com/tapir-test/tapir-showcase/blob/master/wikipedia/src/main/java/de/bmiag/tapir/showcase/wikipedia/component/impl/ContentElementImpl.xtend">ContentElementImpl</a>
    </li>
    <li>
        <a href="https://github.com/tapir-test/tapir-showcase/blob/master/wikipedia/src/main/java/de/bmiag/tapir/showcase/wikipedia/component/impl/ContentTableImpl.xtend">ContentTableImpl</a>
    </li>
  </ul>
  </div>
</div>


# Example Interface

Instead of describing the custom component creation in an abstract way, we will use the example of a button provided by [Vaadin](https://vaadin.com/), a widespread web framework. Vaadin makes use of complex components which extend the functionaility and behaviour of the basic HTML components. In order to
benefit from these advances features in your test cases, you have to design custom <i>tapir</i> components.

In contrast to a basic HTML button a Vaadin button might have a tooltip and a label. We define the interface accordingly:

**VaadinButton.java**

``` java
public interface VaadinButton extends TapirElement, Displayable, Clickable, Enabable, Tooltipped, Labeled {
}
```

In this example we decide to externalize the *getToolTip()* method in a Tooltipped interface as other components might want to use it as well:

**Tooltipped.java**

``` java
public interface Tooltipped {
    String getTooltip( );
}
```

It is very important that the interface extends [TapirElement](http://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/ui/api/TapirElement.html) as this marker interface is handled separately by <i>tapir</i>.

## Example Implementation

In addition to the interface you have to write an implementation:

**DefaultVaadinButton.java**

``` java
@Component( "vaadinButton" )
@Scope( ConfigurableBeanFactory.SCOPE_PROTOTYPE )
public class DefaultVaadinButton extends AbstractSingleSeleniumElement implements VaadinButton {
    @Autowired
    protected WebDriver webDriver;

    @Override
    public boolean isDisplayed( ) {
        return getWebElement( ).isDisplayed( );
    }
 
    @Override
    public void click( ) {
        if ( !isDisplayed( ) ) {
            throw new InvalidTapirElementStateException(
                    "The button is not displayed and therefore it's not possible to click on it." );
        }
        if ( !isEnabled( ) ) {
            throw new InvalidTapirElementStateException(
                    "The button is not enabled and therefore it's not possible to click on it." );
        }
        getWebElement( ).click( );
    }

    @Override
    public boolean isEnabled( ) {
        return
            !getClassNames( getWebElement() ).contains( "v-disabled" )
            && getWebElement().isEnabled( )
            && !Boolean.valueOf( getWebElement().getAttribute( "readonly" ) );
     }
 
    protected Set<String> getClassNames( WebElement element ) {
        String classAttribute = element.getAttribute( "class" );
        if ( classAttribute == null || classAttribute.trim( ).isEmpty( ) ) {
            return Collections.emptySet( );
        } else {
            Set<String> classes = new HashSet<String>( );
            Collections.addAll( classes, classAttribute.split( "[ ]+" ) );
            return classes;
        }
    }
 
    @Override
    public String getLabel( ) {
        return getWebElement( ).findElement( By.className( "v-button-caption" ) ).getText( );
    }
 
    @Override
    public String getTooltip( ) {
        new Actions( webDriver ).moveToElement( getWebElement( ) ).perform( );
        try {
            Thread.sleep( 1000 );
        } catch ( InterruptedException e ) {
        }
        WebElement toolTipElement = null;
        try {
            toolTipElement = webDriver.findElement( By.className( "v-tooltip" ) );
        } catch ( NoSuchElementException nse ) {
        }
        if ( toolTipElement != null && toolTipElement.isDisplayed( ) ) {
            String toolTipText = toolTipElement.getText( );
            if ( toolTipText != null ) {
                return toolTipText;
            }
        }
        return "";
    }
}
```

Writing such a component requires knowledge of the WebDriver API and the HTML code. The components are the major binding element between the
business test code and the technical HTML code.

Let's take a deeper look into the implementation:

### @Component

Because of the [@Component](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/stereotype/Component.html) annotation the <i>tapir</i> component is scanned by the module configuration. You just have to make sure that the <i>tapir</i> component is located in a (sub-) package of the classes which is annotated by [@ModuleConfiguration](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/bootstrap/annotation/ModuleConfiguration.html).

### isDisplayed()

The implementation is straightforward as *isDisplayed()* is simply
forwarded to the underlying web element.

### click()

The implementation is straightforward and does not differ from
[DefaultSeniumButton](http://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/htmlbasic/impl/DefaultSeleniumButton.html).

### isEnabled()

*isEnabled()* is a little bit trickier. A Vaadin button is enabled if the
following conditions match:

1. the web element does not have the css class v-disabled
1. WebElement.isEnabled() returns true
1. WebElement.getAttribute("readonly")  does not return true

<div class="panel panel-warning">
  <div class="panel-heading">
    <h3 class="panel-title"><span class="fa fa-warning"></span> Warning</h3>
  </div>
  <div class="panel-body">
  This implementation is Vaadin-specific. A Vaadin update might necessitate an implementation adjustment, but always keep in mind that you have to adjust one single point. All of your test code is not affected!
  </div>
</div>



## getLabel()

Accessing the button label is straightforward but Vaadin-specific. You
just have to search for the element with css class *v-button-caption*.

## getToolTip()

This is the most complicated implementation, but if you take a deeper
look it exactly reflects the actions a user performs in order to see the
tooltip:

1. Moving the mouse cursor to the button
1. Waiting a second for the tooltip to occur
1. Checking if the tooltip is displayed
1. Accessing and returning the text

It's simple, but would you like to have this in your business test code?
No way! 

# Conclusion

Writing a custom <i>tapir</i> component is easy, but you have to deal with the
characteristics of your web component. The great advantage of using
these <i>tapir</i> components is that they completely encapsulate your test
code and your HTML page. In conjunction with [Page
Objects]({{"/docs/usingtapir/page-objects/" | prepend: site.baseurl}}) you get a highly maintainable test code base.
