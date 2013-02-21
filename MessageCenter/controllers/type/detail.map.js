/**
 * The parameters for this instance
 * @type {Object}
 * @example
 * {
 *      title: {String}
 *      content: {Object} e.g. { latitude: , longitude: }
 *      modal: {Boolean}
 * }
 */
$.params = arguments[0];

// Set the map position
$.map.region = {
	latitude: $.params.content.latitude,
	longitude: $.params.content.longitude,
	latitudeDelta: 0.1,
	longitudeDelta: 0.1,
	animate: true
};

// Set the mapView annotation
var annotation = Ti.Map.createAnnotation({
    latitude: $.params.content.latitude,
    longitude: $.params.content.longitude,
    title: "Marker",
	subtitle: $.params.title,
    animate: true,
	rightButton: Ti.UI.iPhone.SystemButton.INFO_LIGHT
});
$.map.addAnnotation( annotation );

// Bind the map click
$.map.addEventListener('click', function(_event) {
	if(_event.clicksource === "rightButton") {
		Ti.UI.createAlertDialog({
			title: $.params.content.latitude + " " + $.params.content.longitude,
			message: $.params.title
		}).show();
	}
});

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