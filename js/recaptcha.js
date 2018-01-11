// Static comments
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
