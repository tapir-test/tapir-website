---
title: Documentation
permalink: /docs/extensions/documentation/
---

<i>tapir</i> facilitates the developer to write comprehensive and maintainable
tests. However, additional documentation might help other developers,
test managers and stakeholders to understand the purpose of a test
suite, class or step. <i>tapir</i> provides a set of annotations which might be
useful for providing an informative documentation.

<table style="width:100%;">
<colgroup>
<col style="width: 14%" />
<col style="width: 26%" />
<col style="width: 12%" />
<col style="width: 12%" />
<col style="width: 12%" />
<col style="width: 12%" />
<col style="width: 12%" />
</colgroup>
<thead>
<tr class="header">
<th>Annotation</th>
<th>Description</th>
<th style="text-align: center;">Test suite</th>
<th style="text-align: center;">Test class</th>
<th style="text-align: center;">Test class parameter</th>
<th style="text-align: center;">Test step</th>
<th style="text-align: center;">Test step parameter</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><a href="https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/annotations/documentation/Title.html">@Title</a></td>
<td>Provides a title/headline for the annotated element. It describes the behaviour of the annotated element more abstract than <em>@Description</em>.</td>
<td style="text-align: center;"><div class="fa fa-check"/></td>
<td style="text-align: center;"><div class="fa fa-check"/></td>
<td style="text-align: center;"><div class="fa fa-check"/></td>
<td style="text-align: center;"><div class="fa fa-check"/></td>
<td style="text-align: center;"><div class="fa fa-check"/></td>
</tr>
<tr class="even">
<td><a href="https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/annotations/documentation/Description.html">@Description</a></td>
<td><p>Describes the behaviour of the annotated element more detailed than <em>@Title</em>.</p></td>
<td style="text-align: center;"><div class="fa fa-check"/></td>
<td style="text-align: center;"><div class="fa fa-check"/></td>
<td style="text-align: center;"><div class="fa fa-check"/></td>
<td style="text-align: center;"><div class="fa fa-check"/></td>
<td style="text-align: center;"><div class="fa fa-check"/></td>
</tr>
<tr class="odd">
<td><a href="https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/annotations/documentation/Issues.html">@Issues</a></td>
<td>Provides the possibility to link the annotated element with an issue tracker.</td>
<td style="text-align: center;"><div class="fa fa-check"/></td>
<td style="text-align: center;"><div class="fa fa-check"/></td>
<td style="text-align: center;"><div class="fa fa-times"/></td>
<td style="text-align: center;"><div class="fa fa-times"/></td>
<td style="text-align: center;"><div class="fa fa-times"/></td>
</tr>
<tr class="even">
<td><a href="https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/annotations/documentation/Tags.html">@Tags</a></td>
<td>Helps structuring your test suites and classes</td>
<td style="text-align: center;"><div class="fa fa-check"/></td>
<td style="text-align: center;"><div class="fa fa-check"/></td>
<td style="text-align: center;"><div class="fa fa-times"/></td>
<td style="text-align: center;"><div class="fa fa-times"/></td>
<td style="text-align: center;"><div class="fa fa-times"/></td>
</tr>
</tbody>
</table>

Beside documenting the source code the information can be included in
reports in order to get to know what the certain test suites and classes
did without looking at the source code.
