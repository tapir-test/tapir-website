// Staticman comment replies
// modified from Wordpress https://core.svn.wordpress.org/trunk/wp-includes/js/comment-reply.js
// Released under the GNU General Public License - https://wordpress.org/about/gpl/
var comment = {
  reply: function(parentId, parentAuthor) {

      var $replyTo = $("#comment-replying-to");
      var $cancel = $("#cancel-comment-reply-link");
      var $commentForm = $("#comment-form");

      $replyTo.val(parentId);
      $cancel.html('<i class="fa fa-times" aria-hidden="true"></i> Cancel reply to ' + parentAuthor);
      $cancel.show();
      $cancel.click(function() {
          $replyTo.val("");
          $cancel.hide();
      });
      resetForm($commentForm);
      focusForm($commentForm);

    return false;
  }

};
