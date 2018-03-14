---
title: rapit
description: The rapit project contains some unofficial extensions for tapir.
permalink: /docs/thirdpartyextensions/rapit/
---

The rapit project contains various unofficial extensions for the tapir Test framework. The project is located at [GitHub](https://github.com/nils-christian/rapit), where you can also find more detailed information.

## License

The rapit project is licensed under the MIT license. Note that third party libraries, which are added as transitive dependencies, may have further and other licenses.

## Modules

### rapit Datasource Excel

The rapit Datasource Excel module is an adapter for <i>tapir</i>'s datasource module. It allows you to fill your test data containers with data from Excel files. It works similar as the official [CSV datasource module]({{"/docs/testdata/csv-data-source/" | prepend: site.baseurl}}).

``` xml
<dependency>
	<groupId>de.rhocas.rapit</groupId>
	<artifactId>rapit-datasource-excel</artifactId>
	<version>1.0.0</version>
</dependency>
```

### rapit Reporting Base

This module contains an implementation of <i>tapir</i>'s execution listener, which can be used as a base for concrete reporting classes.

``` xml
<dependency>
	<groupId>de.rhocas.rapit</groupId>
	<artifactId>rapit-reporting-base</artifactId>
	<version>1.0.0</version>
</dependency>
```

### rapit Excel Reporting

This module contains a reporting listener which writes an Excel report about the test execution.

``` xml
<dependency>
	<groupId>de.rhocas.rapit</groupId>
	<artifactId>rapit-reporting-excel</artifactId>
	<version>1.0.0</version>
</dependency>
```
