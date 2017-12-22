---
title: Dynamic Active Annotations
description: Dynamic Active Annotations offer the possibility to enhance the validator and code generator.
permalink: /docs/customization/dynamic-active-annotations/
---

You may have noticed throughout the documentation, that <i>tapir</i> uses a lot
of active annotations in various modules. Those active annotations are
responsible for generating additional Java code from the Xtend code. You
might encounter situations in which the generated code is not enough or
obstructs you somehow. In such cases you are able to implement an own
annotation processor and override <i>tapir's</i> behaviour.

<div class="panel panel-warning">
  <div class="panel-heading">
    <h3 class="panel-title"><span class="fa fa-warning"></span> Caution</h3>
  </div>
  <div class="panel-body">
  For this chapter we assume that you are already familiar with active
  annotations. If not, you might want to take another look at the
  <a href="{{"/docs/usingtapir/xtend/" | prepend: site.baseurl}}">Xtend</a> chapter of this documentation.
  </div>
</div>

The active annotations which bind their corresponding annotation
processors in a lazy way are called dynamic active annotations in <i>tapir</i>.
Such annotations are annotated with
[@DynamicActive](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/annotationprocessing/annotation/DynamicActive.html).
The potential annotation processors are annotated with
[@AnnotationProcessor](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/annotationprocessing/annotation/AnnotationProcessor.html).
To determine which annotation processor is the one generating the code
for a dynamic active annotation, Spring's
[@Order](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/core/annotation/Order.html)
annotation is used. As a higher order is prefered over a lower order,
you are able to overwrite <i>tapir's</i> annotation processor in submodules.

**Parameter.xtend**

``` xtend
@Retention(RetentionPolicy.RUNTIME)
@Target(#[ElementType.FIELD, ElementType.PARAMETER])
@DynamicActive
public annotation Parameter {
    ...
}
```

**ParameterValidator.xtend**

``` xtend
@AnnotationProcessor(#[Parameter, IteratedParameter])
@Order(-10000)
class ParameterValidator implements ValidationParticipant<NamedElement> {
    ...
}
```

The above example shows the dynamic active *Parameter* annotation from the [data provider chapter]({{"/docs/usingtapir/data-provider/" | prepend: site.baseurl}}) and the corresponding *ParameterValidator*. Note that the *ParameterValidator* is responsible to process more than one annotation and has an order of -10000. If you would want to overwrite the behaviour of the *ParameterValidator*, you would create an own annotation processor with an order higher than -10000.

<div class="panel panel-warning">
  <div class="panel-heading">
    <h3 class="panel-title"><span class="fa fa-warning"></span> Caution</h3>
  </div>
  <div class="panel-body">
    If you decide to overwrite tapir's behaviour, we suggest that you inherit from the default processor of the annotation in question.
  </div>
</div>

If <i>tapir</i> cannot find an annotation processor which handles a *DynamicActive* annotation, the generator marks your annotated elements with an error of the form *The dynamic annotation processor for ... cannot be determined*.

![]({{"/img/docs/45940941/49184774.png" | prepend: site.baseurl}}){:width="600x"}

However, you might want to create an *DynamicActive* anotation, which
has an annotation processor in some modules but not in all of them.
Instead of creating an empty dummy annotation processor to avoid the
error, you can also use the attribute *processorRequired* in the
*DynamicActive* annotation (which is set to *true* by default). In
<i>tapir</i>, we use this attribute for the *SeleniumElement*, because we
maintain some projects, in which the *SeleniumElement* annotation has
additional meaning and generates some code.

**SeleniumElement.xtend**

``` xtend
@Target(ElementType.FIELD)
@Retention(RUNTIME)
@DynamicActive(processorRequired = false)
public annotation SeleniumElement {
  ...
}
```

The following table shows all dynamic active annotations and their
processor(s) in <i>tapir</i>. Note that some of the annotations do not have a
default annotation processor.

