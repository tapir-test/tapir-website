

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
  $("a[href*='#']:not([href*='#collapse-'])").click(function() {
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

// Add anchors on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function(event) {
  anchors.add('h2:not(.noanchor), h3:not(.noanchor), h4:not(.noanchor), h5:not(.noanchor), h6:not(.noanchor)');
});

window.sr = ScrollReveal();
sr.reveal('.reveal', { duration: 800 });
