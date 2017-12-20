---
title: Data Provider
description: By using Data Providers you can specify your test data externally (Excel, database, REST-API,...).
permalink: /docs/usingtapir/data-provider/
---

Separating your tests from the test data helps to increase
maintainability. It is even possible that developers can add further
data to the tests without having actually to worry about how the tests
work. The <i>tapir</i> Execution module comes with two annotations to help you
with this task.

``` xml
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-execution</artifactId>
</dependency>
```

The annotations are
[@Parameter](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/annotations/parameter/Parameter.html) and
[@IteratedParameter](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/annotations/parameter/IteratedParameter.html).
They can be used to inject data into your test cases.

# Parameter

You can use the *Parameter* annotation to annotate fields or parameters
of steps in your test classes.

``` xtend
@TestClass
class MyTestCase {

    @Parameter
    String param

    @Step
    def void step1(@Parameter int param1, @Parameter int param2) {
    }

    ...
}
```

The parametrization of the annotation itself determines which method
provides the data. There are three possibilities, which are detailed
below. In each case, the method's return type has to be compatible with
the annotated parameter or field. The provider method for *param* must
return a *String* and the provider methods for *param1* and *param2*
must return an *int*.

## Unparameterized

If you don't parameterize the annotation, the data provider method is
derived from the test step, the field and the parameter and must be
provided by the test class. In the above example, you would have to
implement three methods. Annotated fields get a method with the name of
the field and the suffix *Parameter*. Annotated parameters get a method
with the name of the test step and the parameter name with the suffix
*Parameter*.

``` xtend
@TestClass
class MyTestCase {

    @Parameter
    String param

    @Step
    def void step1(@Parameter int param1, @Parameter int param2) {
    }

    override paramParameter() {
        ...
    }

    override step1Param1Parameter() {
        ...
    }

    override step1Param2Parameter() {
        ...
    }
}
```

## Value or method

The name of the provider method can be specified with the attributes of
the annotation *value* or *method* (which is just an alias for *value*).
This allows also to use the same provider method for different
parameters and fields.

``` xtend
@TestClass
class MyTestCase {

    @Parameter("providerMethod")
    String param

    @Step
    def void step1(@Parameter(method = "providerMethod") int param1) {
    }

    override providerMethod() {
        ...
    }

}
```

## providerClass

Although the two methods above give you already an approach to separate
the test data and the test cases, it might be a good idea to separate
them even further. We suggest to write dedicated data provider classes,
which are only responsible for delivering the data for your test cases.
This allows also to reuse the same data through multiple tests. You can
use the attribute *providerClass* of the *Parameter* annotation to
specify another provider class. If you use such external data provider
classes, they must be available in the Spring context. It is usually
sufficient to annoatate them with Spring's *Component* annotation.

``` xtend
@Component
class MyDataProvider {

    def String providerMethod() {
        ..    
    }

    def int step1Param1Parameter () {
        ..
    }

}

@TestClass
class MyTestCase {

    @Parameter(providerClass=MyDataProvider, method="providerMethod")
    String param

    @Step
    def void step1(@Parameter(providerClass=MyDataProvider) int param1) {
    }

}
```

# IteratedParameter

For some tests you don't want to provide a single data entry, but rather
a whole collection. The
[@IteratedParameter](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/annotations/parameter/IteratedParameter.html) annotation
works similar to the *Parameter* annotation, but it repeats test steps
or even whole test classes for each element of the returned *Iterable*.
This is why the test provider methods must return a compatible
collection. For instance, if the annotated field is of the type
*String*, then the provider method must return *Iterable&lt;String&gt;*.

Let us take a look at an example. The snippet below defined a test case
with three test steps. The second step has a parameter annotated with
*IteratedParameter* and the corresponding provider method returns three
entries.

``` xtend
@TestClass
class MyTestCase {

    @Step
    def void step1() {
    }

    @Step
    def void step2(@IteratedParameter int param1) {
    }

    @Step
    def void step3() {
    }

    override step2Param1Parameter() {
        #[42, 100, 50]
    }

}
```

