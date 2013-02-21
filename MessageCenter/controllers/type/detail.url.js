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

if(!Ti.Network.online) {
	$.wrapper.add(
		Ti.UI.createLabel({
			text: "You must be online to view this message",
			top: 10,
			right: 10,
			bottom: 10,
			left: 10,
			textAlign: "center"
		})
	);
} else {
	if($.params.content) {
		$.content.url = $.params.content;
	}
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