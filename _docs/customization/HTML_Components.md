---
title: HTML Components
permalink: /docs/customization/htmlcomponents/
---

At some point you may encounter a situation where you need to develop
own Tapir web components. Either because your application uses (custom)
components not covered by the default Tapir components or simply because
the components in your application have a different behaviour.

In order to create a custom web component, you should start with an
interface. This interface should reflect actions or checks that could be
done by the end-user sitting in front of the web browser, as well.
Always set yourself in the user's place when defining the interface
methods. What can he do with your component?

 

Showcase

[de.bmiag.tapir.showcase.element.ContentTable](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/showcase/element/ContentTable.html)
and
[de.bmiag.tapir.showcase.element.ContentElement](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/showcase/element/ContentElement.html)
are interfaces of custom components.

These interfaces are implemented by
[de.bmiag.tapir.showcase.element.impl.ContentTableImpl](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/showcase/element/impl/ContentTableImpl.html)
and
[de.bmiag.tapir.showcase.element.impl.ContentElementImpl](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/showcase/element/impl/ContentElementImpl.html).

# Example Interface

Instead of describing the custom component creation in an abstract way,
we will use the example of a button provided by Vaadin, a widespread web
framework. Vaadin makes use of complex components which extend the
functionaility and behaviour of the basic HTML components. In order to
benefit from these advances features in your test cases, you have to
design custom Tapir components.

In contrast to a basic HTML button a Vaadin button might have a tooltip
and a label. We define the interface accordingly:

**VaadinButton.java**

``` java
public interface VaadinButton extends TapirElement, Displayable, Clickable, Enabable, Tooltipped, Labeled {
}
```

In this example we decide to externalize the getToolTip() method in a
Tooltipped interface as other components might want to use it as well:

**Tooltipped.java**

``` java
public interface Tooltipped {
    String getTooltip( );
}
```

It is very important that the interface extends TapirElement as this
marker interface is handled separately by Tapir.

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

Writing such a component requires knowledge of the WebDriver API and the
HTML code. The components are the major binding element between the
business test code and the technical HTML code.

Let's take a deeper look into the implementation:

### @Component

Because of the @Component annotation the Tapir component is scanned by
the module configuration. You just have to make sure that the Tapir
component is located in a (sub-) package of the classes which is
annotated by @ModuleConfiguration.

### isDisplayed()

The implementation is straightforward as isDisplayed() is simply
forwarded to the underlying web element.

### click()

The implementation is straightforward and does not differ from
DefaultSeniumButton.

### isEnabled()

isEnabled() is a little bit trickier. A Vaadin button is enabled if the
following conditions match:

1.  the web element does not have the css class v-disabled
2.  WebElement.isEnabled() returns true
3.  WebElement.getAttribute("readonly")  does not return true

This implementation is Vaadin-specific. A Vaadin update
might necessitate an implementation adjustment, but always keep in mind
that you have to adjust one single point. All of your test code is not
affected!

## getLabel()

Accessing the button label is straightforward but Vaadin-specific. You
just have to search for the element with css class *v-button-caption*.

## getToolTip()

This is the most complicated implementation, but if you take a deeper
look it exactly reflects the actions a user performs in order to see the
tooltip:

1.  Moving the mouse cursor to the button
2.  Waiting a second for the tooltip to occur
3.  Checking if the tooltip is displayed
4.  Accessing and returning the text

It's simple, but would you like to have this in your business test code?
No way! 

# Conclusion

Writing a custom Tapir component is easy, but you have to deal with the
characteristics of your web component. The great advantage of using
these Tapir components is that they completely encapsulate your test
code and your HTML page. In conjunction with [Page
Objects](Page_Objects) you get a highly maintainable test code base.
