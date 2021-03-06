---
title: Installation
description: This chapter describes how to install and use tapir.
permalink: /docs/gettingstarted/installation/
---

## Eclipse

We recommend to use [Eclipse](https://eclipse.org/) to develop with <i>tapir</i>. By using the Eclipse Installer you get a running preconfigured Eclipse IDE in no time at all.

### Alternative 1: Eclipse Installer (recommended)

The Eclipse Installer is the easiest way to install and update your Eclipse Development Environment. You can download the Eclipse Installer .

1. Download the Eclipse Installer for your platform:
  * [Windows 64 Bit](http://www.eclipse.org/downloads/download.php?file=/oomph/products/eclipse-inst-win64.exe) (self-extracting exe)
  * [Mac OS 64 Bit](http://www.eclipse.org/downloads/download.php?file=/oomph/products/eclipse-inst-mac64.tar.gz) (tar.gz)
  * [Linux 64 Bit](http://www.eclipse.org/downloads/download.php?file=/oomph/products/eclipse-inst-linux64.tar.gz) (tar.gz)
1. Run the Eclipse Installer
1. Drag and drop this button into the Eclipse Installer header: <a href="https://raw.githubusercontent.com/tapir-test/tapir-oomph-setup/master/tapir-configuration.setup" class="btn btn-primary btn-sm">Install <i class="fa fa-download" aria-hidden="true"></i></a>
1. Confirm via Install and Start

<div class="panel panel-info">
  <div class="panel-heading">
    <div class="panel-title"><span class="fas fa-info-circle"></span> Hints</div>
  </div>
  <div class="panel-body">
    <ul>
      <li>Windows does not allow to drag and drop files when the Eclipse installer is started with elevated admin permissions. Start the installer with normal user permissions to avoid this issue.</li>
      <li>On some systems the drag and drop approach from the website doesn't work with the Eclipse Installer. In this case it can help to download the setup file from the button above to your file system first. Then drag and drop the file into the Eclipse Installer header.</li>
      <li>Don't forget to configure the installer's proxy settings in case that you are, for instance, within a company network.</li>
    </ul>
  </div>
</div>

### Alternative 2: Manual installation
In case you don't want to use the Eclipse Installer you can install the plugins in your eclipse manually via the corresponding update-site. Beside JDT tapir needs Maven (M2Eclipse) and [Xtend](https://www.eclipse.org/xtend/download.html) (at least 2.24.0) to work.

## Showcase
If you just would like to get a first impression of <i>tapir</i> we highly recommend our show case which it hosted at [GitHub](https://github.com/tapir-test/tapir-showcase).

### Eclipse
1. Switch to the git perspective by choosing *Windows* \| *Perspective* \| *Open Perspective* \| *Other...* \| *Git*
1. Choose *Clone a Git repository* and paste [https://github.com/tapir-test/tapir-showcase.git](https://github.com/tapir-test/tapir-showcase.git) into the *URI* field
1. Choose *Next >* \| *Next >* \| *Finish*
1. In the *Git Repositories* view perform a right-click on *tapir-showcase* and choose *Import projects...* and confirm the dialog with *Finish*.

## Build Systems

*tapir* itself is integrated via dependencies in your test project. A more detailed documentation for Maven can be found [here]({{ "/docs/usingtapir/build-systems/" | prepend: site.baseurl }}). *tapir* might work with further build tools and systems, but this is not specifically supported.
