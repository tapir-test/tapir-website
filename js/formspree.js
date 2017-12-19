$(function() {
	var $contactForm = $('#contact-form');
    var $contactFormSubmissionResult = $('#contact-form-submission-result');
	$contactForm.on('submit', function(e) {
		var msgLoad = '<div class="alert alert-dismissible alert-info"><button type="button" class="close" data-dismiss="alert">&times;</button><h4 class="alert-heading">Sending message…</h4>Please wait a second...</div>';
		var msgSuccess = '<div class="alert alert-dismissible alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button><h4 class="alert-heading">Message sent!</h4>Thanks for contacting us. We will answer your query promptly.</div>';
		var msgError = '<div class="alert alert-dismissible alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button><h4 class="alert-heading">Message NOT sent!</h4>Something went wrong. Please try to contact us via <a class="alert-link" href="mailto:tapir@bmiag.de?subject=tapir">tapir@bmiag.de</a></div>';

		e.preventDefault();
		$.ajax({
			url: '//formspree.io/tapir@bmiag.de',
			method: 'POST',
			data: $(this).serialize(),
			dataType: 'json',
			beforeSend: function() {
                $contactForm.find('input, textarea, button, select').attr('disabled','disabled');
                $contactFormSubmissionResult.html(msgLoad);
			}
		}).done(function(data) {
			$contactFormSubmissionResult.html(msgSuccess);
		}).fail(function() {
			$contactFormSubmissionResult.html(msgError);
		});
	});
});
