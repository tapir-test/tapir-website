---
title: Configuration Management
description: Applications under Test behave differently based on their configuration. With this module your tests are ware of these variations.
permalink: /docs/controlflow/configuration-management/
redirect_from:
 - /docs/extensions/configuration-management/
---

In the previous chapter about [variant management]({{"/docs/extensions/variant-management/" | prepend: site.baseurl}}),
we showed you how to execute test code depending on specific
[Features](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/variant/feature/Feature.html)
and
[Variants](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/variant/annotation/variant/Variant.html).
You are now able to test the variants of your software. However, you
might encounter situations in which you want to test your software also
in different configurations. Let us assume that your software provides
the possibility to configure the control steps between two eye and four
eye principle. Now you want to run all your tests with a two eye
configuration of your software and at some other time with a four eye
configuration. <i>tapir's</i> *configuration* module provides you with the
possibility to deposit default configurations which can be different for
different configuration variants.

``` xml
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-configuration</artifactId>
</dependency>
```

## Configuration

A single configuration is a container for a data value. You specify such
a class by marking it with the annotation
[@Configuration](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/configuration/annotation/configuration/Configuration.html).
You specify the type of the data container by parameterizing the
annotation and you have to provide a default value for the
configuration. The following example shows a configuration for an
Integer value.

**Configuration1.xtend**

``` java
@Configuration(Integer)
class Configuration1 {

    override defaultValue() {
        1
    }

}
```

Some types cannot be specified in the annotation, especially when you
use generics. You can therefore also specify a field named
*valueType* which declares the type. Following example shows a
configuration for a *List* of *Integer*.

**Configuration2.xtend**

``` java
@Configuration
class Configuration2 {

    List<Integer> valueType

    override defaultValue() {
        #[1]
    }  

}
```

In order to get the actual value of a configuration, you use the
[ConfigurationValueService](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/configuration/service/ConfigurationValueService.html).
You can inject this service into your test case and retrieve the value.
The following excerpt shows how to use the service as an extension in
order to access the value of *Configuration1*.

**TestClass1.xtend**

``` java
@TestClass
@UseExtension(ConfigurationValueService)
class TestClass1 {

    @Step
    def void step1() {
        if (Configuration1.value >= 2) {
            ...
        }
        ...
    }
}
```

## ConfigurationVariant

Now we know how to create configurations with a default value. But how
do we actually create a variant of this configuration? We do this by
annotating a class with
[@ConfigurationVariant](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/configuration/annotation/variant/ConfigurationVariant.html).
The annotation is parameterized with the configurations it overwrites.
The following example shows a variant which overwrites the default
values of *Configuration1* and *Configuration2* and a second variant
which uses just the default values.

**Variant1.xtend**

``` java
@ConfigurationVariant(configurations=#[Configuration1, Configuration2])
class Variant1 {

    override configuration1Value(Integer defaultValue) {
        2
    }      

    override configuration2Value(List<Integer> defaultValue) {
        #[2]
    }

}
```

**Variant2.xtend**

``` java
@ConfigurationVariant
class Variant2 {

}
```

Depending on which of those configuration variants is active, the
*ConfigurationValueService* delivers the corresponding value. If
*Variant1* is active, the service returns 2 for *Configuration1*. If
*Variant2* is active, the service returns 1. A configuration variant is
active, when the value of the property *configurationVariant* is the
name of the variant. The name of a variant is the classname, unless you
specify it with the attribute *name* in the annotation. [This
chapter]({{"/docs/usingtapir/externalized-configuration/" | prepend: site.baseurl}}) explains how to configure
properties.

 
