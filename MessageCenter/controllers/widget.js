/**
 * Message Center Widget
 *
 * @version 1.0
 * @description A message center for managing any type of notifications
 * such as receiving push notifications, caching their content for later use, etc.
 **/

/**
 * The parameters for this instance
 * @type {Object}
 *
 * TODO Need configuration settings for type of window, table styling,
 * if there are multiple screen types || tabbed bar types
 * (e.g. notifications, friend requests, etc.)
 *
 * NOTE: Currently not used.
 */
$.params = arguments[0];
/**
 * Create a message in the notification center
 * @param {object} _data
 * @example
 * {
 *      title: {String} The title of the message
 *      type: {String} Message types determine the detail screen layout.
 *      content: {String} The content of the message (varies depending on the type)
 * }
 *
 * TYPES - You can add your own types by placing a widget controller in the /type/
 * folder.
 *
 * Currently supported types:
 * url - webView pointing to the url
 * text - simple text label display
 * map - MapView
 */
$.createMessage = function(_data) {
	// Get the message list
	var messages = Ti.App.Properties.getList("MESSAGE_CENTER_WIDGET_DATA") || [];

	// Add the new data and save to a new array
	messages.push( _data );
	Ti.App.Properties.setList("MESSAGE_CENTER_WIDGET_DATA", messages);
};
/**
 * Retrieve all messages
 * @return {Array}
 */
$.getMessages = function() {
	return Ti.App.Properties.getList("MESSAGE_CENTER_WIDGET_DATA") || [];
};
/**
 * Get a particular message by it's index
 * @param {Number} _index
 * @return {Object}
 */
$.getMessage = function(_index) {
	var messages = Ti.App.Properties.getList("MESSAGE_CENTER_WIDGET_DATA");
	return messages[_index];
};
/**
 * Remove a message by it's index
 * @param {Number} _index
 */
$.removeMessage = function(_index) {
	var messages = $.getMessages();
	messages.splice(_index, 1);
	Ti.App.Properties.setList("MESSAGE_CENTER_WIDGET_DATA", messages);
};
/**
 * Opens the message center
 */
$.open = function() {
	var data = $.getMessages();
	var rows = [];

	// Loop through the existing messages and get the right row template
	if(data.length > 0) {
		data.forEach(function(_message) {
			var row = Ti.UI.createTableViewRow({
				title: _message.title || _message.content,
				type: _message.type,
				font: { fontSize: 14 },
				color: "#222",
				hasChild: true,
				height: 50
			});
			rows.push( row );
		});
	} else {
		var row = Ti.UI.createTableViewRow({
			title: "You have no messages",
			font: { fontSize: 14 },
			color: "#222",
			height: 50
		});
		rows.push( row );
	}

	$.messageList.setData( rows );

	$.window.open();
};
/**
 * Shortcut to close
 * NOTE: This is here in case additional closing logic is needed
 * or cleanup, etc.
 */
$.close = function() {
	$.window.close();
};
/**
 * Handle what happens when the user clicks on a row
 * @param {Object} _event
 */
$.handleRowClick = function(_event) {
	var index = _event.index;
	var type = _event.row.type;
	if(index !== null && type) {
		var detail = Alloy.createWidget("MessageCenter", "type/detail." + type, $.getMessage(index));

		if(OS_IOS) {
			$.navgroup.open( detail.window );
		} else {
			detail.window.open();
		}
	}
};

// Bind events
if(OS_IOS) {
	$.closeButton.addEventListener("click", $.close);
} else {
	$.messageList.addEventListener("longclick", function(_event) {
		var dialog = Ti.UI.createOptionDialog({
			title: "Are you sure you want to delete this?",
			options: ["Delete", "Cancel"],
			cancel: 1
		});
		dialog.show();

		dialog.addEventListener('click', function (e) {
			if(e.index === 0) {
				$.removeMessage(_event.index);
				$.messageList.deleteRow(_event.index);
			}
		});
	});
}
$.messageList.addEventListener("click", $.handleRowClick);
$.messageList.addEventListener("delete", function(_event) {
	$.removeMessage(_event.index);
});