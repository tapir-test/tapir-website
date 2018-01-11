// Static comments
/*
(function($) {
  var $comments = $(".js-comments");

  $("#comment-form").submit(function() {
    var form = this;

    $(form).addClass("disabled");
    $("#comment-form-submit").html(
      '<svg class="icon spin"><use xlink:href="/assets/icons/icons.svg#icon-loading"></use></svg> Loading...'
    );

    $.ajax({
      type: $(this).attr("method"),
      url: $(this).attr("action"),
      data: $(this).serialize(),
      contentType: "application/x-www-form-urlencoded",
      success: function(data) {
        $("#comment-form-submit")
          .html("Submitted")
          .addClass("btn--disabled");
        $("#comment-form .js-notice")
          .removeClass("notice--danger")
          .addClass("notice--success");
        showAlert(
          '<strong>Thanks for your comment!</strong> Its approval is currently pending and will show on the site once approved.'
        );
      },
      error: function(err) {
        console.log(err);
        $("#comment-form-submit").html("Submit Comment");
        $("#comment-form .js-notice")
          .removeClass("notice--success")
          .addClass("notice--danger");
        showAlert(
          "<strong>Sorry, there was an error with your submission.</strong> Please make sure all required fields have been completed and try again."
        );
        $(form).removeClass("disabled");
      }
    });

    return false;
  });

  function showAlert(message) {
    $("#comment-form .js-notice").removeClass("hidden");
    $("#comment-form .js-notice-text").html(message);
  }
})(jQuery);
*/

$(function() {
	var $commentForm = $('#comment-form');
    var $commentFormSubmissionResult = $('#comment-form-submission-result');
	$contactForm.on('submit', function(e) {
		var msgLoad = '<div class="alert alert-dismissible alert-info"><button type="button" class="close" data-dismiss="alert">&times;</button><h4 class="alert-heading">Submitting comment…</h4>Please wait a second...</div>';
		var msgSuccess = '<div class="alert alert-dismissible alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button><h4 class="alert-heading">Comment sumbitted!</h4>Your comment is waiting for approval and will be visible shortly.</div>';
		var msgError = '<div class="alert alert-dismissible alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button><h4 class="alert-heading">Comment NOT submitted!</h4>Something went wrong. Please make sure all required fields have been completed and try again. alternatively contact us via <a class="alert-link" href="{{ "/#contact" | prepend: site.baseurl }}">the contact form</a>.</div>';

		e.preventDefault();
		$.ajax({
            type: $(this).attr("method"),
            url: $(this).attr("action"),
			data: $(this).serialize(),
			dataType: 'json',
			beforeSend: function() {
                $commentForm.find('input, textarea, button, select').attr('disabled','disabled');
                $commentFormSubmissionResult.html(msgLoad);
			}
		}).done(function(data) {
			$commentFormSubmissionResult.html(msgSuccess);
		}).fail(function() {
			$commentFormSubmissionResult.html(msgError);
		});
	});
});
