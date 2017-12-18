---
layout: license
sectionid: license
---

# Editions
{% include editions.html %}

# Request a License

<div class="container">
    <!-- Contact Form -->
    <!-- In order to set the email address and subject line for the contact form go to the bin/contact_me.php file. -->
    <div class="row">
        <div class="col-md-8">
            <form name="sentMessage" id="contactForm" method="post" action="https://formspree.io/tapir@bmiag.de">
            <div class="control-group form-group">
                <div class="controls">
                    <label>Full Name:</label>
                    <input type="text" class="form-control" id="name" required data-validation-required-message="Please enter your name.">
                    <p class="help-block"></p>
                </div>
            </div>
            <div class="control-group form-group">
                <div class="controls">
                    <label>Email Address:</label>
                    <input type="email" class="form-control" id="email" required data-validation-required-message="Please enter your email address.">
                </div>
            </div>
            <div class="control-group form-group">
                <div class="controls">
                    <label>Edition:</label>
                    <select class="form-control" id="edition" required data-validation-required-message="Please enter the desired edition.">
                      <option>Community-Edition</option>
                      <option>Enterprise-Edition</option>
                    </select>
                </div>
            </div>
            <div class="control-group form-group">
                <div class="controls">
                    <label>Message:</label>
                    <textarea rows="10" cols="100" class="form-control" id="message" required data-validation-required-message="Please enter your message" maxlength="999" style="resize:none"></textarea>
                </div>
            </div>
            <input type="text" name="_gotcha" style="display:none">
            <div id="success"></div>
            <!-- For success/fail messages -->
            <button type="submit" class="btn btn-primary">Send Message</button>
        </form>
    </div>
</div>