| Annotation | Annotation Processor | Order |
|---|---|---|
| [BootstrapConfiguration](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/bootstrap/annotation/BootstrapConfiguration.html) | [BootstrapConfigurationProcessor](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/bootstrap/annotation/BootstrapConfigurationProcessor.html) | -10000 |
| [ModuleConfiguration](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/bootstrap/annotation/ModuleConfiguration.html) | [ModuleConfigurationProcessor](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/bootstrap/annotation/ModuleConfigurationProcessor.html) | -10000 |
| [Conditional](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/conditional/annotations/Conditional.html) | [ConditionalProcessor](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/conditional/annotations/ConditionalProcessor.html) | -10000 |
| [Configuration](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/configuration/annotation/configuration/Configuration.html) | [ConfigurationProcessor](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/configuration/annotation/configuration/ConfigurationProcessor.html) | -10000 |
| [ConfigurationVariant](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/configuration/annotation/variant/ConfigurationVariant.html) | [ConfigurationVariantProcessor](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/configuration/annotation/variant/ConfigurationVariantProcessor.html) | -10000 |
| [Include](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/core/annotation/include/Include.html) | [IncludeProcessor](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/core/annotation/include/IncludeProcessor.html) | -10000 |
| [Reference](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/core/annotation/reference/Reference.html) | [ReferenceProcessor](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/core/annotation/reference/ReferenceProcessor.html) | -10000 |
| [UseExtension](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/core/annotation/useextension/UseExtension.html) | [UseExtensionProcessor](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/core/annotation/useextension/UseExtensionProcessor.html) | -10000 |
| [Immutable](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/data/Immutable.html) | [ImmutableProcessor](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/data/ImmutableProcessor.html) | -10000 |
| [IteratedParameter](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/annotations/parameter/IteratedParameter.html) | [ParameterValidator](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/annotations/parameter/ParameterValidator.html) | -10000 |
| [Parameter](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/annotations/parameter/Parameter.html) | [ParameterValidator](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/annotations/parameter/ParameterValidator.html) | -10000 |
| [Step](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/annotations/step/Step.html) | [StepProcessor](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/annotations/step/StepProcessor.html) | -10000 |
| [TestClass](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/annotations/testclass/TestClass.html) | [TestClassProcessor](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/annotations/testclass/TestClassProcessor.html) | -10000 |
| [TestClass](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/annotations/testclass/TestClass.html) | [JUnitTestClassProcessor](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/junit/annotations/testclass/JUnitTestClassProcessor.html) | -9000 |
| [TestSuite](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/annotations/suite/TestSuite.html) | [TestSuiteProcessor](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/annotations/suite/TestSuiteProcessor.html) | -10000 |
| [TestSuite](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/annotations/suite/TestSuite.html) | [JUnitTestSuiteProcessor](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/junit/annotations/suite/JUnitTestSuiteProcessor.html) | -9000 |
| [CustomLabel](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/core/annotation/label/CustomLabel.html) | [CustomLabelProcessor](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/core/annotation/label/CustomLabelProcessor.html) | -10000 |
| [JavadocGen](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/annotations/documentation/JavadocGen.html) | [JavadocGenProcessor](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/annotations/documentation/JavadocGenProcessor.html) |  -10000 |
| [Feature](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/variant/annotation/feature/Feature.html) | [FeatureProcessor](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/variant/annotation/feature/FeatureProcessor.html) | -10000 |
| [FeatureActivated](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/variant/annotation/feature/FeatureActivated.html) | [FeatureActivatedProcessor](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/variant/annotation/feature/FeatureActivatedProcessor.html) | -10000 |
| [FeatureNotActivated](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/variant/annotation/feature/FeatureNotActivated.html) | [FeatureActivatedProcessor](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/variant/annotation/feature/FeatureActivatedProcessor.html) | -10000 |
| [Action](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/util/action/Action.html) | [ActionProcessor](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/util/action/ActionProcessor.html) | -10000 |
| [SeleniumElement](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/selenium/annotation/SeleniumElement.html) | - | - |
| [JavaFXElement](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/javafx/annotation/JavaFXElement.html) | - | - |
