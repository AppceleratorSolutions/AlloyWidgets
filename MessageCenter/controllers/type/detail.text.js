/**
 * The parameters for this instance
 * @type {Object}
 * @example
 * {
 *      title: {String}
 *      content: {String}
 *      modal: {Boolean}
 * }
 */
$.params = arguments[0];

if($.params.title) {
	$.title.text = $.params.title;
}

if($.params.content) {
	$.content.text = $.params.content;
}

// For modal versions of this screen
if($.params.modal) {
	if(OS_IOS) {
		$.window.title = $.params.title || "Notification";
		$.window.rightNavButton = (function() {
			var button = Ti.UI.createButton({
				title: "Close"
			});
			button.addEventListener("click", function() {
				$.window.close();
			});
			return button;
		})();
	}
}