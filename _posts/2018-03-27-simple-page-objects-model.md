---
layout: post
title:  "The Simple Page Object Model"
description: "About the simplicity of Page Objects and how you could overcome their drawbacks."
authors:
    - olibutzki
permalink: /blog/simple-page-objects-model/
comments: true
comments_locked : false
---

I recently stumbled upon a tweet by [gauge](https://gauge.org/), a test automation tool/framework, sponsored by ThoughtWorks Inc:
<blockquote class="twitter-tweet" data-lang="de"><p lang="en" dir="ltr">In our opinion, <a href="https://twitter.com/hashtag/pageobjects?src=hash&amp;ref_src=twsrc%5Etfw">#pageobjects</a> are an anti-pattern and counterproductive. It <br>❌ designs UI elements for reuse violating the YAGNI principle<br>❌ can be huge and difficult to maintain<br>❌ groups by page(s) rather than intent</p>&mdash; Gauge (@getgauge) <a href="https://twitter.com/getgauge/status/975261271670099968?ref_src=twsrc%5Etfw">18. März 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

The Page Object Model (POM) is very wide-spread and a common pattern in the UI test automation world. Therefore this statement is provoking and awakened my interest which was pretty sure the intention of this tweet. Fortunately I found a [blog post by Soumya Swaroop](https://blog.getgauge.io/are-page-objects-anti-pattern-21b6e337880f) which explains how gauge comes to the conclusion that Page Objects are an anti-pattern.

<blockquote class="twitter-tweet" data-cards="hidden" data-lang="en"><p lang="en" dir="ltr">Are <a href="https://twitter.com/hashtag/pageobjects?src=hash&amp;ref_src=twsrc%5Etfw">#pageobjects</a> an anti-pattern? We think so! <a href="https://t.co/IfPCjM2vgm">https://t.co/IfPCjM2vgm</a> <a href="https://t.co/lD7bM1zWBd">pic.twitter.com/lD7bM1zWBd</a></p>&mdash; Gauge (@getgauge) <a href="https://twitter.com/getgauge/status/894503233443561472?ref_src=twsrc%5Etfw">August 7, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


It's not necessary to read this post prior to this post, but I highly recommend it as it's a very good read. I like the idea of checking common clean code principles against the test framework architecture. That's the reason why I do almost the same and although I agree in nearly all the mentioned design principle violations my conclusion differs fundamentally.

## Clear a Page Object's responsibility
Soumya states that Page Objects break the YAGNI (You aren't gonna need it), SRP (Single-Reponsibility) and OCP (Open/Closed) priniciples. Assuming that you use Page Objects the way [Selenium suggests in its wiki](https://github.com/SeleniumHQ/selenium/wiki/PageObjects) I completely agree.

These are Selenium's recommendations:
* ~~The public methods represent the services that the page offers.~~
* Try not to expose the internals of the page
* Generally don't make assertions
* ~~Methods return other PageObjects~~
* Need not represent an entire page
* ~~Different results for the same action are modelled as different methods~~

The bullet points which are striked through cause the Page Objects to violate the Single-Responsibility and Open/Closed principle. They are all based on the wrong assumption that functional code is contained in a Page Object. Substituting these three rules with one other rule  solves at least these two principle violations:

**Never ever add test code to your Page Objects!**

Page Objects are responsible for encapsulating the technical page (view of a web, desktop or mobile application) by providing an API which the functional test can use to automatically drive the SUT (System Under Test).

<blockquote>
A page object wraps an HTML page, or fragment, with an application-specific API, allowing you to manipulate page elements without digging around in the HTML.
<footer>
<cite>Martin Fowler - <a href="https://martinfowler.com/bliki/PageObject.html">PageObject</a></cite>
</footer>
</blockquote>

That said the Page Object for the Google Search website looks like this:
``` xtend
@Page
class GoogleSearchPage {

    @SeleniumElement(name="q")
    TextField queryField

    @SeleniumElement(name="btnG")
    Button searchButton
}
```

The Page Object includes nothing but the UI elements which belong to the page. It does not know which page is its successor in case of a button click or which fields need to be filled in which order to trigger a certain action. As the *old* Page Object Model has major drawbacks and gained a bad reputation we use another term which perfectly reflects the suggestion to go back to simplicity: the **Simple Page Object Model (SPOM)**.

For each Page Object's UI element only the information is provided which is inevitable in order to work with the element in our test:
* The element's name (e.g. *queryField*)
* The element's component (e.g. *TextField*)
* The binding technology (e.g. *Selenium*)
* The locator Selenium uses for finding the element in the HTML-DOM (e.g. *name="g"*)

The UI component  exactly reflects the interaction possibilities a human has while using the component. For instance, at a *TextField* one could call *setText*, *getText*, *isEnabled* and *isDisplayed*. The Page Object's single responsibility is to provide these UI elements and bind them to page elements of our SUT. **The SRP and OCP violations do not apply to Page Objects anymore.**

## And what about YAGNI?
By using the *SPOM* Page Objects are lowered to the amount of information which is needed to write tests against a type-safe API, there's not much what you don't need. It is likely that you refer to certain UI elements only once from your test code, so one might argue that you can locate the element directly from the test code without the Page Object indirection. To refute this argument, I'd like to focus on some characteristics/benefits of the *SPOM*.

### Build incrementally
Do not build all your Page Objects up-front. Start small and just add UI elements when you need them first for one of your functional tests. Page Objects do not provide any benefits, if there is no test code which uses them.

### Structure
Page Objects and their contained UI elements help you to structure your test code. Assume that a locator in the SUT has changed. This normally doesn't happen because of a functional requirement but because of a technical refactoring. It's much easier to locate the element in your test code base if they are organized in pages rather than in functional units. Page Objects provide a single source of truth and therefore encourage the DRY (Don't repeat yourself) idea.

### Separation of Concerns
<blockquote>
If you have WebDriver APIs in your test methods, You’re Doing It Wrong.
<footer>
<cite>Simon Stewart - Creator Selenium WebDriver API</cite>
</footer>
</blockquote>
I'd like to throw in another design principle: SoC (Separation of Concerns). Having all the technical stuff encapsulated in your Page Objects and UI components you do not have to deal with them in your test code. This leads to highly readable and maintainable test code and opens the possibility to integrate people with different skill-sets into the test development.

### Implicit assertions
Page Objects should not contain test code *and* should never do assertions, but they can provide information which makes the test developers life much easier. Page Objects can decide whether they are the page which is currently displayed by the SUT. This opens the possibility to check this each time the test code interacts with a page's element. The test developer doesn't need to perform this check explicitly but the framework can take over this job as it has all required information at hand. The idea is explained more in depth [here]({{"/docs/usingtapir/assertions/" | prepend: site.baseurl}}).

## Conclusion
The gauge blog post exactly identified the same weaknesses of the wide-spread Page Object Model as I did. The advice to build reusable blocks (in *tapir* they are called Actions) which can be orchestrated by the tests is also very reasonable. But...

When it comes to the conclusion I do not share the opinion that Page Objects are an anti-pattern. They provide a lot of value and do not stand in contrast to functional blocks; quite the contrary, they provide a way not to violate other design principles like *Separation of Concerns*.

We (my company and me) did not find a framework on the whole test automation market which reflects the idea I presented in this post. Therefore, we created a one by ourselves called *tapir* which is designed from scratch having these principles in mind.

In another blog post I will describe how you can test an application like the Active Admin Store with our framework. *tapir* has a lot of other cool features which did not find their way into this post, so if your are interested, explore the *tapir* website or get in touch with me via post comment, [Gitter]({{ "https://gitter.im/" | append: site.gitterroom }}) or [contact form]({{ "/#contact" | prepend: site.baseurl }}).
