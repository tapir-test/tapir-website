---
title: License
permalink: /docs/gettingstarted/license/
---

# Types of Licenses

Tapir knows three different types of licenses: Evaluation, Community,
and Enterprise. The evaluation edition license is shipped with Tapir. If
you are interested in the community or the enterprise edition, please
contact us.

|                                              |                            Evaluation-Edition                           |                            Community-Edition                            |                           Enterprise-Edition                          |
|----------------------------------------------|:-----------------------------------------------------------------------:|:-----------------------------------------------------------------------:|:---------------------------------------------------------------------:|
| Maximal number of page objects               |                                    3                                    |                                 Infinity                                |                                Infinity                               |
| Maximal number of test cases                 |                                    5                                    |                                 Infinity                                |                                Infinity                               |
| Maximal number of elements per data provider |                                    5                                    |                                 Infinity                                |                                Infinity                               |
| Productline testing                          | ![(error)](images/icons/emoticons/error.png){.emoticon .emoticon-cross} | ![(error)](images/icons/emoticons/error.png){.emoticon .emoticon-cross} | ![(tick)](images/icons/emoticons/check.png){.emoticon .emoticon-tick} |
| Parallel execution                           | ![(error)](images/icons/emoticons/error.png){.emoticon .emoticon-cross} | ![(error)](images/icons/emoticons/error.png){.emoticon .emoticon-cross} | ![(tick)](images/icons/emoticons/check.png){.emoticon .emoticon-tick} |
| Price                                        |                                   Free                                  |                      Free for non-enterprise users                      |                              Upon request                             |

# Specifying the License during Execution

The evaluation license is contained in the Tapir libraries and has not
to be specified in any way. It is always used if no other license is
found. If you have an own license, you can simply use it by adding it to
your classpath root. For instance, add your *tapir.license* file into
your *src/test/resources* folder for default Maven projects. You can
also specify the license with the system property *tapirLicenseFile*.

``` powershell
-DtapirLicenseFile=/home/tapir/tapir.license
```

Using a license for multiple test projects

If you want to provide multiple test projects with the same license, you
should consider creating a new JAR file containing the *tapir.license*
file. Your test projects can then use this JAR as dependency and Tapir
finds the license file automatically.
