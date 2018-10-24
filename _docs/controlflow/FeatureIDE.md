---
title: FeatureIDE
description: A module supporting the FeatureIDE plugin for Eclipse.
permalink: /docs/controlflow/feature-ide/
tapir-extensions-module: tapir-extensions-feature-ide
---

The [FeatureIDE](https://featureide.github.io/) project allows to create both feature model files as well as variant configuration files with an Eclipse plugin. With this module we support the *FeatureIDE* files and allow to generate the features and the variants for usage in *tapir*.

## Dependency

``` xml
<dependency>
  <groupId>io.tapir-test</groupId>
  <artifactId>tapir-extensions-feature-ide</artifactId>
  <version>{{site.latesttapirextensionsversion}}</version>
</dependency>
```

<div class="panel panel-warning">
  <div class="panel-heading">
    <div class="panel-title"><span class="fas fa-exclamation-circle"></span> Caution</div>
  </div>
  <div class="panel-body">
  Although the <i>FeatureIDE</i> extension is open-source, it requires the product line testing modules of <i>tapir</i> which are not part of the non-commercial licenses.
  </div>
</div>

## Features

To generate the features from your feature model file, you can use the dynamic active annotation [FeatureIDEFeatures](https://www.javadoc.io/page/io.tapir-test/tapir-extensions-feature-ide/latest/io/tapirtest/featureide/annotation/FeatureIDEFeatures.html). Provide the path to your model file and the annotation will generate all features in it except the abstract ones.

``` xtend
@FeatureIDEFeatures('/model.xml')
class Features {  
}
```

Per default the features get the suffixes *Feature*. You can change the prefixes and the suffixes of your features with the annotation properties *prefix* and *suffix*.

``` xtend
@FeatureIDEFeatures(value='/model.xml', prefix='MyPrefix', suffix='MySuffix')
class Features {  
}
```

As with all of *tapir's* dynamic active annotations you can implement an own annotation processor if you need even more control. The default annotation processor is [FeatureIDEFeaturesProcessor](https://www.javadoc.io/page/io.tapir-test/tapir-extensions-feature-ide/latest/io/tapirtest/featureide/annotation/FeatureIDEFeaturesProcessor.html) with an order of -10000.

<div class="panel panel-warning">
  <div class="panel-heading">
    <div class="panel-title"><span class="fas fa-exclamation-circle"></span> Caution</div>
  </div>
  <div class="panel-body">
  For technical reasons it is currently recommended to put the model files into the same source folder as the annotated class (e.g. <i>src/main/java</i>). Otherwise the annotation is not able to find the files during the build process.
  </div>
</div>

## Variants

To generate a variant from your variant configuration file, you can use the dynamic active annotation [FeatureIDEVariant](https://www.javadoc.io/page/io.tapir-test/tapir-extensions-feature-ide/latest/io/tapirtest/featureide/annotation/FeatureIDEVariant.html). Provide the path to your configuration file and the annotated class will be turned into a variant. All selected features are added to the variant.

``` xtend
@FeatureIDEVariant('/variant1.xml')
class Variant1 {  
}
```

Per default the annotation assumes that the features are contained in the same package as the variant and that all features have the suffix *Feature*. You can change this behavior using the annotation properties.

``` xtend
@FeatureIDEVariant(value='/variant1.xml', prefix='MyPrefix', suffix='MySuffix', featuresPackage="my.features")
class Variant1 {  
}
```

As with all of *tapir's* dynamic active annotations you can implement an own annotation processor if you need even more control. The default annotation processor is [FeatureIDEVariantProcessor](https://www.javadoc.io/page/io.tapir-test/tapir-extensions-feature-ide/latest/io/tapirtest/featureide/annotation/FeatureIDEVariantProcessor.html) with an order of -10000.
