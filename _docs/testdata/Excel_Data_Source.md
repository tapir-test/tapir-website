---
title: Excel Data Source
description: Data Source which can provide data from Excel files.
permalink: /docs/testdata/excel-data-source/
tapir-extensions-module: tapir-extensions-datasource-excel
---

<div class="panel panel-warning">
  <div class="panel-heading">
    <div class="panel-title"><span class="fas fa-exclamation-circle"></span> Caution</div>
  </div>
  <div class="panel-body">
  Note that this module uses the Apache Poi library, which means that the licenses of Apache Poi apply, when you use them.
  </div>
</div>

The *tapir extensions* Datasource Excel module is an adapter for *tapir*'s datasource module. It allows you to fill your test data containers with data from Excel files. It works similar as the official CSV datasource module. To use it, you simply need to add it as Maven dependency.

## Dependency

``` xml
<dependency>
  <groupId>io.tapir-test</groupId>
  <artifactId>tapir-extensions-datasource-excel</artifactId>
  <version>{{site.latesttapirextensionsversion}}</version>
</dependency>
```

## Usage

You can simply extend AbstractExcelDataSource if you need full control over the conversion from the excel row to your data type.

``` xtend
@Component
class UserExcelDataSource extends AbstractExcelDataSource<User> {

	override protected mapDataSet(ExcelRecord excelRecord) {
		...
	}

}
```

Now you can put the Excel file in your test classpath and inject the content into your test class with *tapir*'s Resource annotation.

``` xtend
@Resource('user.xlsx')
User user
```

That's it. As the *UserExcelDataSource* is in the Spring context, it is automatically used by *tapir* to fill the user field with the content of the *user.xlsx* file. Note that currently only the first sheet of the Excel file is used. Furthermore, the first row of the excel sheet must contain the header names, which you can use to access the columns via the *ExcelRecord* class.

The *tapir extensions* Datasource Excel module comes also with a useful dynamic annotation, which generates a default data source implementation for you. It works like the *CSVDatasource* annotation from *tapir*.

``` xtend
@ExcelDataSource
@Immutable
class User {

	String username
	Optional<String> password

}
```

Now *tapir extensions* will generate the *UserExcelDataSource* for you and maps the columns of the Excel file to the fields. In order for this to work, the headers in the Excel sheet must be named like the fields (username and password in this case). If that is not possible, you can also use the *ExcelColumn* annotation to override the default mapping.

``` xtend
@ExcelDataSource
@Immutable
class User {

	@ExcelColumn('user')
	String username

	@ExcelColumn('pass')
	Optional<String> password

}
```

In this case the header names in the Excel sheet must be *user* and *pass*.

The conversion from the excel cells to the field types is performed with Spring's ConversionService. The cell's content is read as String and converted with the conversion service. This allows you to tap into the conversion by overriding the binding of this bean. However, the string representation of the Excel cell might not always be usable for the conversion service, especially when it comes to dates and such. In those cases it is recommended to either implement your own datasource or to force Excel to interpret the content of the cell as text by using a leading apostrophe.
