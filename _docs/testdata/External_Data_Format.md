---
title: External Data Format
description: Data Sources act as bridge between tapir and arbitrary data formats (e.g. csv, Excel,...).
permalink: /docs/testdata/external-data-format/
---

<i>tapir's</i> [data injection]({{"/docs/testdata/data-injection/" | prepend: site.baseurl}}) capabilities highly encourage you to separate your test code and data. In general the [@Parameter](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/annotations/parameter/Parameter.html) and
[@IteratedParameter](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/annotations/parameter/IteratedParameter.html) annotations do not make any assumptions where you get the data from. You can build the data objects in Java/Xtend or retrieve them from a (external) resource like a csv or Excel file.

For programmers building the objects in Xtend is the most trivial and straightforward way, especially in conjunction with <i>tapir's</i> [immutable data types]({{"/docs/extensions/immutables/" | prepend: site.baseurl}})). This is already covered in the [data injection chapter]({{"/docs/testdata/data-injection/" | prepend: site.baseurl}}).

Building data in a programming language has two major drawbacks:
1. You need to have developer skills in order to define the data
1. Having the data statically in your classpath does not open possibilities to define the data externally.

Therefore it's common practice to use tools like Excel to configure the test data. In order to use this data in your test tool you need to have an adapter which translates the information from your favorite data description format to one your test framework understands.

For this purpose <i>tapir</i> provides the concept of Data Sources. They can retrieve the test data from any input format.

## Data Source
### Dependency

``` xml
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-datasource-api</artifactId>
</dependency>
```

You have to implement [DataSource](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/datasource/api/DataSource.html) in order to provide a data source. It is not recommended to implement the interface directly, but to extend abstract sub-classes like [AbstractDataSource](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/datasource/api/AbstractDataSource.html) or [AbstractCsvDataSource](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/datasource/csv/AbstractCsvDataSource.html).

In general data sources specify which data type they can provide and which input format (selector) they support. Based in this information the [DataProvider](#data-provider) selects a suitable DataSource and calls its *getData* method in order to retrieve the data.

As an example, let us assume we want to load data from a simple text file. The text file contains only key-value-pairs separated with a comma.

```
key-1,value-1
key-2,value-2
key-3,value-3
```

Our implementation for a data source would have the selector type *Resource*, as this is the type the hereafter *@Resource* annotation handles. Our target type is our final test data container *TestData*. As source type we use *String*, as we will iterate over each line of the text file.

``` xtend
@Component
class TestDataSource extends AbstractDataSource<Resource, String, TestData> {
```

We now have to define the precise selector type and the *canHandle* method. As multiple data sources might be able to handle *Resources*, we have to check whether we are responsible for the specific instance of *Resource*. In our example, we check for the *txt* extension of the file.

``` xtend
  override canHandle(Resource resource) {
    FilenameUtils.getExtension(resource.getFilename()).equalsIgnoreCase("txt")
  }

  override getSelectorType() {
    Resource
  }
```

Next, we implement *getIterator*. This method converts the instance of the selector type (in this case a *Resource*) into the source type (in this case *String*). It is important that the *getIterator* method groups contents of the selector instance if necessary, as each element of the iterable has to be mapped to exactly one instance of the target type. If you need more control, you should implement *DataSource* directly. In our example we will read the content of the resource and provide the single lines with the iterator.

``` xtend
  override protected getIterator(Resource resource) {
    IOUtils.readLines(resource.inputStream, 'UTF-8').iterator
  }
```

Finally we have to map an instance of *String* to an instance of *TestData*.

``` xtend
  override protected mapDataSet(String dataset) {
    val token = dataset.split(',')
    TestData.build [
      key = token.get(0)
      value = token.get(1)
    ]
  }
}
```

## Data Provider
The [DataProvider](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/datasource/api/DataProvider.html) can be queried to retrieve some data in your tests. The *DataProvider* consults the registers data sources, picks up one that can handle the request and returns the result.

You just have to inject the *DataProvider* and call its *getData* method by passing the expected type and a selector (for csv files it is a [Resource](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/core/io/Resource.html)).

As our example datasource is a bean in the Spring context, we can now use the *DataProvider* to read our text files. The *DataProvider* will use the requested selector type and the concrete selector to find a suitable datasource.

``` xtend
val resource = resourceLoader.getResource("testdata.txt")
dataProvider.getData(Resource.class, resource)
```

## Retrieving resource data

``` xml
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-datasource-resource</artifactId>
</dependency>
```
For retrieving resource data in a convenient way, tapir offers the [@Resource annotation](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/datasource/resource/annotations/Resource.html). You can add this annotation to any field or step parameter which is annotated by [@Parameter](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/annotations/parameter/Parameter.html) or
[@IteratedParameter](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/execution/annotations/parameter/IteratedParameter.html). By using the *Resource* annotation you do not have to implement the provider method by yourself, but it's completely generated by <i>tapir</i>.

For our above example, one could now retrieve the test data with the following code.

``` xtend
@IteratedParameter
@Resource('testdata.txt')
TestData testData
```

You can find a more complete example in our show case.

<div class="panel panel-info">
  <div class="panel-heading">
    <div class="panel-title"><i class="fa fa-external-link" aria-hidden="true"></i> Showcase</div>
  </div>
  <div class="panel-body">
  <ul>
      <li>
          <a href="https://github.com/tapir-test/tapir-showcase/blob/master/google/google-systemtest/src/test/java/de/bmiag/tapir/showcase/google/systemtest/GoogleSuggestSystemTest.xtend">GoogleSuggestSystemTest</a>
      </li>
  </ul>
  </div>
</div>

This is just a convenience annotation. Of course you can still implement the provider method by yourself. If you would like to access classpath resources inject and use the [ResourceLoader](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/core/io/ResourceLoader.html).

You can find an example in our show case.

<div class="panel panel-info">
  <div class="panel-heading">
    <div class="panel-title"><i class="fa fa-external-link" aria-hidden="true"></i> Showcase</div>
  </div>
  <div class="panel-body">
  <ul>
      <li>
          <a href="https://github.com/tapir-test/tapir-showcase/blob/master/wikipedia/src/test/java/de/bmiag/tapir/showcase/wikipedia/test/WikipediaContentTableTest.xtend">WikipediaContentTableTest</a>
      </li>
  </ul>
  </div>
</div>
