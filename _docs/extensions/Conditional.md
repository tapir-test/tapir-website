---
title: Conditional
description: By using the Conditional module you can skip/execute test suites, cases or steps if certain conditions apply. 
permalink: /docs/extensions/conditional/
---

You might find yourself in situations where you want to execute test
steps, cases or suites depending on complex conditions (for instance,
the annotations of <i>tapir's</i>[variant module]({{"/docs/extensions/variant-management/" | prepend: site.baseurl}}) cannot
describe your condition). Of course you could simply use a plain
*if*-statement. But the test case would still be visible in the test
report, although you don't want it to be executed. For such situations,
<i>tapir</i> provides the conditional module.

# Dependency

``` xml
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-conditional</artifactId>
</dependency>
```

The module gives you the
[Conditional](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/conditional/annotations/Conditional.html) annotation.
This annotation can be used on test steps, test cases and test suites.
The usage of this annotationforces you to implement a method with a
boolean return type which determines whether the annotated element will
be executed or not. The naming convention of the method is similar as
for the
[Parameter](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/annotations/parameter/Parameter.html) and
[IteratedParameter](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/annotations/parameter/IteratedParameter.html) annotations
in the [data provider chapter]({{"/docs/usingtapir/data-provider/" | prepend: site.baseurl}}). There are three
possibilities.

# Unparameterized

If you don't parameterize the annotation, the conditional method is
derived from the test step or the test class and must be provided by the
test class. Annotated steps get a method with the name of the step and
the suffix *Condition*. Annotated test classes get a method with the
name of the test class and the suffix *Condition.*

**MyTestCase.xtend**

``` xtend
@TestClass
@Conditional
class MyTestCase {

    @Step
    @Conditional
    def void step1() {
    }

    override step1Condition() {
        ...
    }

    override myTestCaseCondition() {
        ...
    }

}
```

# Value or method

The name of the conditional method can be specified with the attributes
of the annotation *value* or *method* (which is just an alias for
*value*). This allows also to use the same conditional method for
different classes and steps.

**MyTestCase.xtend**

``` xtend
@TestClass
@Conditional(method="myCondition")
class MyTestCase {

    @Step
    @Conditional("myCondition")
    def void step1() {
    }

    override myCondition() {
        ...
    }

}
```

# conditionalClass

Simmilar to the data provider classes, you can specify conditional
classes which handle the conditions for your test cases. This allows
also to reuse the same conditions through multiple tests. You can use
the attribute *conditionalClass* of the *Conditional* annotation to
specify another conditional class. If you use such external conditional
classes, they must be available in the spring context. It is usually
sufficient, if they are annotated with the *Component* annotation from
Spring.

**MyConditional.xtend**

``` xtend
@Component
class MyConditional {

    def boolean myCondition() {
        ...
    }

}
```

**MyTestCase.xtend**

``` xtend
@TestClass
class MyTestCase {

    @Step
    @Conditional(conditionalClass=MyConditional, method="myCondition")
    def void step1() {
    }

}
```

# Examples
<div class="panel panel-warning">
  <div class="panel-heading">
    <h3 class="panel-title"><span class="fa fa-warning"></span> Warning</h3>
  </div>
  <div class="panel-body">
  For the following example, we assume that you are already familiar with
  data provider in <i>tapir</i>. If you are not sure, you might want to take
  another look at the <a href="{{"/docs/usingtapir/data-provider/" | prepend: site.baseurl}}">chapter</a>.
  </div>
</div>

Let us take a look at some examples. The following test case consists of
two steps. The field *param* is annotated with *IteratedParameter*. As
the method *paramParameter* returns three elements, the whole test case
will be executed thrice. However, *step2* is annotated with
*Conditional*. In this case, the condition says, that *step2* will only
be executed, if *param* is greater than two. This will only be the case
in the third pass of the test case.

**MyTestCase.xtend**

``` xtend
@TestClass
class MyTestCase {

    @IteratedParameter
    private int param

    @Step
    def void step1() {
    }

    @Step
    @Conditional
    def void step2() {
    }

    override paramParameter() {
        #[1, 2, 3]
    }

    override step2Condition() {
        param > 2
    }
}
```

The following image shows the execution in the Eclipse IDE. Note that
*MyTestCase* is indeed executed thrice, but that *step2* cannot be seen
in the first two passes. The condition avoids that *step2* will be seen
in the report in the first place.

![]({{"/img/docs/45940767/45940796.png" | prepend: site.baseurl}}){:width="720px"}

<div class="panel panel-warning">
  <div class="panel-heading">
    <h3 class="panel-title"><span class="fa fa-warning"></span> Warning</h3>
  </div>
  <div class="panel-body">
  For the following example, we assume that you are already familiar with
  the variant management in <i>tapir</i>. If you are not sure, you might want to
  take another look at the <a href="{{"/docs/extensions/variant-management/" | prepend: site.baseurl}}">chapter</a>.
  </div>
</div>

Now let us assume that you have three features in your application:
*Feature1*, *Feature2* and *Feature3*. Now you want to execute your test
step if and only if *Feature1* and *Feature2* are active or *Feature1*
is not active but *Feature3* is active. With the help of the
*Conditional* annotation you can now implement this condition.

**MyTestCase.xtend**

``` xtend
@TestClass
class MyTestCase {

    @Autowired
    extension FeatureCheckService

    @Step
    def void step1() {
    }

    @Step
    @Conditional
    def void step2() {
    }

    override step2Condition() {
        (Feature1.active && Feature2.active) || (!Feature1.active && Feature3.active)
    }

}
```
