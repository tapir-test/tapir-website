---
title: Execution Filter
permalink: /docs/customization/executionfilter/
---

Before <i>tapir</i> starts the test cases, a execution plan is assembled by
the
[TapirExecutor](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/TapirExecutor.html). This
is also described in the chapter [How does it work?]({{"/docs/usingtapir/how-does-it-work/" | prepend: site.baseurl}}).
Before the plan is actually executed, various filters can decide whether
steps, classes or suites should be filtered out. This is especially
useful when you want to make sure that specific elements are not
executed and are not even visible in the test report in the first place.

``` xml
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-execution</artifactId>
</dependency>
```

As you might remember, some previous features of <i>tapir</i> were able to
remove elements from the execution plan: The
[@FeatureActivated](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/variant/annotation/feature/FeatureActivated.html)annotation
from the [variant management chapter]({{"/docs/extensions/variant-management/" | prepend: site.baseurl}}), the
[@Conditional](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/conditional/annotations/Conditional.html)annotation
from the [conditional chapter]({{"/docs/extensions/conditional/" | prepend: site.baseurl}}) and so on. Well, they all
use the same mechanism as described in this chapter.

In order to filter elements out, you have to create a class which
implements the interface
[ExecutionFilter](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/plan/ExecutionFilter.html).
Also Spring must be aware of your component. A very simple filter (which
does not filter out anything) would look like the following.

**MyExecutionFilter.xtend**

``` xtend
@Component
class MyExecutionFilter implements ExecutionFilter {

    override shouldFilterSuite(TestSuite testSuite, Object testInstance) {
        false
    }

    override shouldFilterClass(TestClass testClass, Object testInstance) {
        false
    }

    override shouldFilterStep(TestStep testStep, Object testInstance) {
        false
    }
}
```

For each of the three test elements (test suites, test classes and test
steps), the filter can decide whether the element should be removed from
the test plan or not. For this purpose, the filter gets the
corresponding model element and the concrete test instance. Now you can
probably imagine how the *Conditional* filtering is actually
implemented. The
[ConditionalFilter](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/conditional/filter/ConditionalFilter.html)
searches for an *Conditional* annotation at the respective element,
retrieves the conditional provider, as well as the conditional method
and invokes it. If the method returns *false*, the element is filtered
out. The other listeners in <i>tapir</i>, the
[FeatureActivatedAnnotationFilter](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/variant/filter/FeatureActivatedAnnotationFilter.html)and
the
[FeatureBasedParameterFilter](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/variant/filter/FeatureBasedParameterFilter.html),
work in a similar manner.

<div class="panel panel-warning">
  <div class="panel-heading">
    <h3 class="panel-title"><span class="fa fa-warning"></span> Warning</h3>
  </div>
  <div class="panel-body">
  Keep in mind that you cannot "unfilter" an element. If at least one
  registered filter wants to filter an element out, it is removed from the
  execution plan.
  </div>
</div>
