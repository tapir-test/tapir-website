---
title: Execution GUI
description: The Execution GUI allows to execute tapir test cases via a GUI application.
permalink: /docs/execution/gui/
tapir-extensions-module: tapir-extensions-execution-gui
---

<div class="panel panel-warning">
  <div class="panel-heading">
    <div class="panel-title"><span class="fas fa-exclamation-circle"></span> Caution</div>
  </div>
  <div class="panel-body">
  Note that this module uses icons from the essential app icon set at <a href="https://www.iconfinder.com/iconsets/essential-app-1">www.iconfinder.com</a>. This module uses also the mvvmFX framework, which means that the licenses of mvvmFX (and its dependencies) apply, when you use it.
  </div>
</div>

This module contains a new launcher to start *tapir* test cases and test suites. It allows you to select which parts of the execution plan should be executed. To use it, you simply need to add it as Maven dependency.

## Dependency

``` xml
<dependency>
  <groupId>io.tapirtest</groupId>
  <artifactId>tapir-extensions-execution-gui</artifactId>
  <version>{{site.latesttapirextensionsversion}}</version>
</dependency>
```

## Usage

Once the module is in your classpath, you can start the launcher by calling the main class "io.tapirtest.execution.gui.GUILauncher" with your test class or test suite as first parameter. In Eclipse you can add a launch configuration for this. Once the application is opened, it shows you the whole execution plan of the given test case. You can now select and deselect arbitrary steps in the execution plan. When you are finished, you can start the tests by clicking "Start Tests".

The GUI of the *tapir extensions* launcher allows you not only to start your tests, but also to show the execution plan with different properties. In the lower part of the application, you can add properties and update the view by clicking on "Reinitialize Execution Plan". This is very useful if you are using *tapir*'s variant or conditional module.

Unfortunately the usage of the launcher has a drawback: In Eclipse you can only start your tests with it, if the test cases are located in the main source folder (src/main/java by default). Otherwise the launcher cannot find the classes. Note also that the GUI uses JavaFX, which means that you might have to install JavaFX in addition, if you are using OpenJDK.
