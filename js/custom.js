

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
