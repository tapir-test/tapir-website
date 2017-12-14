---
title: Dynamic Active Annotations
permalink: /docs/customization/dynamicactiveannotations/
---

You may have noticed throughout the documentation, that Tapir uses a lot
of active annotations in various modules. Those active annotations are
responsible for generating additional Java code from the Xtend code. You
might encounter situations in which the generated code is not enough or
obstructs you somehow. In such cases you are able to implement an own
annotation processor and override Tapir's behaviour.

For this chapter we assume that you are already familiar with active
annotations. If not, you might want to take another look at the
[Xtend](45219887.html)chapter of this documentation.

The active annotations, which bind their corresponding annotation
processors in a lazy way are called dynamic active annotations in Tapir.
Such annotations are annotated with
[@DynamicActive](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/annotationprocessing/annotation/DynamicActive.html).
The potential annotation processors are annotated with
[@AnnotationProcessor](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/annotationprocessing/annotation/AnnotationProcessor.html).
To determine which annotation processor is the one generating the code
for a dynamic active annotation, Spring's
[@Order](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/core/annotation/Order.html)
annotation is used. As a higher order is prefered over a lower order,
you are able to overwrite Tapir's annotation processor in submodules.

**Parameter.xtend**

``` java
@Retention(RetentionPolicy.RUNTIME)
@Target(#[ElementType.FIELD, ElementType.PARAMETER])
@DynamicActive
public annotation Parameter {
    ...
}
```

**ParameterValidator.xtend**

``` java
@AnnotationProcessor(#[Parameter, IteratedParameter])
@Order(-10000)
class ParameterValidator implements ValidationParticipant<NamedElement> {
    ...
}
```


The above example shows the dynamic active *Parameter* annotation from
the [data provider chapter](Data_Provider) and the corresponding
*ParameterValidator*. Note that the *ParameterValidator* is responsible
to process more than one annotation and has an order of -10000. If you
would want to overwrite the behaviour of the *ParameterValidator*, you
would create an own annotation processor with an order higher than
-10000.

If you decide to overwrite Tapir's behaviour, we suggest that you
inherit from the default processor of the annotation in question.

If Tapir cannot find an annotation processor which handles
a *DynamicActive* annotation, the generator marks your annotated
elements with an error of the form *The dynamic annotation processor for
... cannot be determined*.

![](img/docs/45940941/49184774.png){height="250"}

However, you might want to create an *DynamicActive* anotation, which
has an annotation processor in some modules but not in all of them.
Instead of creating an empty dummy annotation processor to avoid the
error, you can also use the attribute *processorRequired* in the
*DynamicActive* annotation (which is set to *true* by default). In
Tapir, we use this attribute for the *SeleniumElement*, because we
maintain some projects, in which the *SeleniumElement* annotation has
additional meaning and generates some code.

**SeleniumElement**

``` java
@Target(ElementType.FIELD)
@Retention(RUNTIME)
@DynamicActive(processorRequired = false)
public annotation SeleniumElement {
  ...
}
```

The following table shows all dynamic active annotations and their
processor(s) in Tapir. Note that some of the annotations do not have a
default annotation processor.

Annotation

Annotation Processor

Order

BootstrapConfiguration

BootstrapConfigurationProcessor

-10000

ModuleConfiguration

[ModuleConfigurationProcessor](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/bootstrap/annotation/ModuleConfigurationProcessor.html)

-10000

[Conditional](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/conditional/annotations/Conditional.html)

[ConditionalProcessor](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/conditional/annotations/ConditionalProcessor.html)

-10000

[Configuration](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/configuration/annotation/configuration/Configuration.html)

[ConfigurationProcessor](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/configuration/annotation/configuration/ConfigurationProcessor.html)

-10000

ConfigurationVariant

[ConfigurationVariantProcessor](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/configuration/annotation/variant/ConfigurationVariant.ConfigurationVariantProcessor.html)

-10000

Include

IncludeProcessor

-10000

Reference

ReferenceProcessor

-10000

UseExtension

UseExtensionProcessor

-10000

Immutable

ImmutableProcessor

-10000

IteratedParameter

ParameterValidator

-10000

Parameter

ParameterValidator

-10000

Step

StepProcessor

-10000

TestClass

TestClassProcessor

-10000

JUnitTestClassProcessor

-9000

TestSuite

TestSuiteProcessor

-10000

JUnitTestSuiteProcessor

-9000

CustomLabel

CustomLabelProcessor

-10000

JavadocGen

JavadocGenProcessor

-10000

Feature

FeatureProcessor

-10000

FeatureActivated

FeatureActivatedProcessor

-10000

FeatureNotActivated

FeatureActivatedProcessor

-10000

Action

ActionProcessor

-10000

SeleniumElement

\-

\-

JavaFXElement

\-

\-

## Attachments:

![](images/icons/bullet_blue.gif){width="8" height="8"} [2017-06-22
11\_50\_08-workspace - Java -
tapir-selenium-test\_src\_test\_java\_de\_bmiag\_tapir\_selenium\_tes.png](img/docs/45940941/49184774.png)
(image/png)  
