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
3.  Leave the defaults of the first wizard page by clicking *Next &gt;  
    *
4.  Select one of the <i>tapir</i> archetypes:  
    ![](img/docs/47218729/47218725.png){height="400"}
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
> mvn archetype:generate -DarchetypeGroupId=de.bmiag.tapir -DarchetypeArtifactId={desired-tapir-archetype} -DarchetypeVersion=2.0.0
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

## tapir-module-archetype

This archetype can be used for arbitrary <i>tapir</i> modules. It provides a
basic @ModuleConfiguration annotated class and inherits
from tapir-starter-module which provides a couple of presets.

### Properties

| Property               | Description                                                                     |
|------------------------|---------------------------------------------------------------------------------|
| moduleName             | The name of the module which has to fulfill this pattern: \[A-Z\]\[A-Za-z0-9\]+ |
| autoConfigurationOrder | The AutoConfigurationOrder. The default value is 0.                             |

## tapir-bootstrap-archetype

This archteype can be used for <i>tapir</i> bootstrap modules. The modules
inherits from *tapir-starter-selenium-allure*. It provides a
basic [@BootstrapConfiguration](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/bootstrap/annotation/BootstrapConfiguration.html)
annotated class and an executable test based on the Google website.

### Properties

| Property   | Description                                                                     |
|------------|---------------------------------------------------------------------------------|
| moduleName | The name of the module which has to fulfill this pattern: \[A-Z\]\[A-Za-z0-9\]+ |

## Attachments:

![](images/icons/bullet_blue.gif){width="8" height="8"} [image2017-6-9
14:23:50.png](img/docs/47218729/47218725.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2017-6-9
14:24:46.png](img/docs/47218729/47218726.png) (image/png)  
