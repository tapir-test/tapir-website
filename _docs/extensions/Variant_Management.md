---
title: Variant Management
description: tapir supports testing for product lines. The tests behave differently based on the enabled features of a certain edition or customer.
permalink: /docs/extensions/variant-management/
---

You might find yourself in a situation where you want to distinguish
different variants of your application under test. Either because there
exist certain editions of your application (for instance a standard and
a professional edition) or you have a specific manifestation of the
application for each of your customers. The variant management of the
<i>tapir</i> Variant module helps you with this task.

## Dependency

``` xml
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-variant</artifactId>
</dependency>
```

## Features

In the context of your application, a feature is usually a (small)
distinct characteristic which can be part of some variants but not all
of them (for instance, only the professional version of your application
provides a REST API). Defining fine-grained features for your
application enables a better reuse of your tests in case a new variant
is added to your application. A feature can be specified by marking a
class with the [@Feature](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/variant/feature/Feature.html) annotation.

**Feature1.xtend**

``` xtend
@Feature
class Feature1 {
}
```

 

**Feature2.xtend**

``` xtend
@Feature
class Feature2 {
}
```

 

**RestAPIFeature.xtend**

``` xtend
@Feature
class RestAPIFeature {
}
```

Defining the features of your application allows to mark test steps,
classes or even suites with the [@FeatureActivated](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/variant/annotation/feature/FeatureActivated.html) annotation. The marked
elements are only executed if the specified feature(s) is/are active.

**RestAPITestClass.xtend**

``` xtend
@TestClass
@FeatureActivated(RestAPIFeature)
class RestAPITestClass {
  ...
}
```

 

**TestClass1.xtend**

``` xtend
@TestClass
class TestClass1 {

    @Step
    @FeatureActivated(Feature1)
    def void class1Step1() {
        ...
    }
}
```

The *FeatureActivated* annotation provides also the methods allOf and
anyOf in case you want to define that your tests will be executed only
if all features or at least one of a set of features are active.

``` xtend
@TestClass
@FeatureActivated(anyOf = #[Feature1, Feature2])
class TestClass2 {

    @Step
    @FeatureActivated(allOf = #[Feature3, Feature4])
    def void class2Step1() {
        ...
    }
}
```

In case you want to specify that a test is only executed if some
features are not active, you can also use the [@FeatureNotActivated](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/variant/annotation/feature/FeatureNotActivated.html)
annotation. It provides the same methods as the *FeatureActivated*
annotation.

``` xtend
@TestClass
@FeatureNotActivated(allOf = #[Feature1, Feature2])
class TestClass3 {
    ...
}
```

If you need to ask for the features in a more fine-grained way (for
instance, you want to access a text field only if a feature is active),
you can use the [FeatureCheckService](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/variant/service/FeatureCheckService.html). You can use the service to check
whether a feature is active or not.

<div class="panel panel-info">
  <div class="panel-heading">
    <div class="panel-title"><span class="fa fa-info-circle"></span> Hint</div>
  </div>
  <div class="panel-body">
  The <a href="{{"/docs/extensions/conditional/" | prepend: site.baseurl}}">conditional</a> module of <i>tapir</i> can help you to implement
  more complex and reusable conditions.
  </div>
</div>

**TestClass4.xtend**

``` xtend
@TestClass
class TestClass4 {

    @Autowired
    FeatureCheckService featureCheckService

    @Step
    def void class4Step1() {
        if (featureCheckService.isActive(Feature1)) {
            ...     
        } else {
            ...
        }
    }
 }
```

If you are using [data providers]({{"/docs/testdata/data-injection/" | prepend: site.baseurl}}) in your tests, you can also enable or
disable parts of the provided data by checking for features. Your data
element classes should implement [FeatureBased](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/variant/data/FeatureBased.html). The
method *getActivateByFeatureExpression()* returns an optional
[FeatureExpression](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/variant/feature/expression/FeatureExpression.html) which can be built by [using FeatureExpressionBuilder](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/variant/feature/expression/FeatureExpressionBuilder.html).
The extension provides methods similar to those of
the *FeatureActivated* and *FeatureNotActivated* annotations. In conjunction
with <i>tapir's</i> [Immutables]({{"/docs/extensions/immutables/" | prepend: site.baseurl}}) you can declare your feature based objects like
this:

**DataProviderElement1.xtend**

``` xtend
@Immutable
class DataProviderElement1 implements FeatureBased{
    int id
}
```

**DataProvider1.xtend**

``` xtend
@Component
@UseExtension(FeatureExpressionBuilder)
class DataProvider1 {

    def Iterable<DataProviderElement1> data() {
        #[
            new DataProviderElement1.build[
                id = 1
                activateByFeatureExpression = allOf(Feature1.activated, Feature2.activated)
            ],
            new DataProviderElement1.build[
                id = 2
                activateByFeatureExpression = anyOf(Feature1.activated, Feature2.activated)
            ],
            new DataProviderElement1.build[
                id = 3
                activateByFeatureExpression = not(Feature1.activated)
            ]
        ]
    }
}
```

For types which are not annotated with *@Immutable* extending
[FeatureSpecificDataElement](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/variant/data/FeatureSpecificDataElement.html) might be an option. This abstract
class implements *FeatureBased* and provides a getter and a setter for the
feature expression.

## Variants

A variant specification usually acts as a container for a set of
features. A class can be marked as variant specification by using the
[Variant](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/variant/annotation/variant/Variant.html) annotation.

**StandardEdition.xtend**

``` xtend
 @Variant(features = #[Feature1])
 class StandardEdition {
 }
```

**ProfessionalEdition.xtend**

``` xtend
 @Variant(features = #[Feature1, Feature2])
 class ProfessionalEdition {
 }
```


A variant is active, when the value of the property *variant* is the
name of the variant. The name of a variant is the classname, unless you
specify it with the attribute *name* in the annotation. [This
chapter]({{"/docs/usingtapir/externalized-configuration/" | prepend: site.baseurl}}) explains how to configure
properties. Once a variant is active, all features of the variant are
active.

<div class="panel panel-warning">
  <div class="panel-heading">
    <div class="panel-title"><span class="fa fa-warning"></span> Caution</div>
  </div>
  <div class="panel-body">
  When developing your test cases, you should focus on features and not on
  variants. Using the correct amount of features makes it way easier to
  add further variants of your application later.
  </div>
</div>
