---
title: Archetypes
permalink: /docs/usingtapir/archetypes/
---

<i>tapir</i> provides Maven Archetypes in order to setup modules in no time.
You can either run the archetypes from Eclipse or from command-line.

# Using an archetype

## Eclipse

Eclipse's Maven integration [m2e](http://www.eclipse.org/m2e/) provides
a wizard to creates modules based on Maven archetypes.

1.  Select *File* \| *New* \| *Project ...*
2.  Select *Maven* \| *Maven Project* and click *Next &gt;*
3.  Leave the defaults of the first wizard page by clicking *Next &gt;*
4.  Select one of the <i>tapir</i> archetypes:  
    ![]({{ "/img/docs/47218729/47218725.png" | prepend: site.baseurl }}){:height="400px" width="473px"}
5.  Provide some Maven properties:

    -   groupId: The GroupId of your module

    -   artifactId: The ArtifactId of your module

    -   version: The version of module

    -   package: The base package of module

    -   Custom properties which depend on the archetype you select

6.  After clicking Finish the module is available in your workspace as
    an Eclipse project

## Command line

``` text
> mvn archetype:generate -DarchetypeGroupId=de.bmiag.tapir -DarchetypeArtifactId={desired-tapir-archetype} -DarchetypeVersion=3.0.0
```

Maven asks you to enter some Maven properties:

-   groupId: The GroupId of your module
-   artifactId: The ArtifactId of your module
-   version: The version of module
-   package: The base package of module
-   Custom properties which depend on the archetype you select

After confirming the properties the new Maven module is generated into a
subfolder which is named like your artifactId.

# Predefined archetypes

## tapir-module-archetype {#Archetypes-tapir-module-archetype}

This archetype can be used for arbitrary <i>tapir</i> modules. It provides a
basic [@ModuleConfiguration](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/bootstrap/annotation/ModuleConfiguration.html) annotated class and inherits
from tapir-starter-module which provides a couple of [presets]({{ "/docs/usingtapir/buildsystems#BuildSystems-Maven" | prepend: site.baseurl }}).

### Properties

| Property               | Description                                                                     |
|------------------------|---------------------------------------------------------------------------------|
| moduleName             | The name of the module which has to fulfill this pattern: \[A-Z\]\[A-Za-z0-9\]+ |
| autoConfigurationOrder | The AutoConfigurationOrder. The default value is 0.                             |

## tapir-bootstrap-archetype {#Archetypes-tapir-bootstrap-archetype}

This archteype can be used for <i>tapir</i> bootstrap modules. The modules
inherits from *tapir-starter-selenium-allure*. It provides a
basic [@BootstrapConfiguration](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/bootstrap/annotation/BootstrapConfiguration.html)
annotated class and an executable test based on the Google website.

### Properties

| Property   | Description                                                                     |
|------------|---------------------------------------------------------------------------------|
| moduleName | The name of the module which has to fulfill this pattern: \[A-Z\]\[A-Za-z0-9\]+ |
