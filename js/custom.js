

$(document).ready(function() {

	// syntax coloring
	$('pre > code[class]').each(function() {
		$(this).attr('class', $(this).attr('class').replace('language','lang'));
		$(this).addClass('prettyprint')
		if ($(this).text().indexOf('\n') != $(this).text().lastIndexOf('\n')) {
			$(this).addClass('linenums')
		}
	})
	prettyPrint();
});

$(function() {
  $("a[href*='#']:not([href='#'])").click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({ scrollTop: target.offset().top -50 }, 500);
        return false;
      }
    }
  });
});

window.sr = ScrollReveal();
sr.reveal('.reveal', { duration: 800 });
