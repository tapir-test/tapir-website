---
layout: post
title:  "tapir released for publicity"
description: "tapir 3.0.0 is released. tapir is an UI regression test framework which focuses on maintainability and reliability."
authors:
    - olibutzki
    - nehmke
permalink: /blog/tapir-released/
comments: true
comments_locked : false
---
Today, we released *tapir* for publicity!

*tapir* is an UI regression test framework with focus on maintainability and reliability. To get an brief overview of what is *tapir* about take a look at our [website]({{ "/#features" | prepend: site.baseurl }}).

## Mature framework

Our first public release version is 3.0.0, because it has quite a long history in our company.
Three years ago (the first commit is dated 14 April 2015) we started developing a new solution, because our old UI testing framework was no longer being active developed for several years.
Furthermore, the framework did not find a lot of acceptance among our developers and existing UI tests consumed a lot of time to maintain.

We invested a lot of time evaluating existing solutions, but none of them pursued our vision how to develop UI regression tests for complex business applications. Therefore we decided to put our ideas and requirements into an own framework. *tapir* was born.

![Young tapir]({{ "/img/blog/young-tapir.jpg" | prepend: site.baseurl }}){:class="img-responsive"}

Originally only intended for internal usage, *tapir* matured a lot over the time. Because the framework was not publicly available, we had the chance to evolve the API for a long time without the need to be backward-compatible. Nowadays we have a mature production-proven API which is not common for such a young project.

## Comprehensive documentation

What applies to the API also applies to the documentation. We invested a lot of sweat and effort in writing extensive and comprehensive documentation. Beside [Javadoc](https://www.javadoc.io/doc/de.bmiag.tapir/tapir) for every public type and method a [guide]({{ "/docs/gettingstarted/introduction/" | prepend: site.baseurl }}) arised which explains most of the aspects and features of our framework.

We tried to keep the entry barrier as low as possible by distributing our artifacts via Maven Central and by using the Eclipse Installer to setup a development environment for every operation system with just a few clicks. If you want to get started now, visit our compact [Installation Guide]({{ "/docs/gettingstarted/installation/" | prepend: site.baseurl }}).

## Communication

We would like to thank our company [b+m Informatik GmbH](https://www.bminformatik.de/) for giving us the free space in order to get the website and everything else which is needed for a public release into place. In the first run we opened a [Gitter room]({{ "https://gitter.im/" | append: site.gitterroom }}) for support. Alternatively, you can use our contact form or comment on this or any upcoming post.

We plan to blog about *tapir* constantly by announcing new releases or putting specific features into spotlight.

We feel confident that many test teams have the same problems we had three years ago and that *tapir* can help them to get out there without developing another test framework by themselves. Have fun!
