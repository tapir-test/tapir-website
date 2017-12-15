---
title: Variant Management
permalink: /docs/extensions/variantmanagement/
---

You might find yourself in a situation where you want to distinguish
different variants of your application under test. Either because there
exist certain editions of your application (for instance a standard and
a professional edition) or you have a specific manifestation of the
application for each of your customers. The variant management of the
Tapir Variant module helps you with this task.

# Dependency

``` xml
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-variant</artifactId>
</dependency>
```

# Features

In the context of your application, a feature is usually a (small)
distinct characteristic which can be part of some variants but not all
of them (for instance, only the professional version of your application
provides a REST API). Defining fine-grained features for your
application enables a better reuse of your tests in case a new variant
is added to your application. A feature can be specified by marking a
class with the @Feature annotation.

**Feature1.xtend**

``` java
@Feature
class Feature1 {
}
```

 

**Feature2.xtend**

``` java
@Feature
class Feature2 {
}
```

 

**RestAPIFeature.xtend**

``` java
@Feature
class RestAPIFeature {
}
```

Defining the features of your application allows to mark test steps,
classes or even suites with the @FeatureActivated annotation. The marked
elements are only executed if the specified feature(s) is/are active.

**RestAPITestClass.xtend**

``` java
@TestClass
@FeatureActivated(RestAPIFeature)
class RestAPITestClass {
  ...
}
```

 

**TestClass1.xtend**

``` java
@TestClass
class TestClass1 {

    @Step
    @FeatureActivated(Feature1)
    def void class1Step1() {
        ...
    }
}
```

The FeatureActivated annotation provides also the methods allOf and
anyOf in case you want to define that your tests will be executed only
if all features or at least one of a set of features are active.

``` java
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
features are not active, you can also use the @FeatureNotActivated
annotation. It provides the same methods as the FeatureActivated
annotation.

``` java
@TestClass
@FeatureNotActivated(allOf = #[Feature1, Feature2])
class TestClass3 {
    ...
}
```

If you need to ask for the features in a more fine-grained way (for
instance, you want to access a text field only if a feature is active),
you can use the FeatureCheckService. You can use the service to check
whether a feature is active or not.

The [conditional](Conditional)module of Tapir can help you to implement
more complex and reusable conditions.

**TestClass4.xtend**

``` java
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

If you are using data providers in your tests, you can also enable or
disable parts of the provided data by checking for features. Your data
element classes should implement FeatureBased. The
method getActivateByFeatureExpression() returns an optional
FeatureExpression which can be built by using FeatureExpressionBuilder.
The extension provides methods similar to those of
the FeatureActivated and FeatureNotActivated annotations. In conjunction
with Tapir's Immutables you can delcare your feature based objects like
this:

**DataProviderElement1.xtend**

``` java
@Immutable
class DataProviderElement1 implements FeatureBased{
    int id
}
```

**DataProvider1.xtend**

``` java
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

For types which are not annotated with @Immutable
extending FeatureSpecificDataElement might be an option. This abstract
class implements FeatureBased and provides a getter and a setter for the
feature expression.

# Variants

A variant specification usually acts as a container for a set of
features. A class can be marked as variant specification by using the
Variant annotation.

**StandardEdition.xtend**

``` java
 @Variant(features = #[Feature1])
 class StandardEdition {
 }
```

**ProfessionalEdition.xtend**

``` java
 @Variant(features = #[Feature1, Feature2])
 class ProfessionalEdition {
 }
```


A variant is active, when the value of the property *variant* is the
name of the variant. The name of a variant is the classname, unless you
specify it with the attribute *name* in the annotation. [This
chapter](Externalized_Configuration) explains how to configure
properties. Once a variant is active, all features of the variant are
active.

When developing your test cases, you should focus on features and not on
variants. Using the correct amount of features makes it way easier to
add further variants of your application later.
