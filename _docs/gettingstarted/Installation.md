---
title: Installation
permalink: /docs/gettingstarted/installation/
---

# IDE

We recommend to develop the <i>tapir</i> test cases with <a href="https://eclipse.org/">Eclipse 4.6+</a>. Eclipse
is usually shipped with a Maven integration plugin. If such an
integration is missing, you should install one, for instance <a href="http://www.eclipse.org/m2e/">M2Eclipse</a>.
Also, many aspects of <i>tapir</i> are realized by using the Xtend language and
its features. A Xtend plugin in the Version 2.12 is therefore required.
A suitable <a href="https://eclipse.org/xtend/download.html">plugin</a> for Eclipse is provided by the Xtend team. Further IDEs
(for instance IntelliJ IDEA) might provide suitable plugins as well, but
are not explicitly supported.

# Build Systems

You install <i>tapir</i> by including the required dependencies in your
project. A more detailed documentation for Maven and Gradle can be found
<a href="{{ "/docs/usingtapir/buildsystems/" | prepend: site.baseurl }}">here</a>. <i>tapir</i> might work with further build tools and systems, but this is
not specifically supported.
