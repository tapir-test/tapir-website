---
layout: post
title:  "tapir 3.2.0 released - Open source repository available"
description: "tapir 3.2.0 is released! This provides the opportunity to develop open-source tapir modules."
authors:
    - olibutzki
    - nehmke
permalink: /blog/tapir-3.2.0-released/
comments: true
comments_locked : false
---

We are pleased to announce, that we released Version 3.2.0 of our *tapir* framework today. There are a couple of minor bug fixes and enhancements. Some distinct changes are:

* Dependency updates (e.g. Xtend 2.14.0, Selenium 3.14.0, allure 2.7.0,...)
* Eclipse Setup is updated to the latest Eclipse Photon release and Xtend 2.14.0
* Introduction of tapir-extensions (see below)

You can find the full changelog [here]({{"/docs/tapir-changelog/3.2.0/" | prepend: site.baseurl}}).

## tapir goes open-source!

The most exciting news is that it's possible to develop open-source *tapir* extensions. We set up a dedicated [GitHub repository](https://github.com/tapir-test/tapir-extensions) for this purpose. The modules are developed under the [MIT license](https://github.com/tapir-test/tapir-extensions/blob/master/LICENSE). Everyone is invited to contribute his / her additional *tapir* modules! All the information your need for contributing can be found [here](https://github.com/tapir-test/tapir-extensions/blob/master/CONTRIBUTING.md).

Fortunately the repository does not start empty, but already contains a bunch of great modules:
* JUnit 5: The are pleased to announce the Junit 5 support. It was a long way for JUnit 5 to be released, butit's worth the long waiting. The concepts of JUnit 5 perfectly match the design of *tapir*. Especcially the IDE support has been improved significantly. JUnit 5 is a drop-in-replacement for JUnit4, you just have to adjust one dependency. For more information consult the [docs]({{"/docs/execution/junit5/" | prepend: site.baseurl}}).
* Allure 2: The module supersedes the old module and uses the latest Allure API. The old Allure module is still part of *tapir*, but we highly recommend to switch to Allure 2 as it has a couple of advantages. Like JUnit 5, Allure 2 is a drop-in-replacement, you just have to exchange one dependency. You can find the documentation [here]({{"/docs/reporting/allure2/" | prepend: site.baseurl}}).
* Excel Reporting: Although the Allure reports are informative as well as beautiful, people tend to like Excel sheets. this requirement is covered by the new [Excel reporting module]({{"/docs/reporting/excel/" | prepend: site.baseurl}}).
* Reporting base: The Excel reporting module depends on the new [Reporting Base module]({{"/docs/reporting/reporting-base/" | prepend: site.baseurl}}) which provides the possibility to notify reporting tools after the test execution has been finished. This is helpful for tools like Excel which's files cannot be updated incrementally.
* Excel DataSource: After already supports to externalize data in csv files. With new [Excel DataSource module]({{"/docs/testdata/excel-data-source/" | prepend: site.baseurl}}) it's possible to declare the test data in Excel files.
* Execution GUI: The Execution GUI is an alternative approach to launch *tapir* tests. It is a JavaFX application which visualizes the *tapir* execution plan. You can select the tests you'd like to execute and watch the progress of their execution. For more information consult the [corresponding chapter]({{"/docs/execution/gui/" | prepend: site.baseurl}}) .

The modules are marked in the documentation with this badge: <span class="label label-success">open-source</span>

## New module "wizard"

In the past we provided starter modules which can be used to quick start with *tapir*. This works quite well as long as we assume up-front which modules you might want to use. With the increasing number of (optional) modules it becomes more and more tricky to maintain these starters as, theoretically, we have to cover all the different module combinations.

That's the reason why we introduced a new archetype *tapir-extensions-archetype*. It's a replacement for the *tapir-bootstrap-archetype*. Honestly, describing a Maven archetype as a "wizard" is a little overpraised, but its characteristics are the same. You specify a couple of options and the archetype generates a pre-configured tapir *module* which exactly fits your needs. Please consult the [Archetype chapter]({{"/docs/usingtapir/archetypes/" | prepend: site.baseurl}})] for additional information.
