---
title: CSV Data Source
description: Data Source which can provide data from csv files.
permalink: /docs/testdata/csv-data-source/
---

The concept of [Data Sources]({{"/docs/testdata/data-source/" | prepend: site.baseurl}}) is used to provide a convenient way to inject data from csv files.

## Dependency

``` xml
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-datasource-csv</artifactId>
</dependency>
```
## DataSource generation

When using <i>tapir's</i> [immutable data types]({{"/docs/extensions/immutables/" | prepend: site.baseurl}}) you can just annotate the type with [@CsvDataSource](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/datasource/csv/annotations/CsvDataSource.html) in order to generate a corresponding [DataSource](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/datasource/api/DataSource.html).

The generated DataSource assumes that the columns of the csv file correspond to the attribute names of your immutable object.

As csv files are just plain ASCII files every value is just a string and you do not have any type information. tapir uses Spring's [ConversionService](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/core/convert/ConversionService.html) in order to convert from String to any other type. You can add custom converters by implementing [Converter](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/core/convert/converter/Converter.html) and registering the class as Spring bean (e.g. by annotating it with [@Component](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/stereotype/Component.html)).

The following csv file can be converted to a list of users just by adding the <i>CsvDataSource</i> annotation.

users.csv
```
username;password
user1;mysecret
user2;mysafesecret
```

User.xtend
``` xtend
@Immutable
@CsvDataSource
class User {
  String username
  String password
}
```

## Attribute mapping customization

The column headers do not necessarily match the attribute names. By using [@CsvColumn](https://www.javadoc.io/page/de.bmiag.tapir/tapir/latest/de/bmiag/tapir/datasource/csv/annotations/CsvColumn.html) you can map the attribute to any column.

User.xtend
``` xtend
@Immutable
@CsvDataSource
class User {
  @CsvColumn("Name")
  String username
  @CsvColumn("Pass")
  String password
}
```

## More control needed?

*@CsvDataSource* is just a convenience annotation which triggeres a generation process. You could easily implement the DataSource by yourself in order to have more fine-grained control.

It's recommended to extend [AbstractCsvDataSource](https://www.javadoc.io/page/de/bmiag/tapir/datasource/csv/AbstractCsvDataSource.html) for csv data sources.

So this is the data source for the User introcduced before:

UserCsvDataSource.xtend
``` xtend
@Component
class UserCsvDataSource extends AbstractCsvDataSource<User> {
    def User mapDataSet(CSVRecord csvRecord) {
        User.build[
            username = csvRescord.get("Name")
            password = csvRescord.get("Pass")
        ]
    }
}
```

Because of the *@Component* annotation the data source is picked up automatically. whenever you need to convert to other types than String inject and use the [ConversionService](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/core/convert/ConversionService.html).

<div class="panel panel-info">
  <div class="panel-heading">
    <div class="panel-title"><i class="fa fa-external-link" aria-hidden="true"></i> Showcase</div>
  </div>
  <div class="panel-body">
  <ul>
      <li>
          <a href="https://github.com/tapir-test/tapir-showcase/blob/master/wikipedia/src/test/java/de/bmiag/tapir/showcase/wikipedia/test/data/WikipediaContentTableExpectatonCsvDataSource">WikipediaContentTableExpectatonCsvDataSource</a>
      </li>
  </ul>
  </div>
</div>
