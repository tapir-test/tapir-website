---
title: Introducing tapir
permalink: /docs/gettingstarted/introduction/
---

<i>tapir</i> is a framework to develop maintainable GUI tests. It's name is an
acronym for "<i><strong>T</strong>est <strong>API</strong> against <strong>R</strong>egression</i>". Some of its core principles
are:

-   Don‘t reinvent the wheel   
    <i>tapir</i> builds on established open source software, like Spring,
    Selenium, and many more.  
-   Focus on UI regression tests  
    We developed our framework mainly for regression tests on web
    applications. But don't worry. <i>tapir</i> provides enough extension
    points to develop components for fat client applications like Java
    FX or Swing.  
-   Focus on readability, transparency and maintainability  
    Various concepts in <i>tapir</i> help you to achieve those goals.  
-   Technology-neutral formulation of test cases  
    The structure of <i>tapir</i> tests projects make sure that your test cases
    don't have to worry about the underlying UI technology of your
    application.  
-   Modularity  
    <i>tapir</i> itself is splitted into several modules. Every module is a
    functional unit. There are a lot of modules (extensions) which can
    be used optionally.  
-   Interoperablity  
    Because of its modularity <i>tapir</i> can be integrated in your system
    environment flawlessly. There are a couple of adapters which fulfill
    APIs of existing frameworks and tools. If no adapter for your
    framework or your tool is available yet, it's very easy to write one
    by yourself.
