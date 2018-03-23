---
title: License
description: This chapter explains how to integrate your license in tapir.
permalink: /docs/gettingstarted/license/
---

The community license is contained in the <i>tapir</i> libraries and has not
to be specified in any way. It is always used if no other license is
found. If you have an own license, you can simply use it by adding it to
your classpath root. For instance, add your *tapir.license* file into
your *src/test/resources* folder for default Maven projects. You can
also specify the license with the system property *tapirLicenseFile*.

```
-DtapirLicenseFile=/home/tapir/tapir.license
```

<div class="panel panel-info">
  <div class="panel-heading">
    <div class="panel-title"><span class="fas fa-info-circle"></span> Using a license for multiple test projects</div>
  </div>
  <div class="panel-body">
  If you want to provide multiple test projects with the same license, you
  should consider creating a new JAR file containing the <i>tapir.license</i>
  file. Your test projects can then use this JAR as dependency and <i>tapir</i>
  finds the license file automatically.
  </div>
</div>
