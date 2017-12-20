---
title: Attachment Listener
permalink: /docs/customization/attachment-listener/
---
In a [previous chapter]({{"/docs/customization/executionlistener/" | prepend: site.baseurl}}) we showed you how to implement custom execution listeners. You might have noted, that some of the listeners were responsible for creating attachments (screenshots, HTML content and so on). In this chapter we show you how to handle attachments during the test execution. The attachment listeners are part of <i>tapir's</i> *execution* module.

``` xml
<dependency>
    <groupId>de.bmiag.tapir</groupId>
    <artifactId>tapir-execution</artifactId>
</dependency>
```

# Sending Attachments

Let's first take a look at how to create and send attachments. The
following snippet is a simplified excerpt from the
[*ScreenshotService*](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/selenium/service/ScreenshotService.html)-
a service responsible for making screenshots with the current web
driver.

**ScreenshotService.xtend**

``` xtend
@Component("tapirScreenshotService")
class ScreenshotService {

    @Autowired
    WebDriver driver

    @Autowired
    extension AttachmentListenerNotifier attachmentListenerNotifier

    @Autowired
    extension ExecutionState executionState

    def void takeScreenshot(String name) {
        if(driver instanceof TakesScreenshot) {
            val screenshot = new AShot().takeScreenshot(driver)
            val imageByteArray = ImageTool.toByteArray(screenshot.image)
            val attachment = Attachment.build [
                it.name = name
                mimeType = MimeTypeUtils.IMAGE_PNG
                content = imageByteArray
            ]
            notifyListeners[attachmentAdded(currentTestStep.get, attachment)]
        }
    }
}
```

The listener creates a screenshot with the class *AShot* and creates a new attachment instance (*attachment* is incidentally an [immutable
class]({{"/docs/extensions/immutables/" | prepend: site.baseurl}})). The mandatory fields of the attachment are the name, the mime type and, of course, the binary content. Once created, the listener uses the [AttachmentListenerNotifier](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/attachment/AttachmentListenerNotifier.html)to send the attachment to the registered observers. You should always use this mechanism to propagate attachments to the listeners responsible for creating reports, because otherwise not all listeners might receive the data.

# Receiving Attachments

If you want to be notified about new attachments, you have to create a class which implements the interface [AttachmentListener](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/attachment/AttachmentListener.html).
Furthermore, Spring must be aware of your component. The following excerpt is from the [FilesystemAttachmentListener](https://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/execution/attachment/FilesystemAttachmentListener.html), which writes the attachments to a temporary folder on the file system.

``` xtend
@Component("tapirFilesystemAttachmentListener")
class FilesystemAttachmentListener implements AttachmentListener {

    override attachmentAdded(TestStep testStep, Attachment attachment) {
        val dirName = '''«testStep.parentTestClass.name».«testStep.name»'''
        val directory = Files.createTempDirectory(dirName)
        val fileExtension = switch (attachment.mimeType) {
            case APPLICATION_JSON: "json"
            case APPLICATION_XML: "xml"
            case IMAGE_GIF: "gif"
            case IMAGE_JPEG: "jpg"
            case IMAGE_PNG: "png"
            case TEXT_HTML: "html"
            case TEXT_PLAIN: "txt"
            case TEXT_XML: "xml"
            default: "bin"
        }

        val attachmentFile = new File(directory.toFile(), '''«attachment.name».«fileExtension»''')
        FileUtils.writeByteArrayToFile(attachmentFile, attachment.content)
    }

}
```

The listener receives the attachment, determines the file extension and writes it into a temporary folder. In a similar manner you can write
your own listener to handle attachments.

<div class="panel panel-info">
  <div class="panel-heading">
    <h3 class="panel-title"><span class="fa fa-info-circle"></span> Hint</h3>
  </div>
  <div class="panel-body">
  Some listeners might implement both <i>ExecutionListener</i> <strong>and</strong>
  <i>AttachmentListener<i>. This is what the
  <a href="http://psbm-mvnrepo-p.intranet.kiel.bmiag.de/tapir/latest/apidocs/de/bmiag/tapir/junit/allure/listener/AllureExecutionListener.html">AllureExecutionListener</a>does.
  It stores all attachments (screenshots, HTML content and so on), but
  sends them to the Allure component not until the test step finished.
  This makes sure that the Allure report assigns all the attachments to
  the correct test steps.
  </div>
</div>