In this scenario, *step1* is executed first. Then, *step2* is executed
for each element in the returned Iterable. This means that *step2* is
executed three times. Subsequently, *step3* is executed. The following
image shows you how the test execution looks in Eclipse. Note that the
parameters of the steps are shown in brackets.

![]({{"/img/docs/44564532/45940746.png" | prepend: site.baseurl}}){:height="199px" width="600px"}

Now, what happens when you annotate more than one parameter of the same
test step? The answer is, that <i>tapir</i> will execute the test step with all
possible combinations by using the cartesian product.

``` xtend
@TestClass
class MyTestCase {

    @Step
    def void step1() {
    }

    @Step
    def void step2(@IteratedParameter int param1, @IteratedParameter String param2) {
    }

    @Step
    def void step3() {
    }

    override step2Param1Parameter() {
        #[42, 100, 50]
    }

    override step2Param2Parameter() {
        #['A', 'B', 'C']
    }

}
```

This time *step2* is executed nine times. The following image shows the
complete execution in Eclipse.

![]({{"/img/docs/44564532/45940747.png" | prepend: site.baseurl}}){:height="316px" width="600px"}

So far we used the annotation only on step parameters. However, it is
also possible to annotate fields. In this case the whole test class is
executed for each element of the provided *Iterable*. The following
example consists of three test steps, but only the field of the test
class is annotated.

``` xtend
@TestClass
class MyTestCase {

    @IteratedParameter
    int param

    @Step
    def void step1() {
    }

    @Step
    def void step2() {
    }

    @Step
    def void step3() {
    }

    override paramParameter() {
        #[42, 100, 50]
    }

}
```

As the *paramParameter* method provides an *Iterable* with three
elements, the test class *MyTestCase* is executed three times. The
following image from the Eclipse IDE shows the execution.

![]({{"/img/docs/44564532/45940753.png" | prepend: site.baseurl}}){:height="336px" width="600px"}

It is also possible to combine annotations on fields and parameters. The
following example demonstrates this. It consists of a field, which is
annotated with *IteratedParameter* and three steps. Two of these steps
have a parameter which is annotated with *IteratedParameter* as well.

``` xtend
@TestClass
class MyTestCase {

    @IteratedParameter
    int param

    @Step
    def void step1(@IteratedParameter int param1) {
    }

    @Step
    def void step2(@IteratedParameter int param1) {
    }

    @Step
    def void step3() {
    }

    override paramParameter() {
        #[1, 2]
    }

    override step1Param1Parameter() {
        #[3, 4]
    }

    override step2Param1Parameter() {
        #[5, 6]
    }

}
```

The following image shows the complete test execution in Eclipse.

![]({{"/img/docs/44564532/45940756.png" | prepend: site.baseurl}}){:height="328px" width="600px"}

<div class="panel panel-warning">
  <div class="panel-heading">
    <h3 class="panel-title"><span class="fa fa-warning"></span> Warning</h3>
  </div>
  <div class="panel-body">
  With the help of the annotation <i>IterableParameter</i> you can allow
  developers or business experts to add tests simply by adding further
  test data. However, as the test execution is based on the cartesian
  product if you use more than one parameter, the number of tests can grow
  very fast if you are not careful.
  </div>
</div>

<div class="panel panel-info">
  <div class="panel-heading">
    <h3 class="panel-title"><span class="fa fa-info-circle"></span> Showcase</h3>
  </div>
  <div class="panel-body">
  <i>IteratedParameter</i> is used by
  <i>de.bmiag.tapir.showcase.test.WikipediaContentTableTest.wikipediaContentTableExpectaton</i>
  and
  <i>de.bmiag.tapir.showcase.test.WikipediaContentTableTest.assertContentTableEntry(ContentElementExpectation)</i>.
  The parameter value of <i>wikipediaContentTableExpectaton</i> is injected by
  the external data provider
  <i>de.bmiag.tapir.showcase.test.data.ContentTableTestDataProvider.</i>
  </div>
</div>
