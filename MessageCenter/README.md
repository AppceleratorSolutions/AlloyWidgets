Message Center
============
The message center widget is a fire and forget window that tracks any type of messages, whether that is from push notifications, messages from friends, system messages, etc.

Example of the widget opening while simulating a push notification receipt.  Also demonstrates the text, url, and map types:  <http://www.screencast.com/t/cRelPRD3GCK>

Installation
------------
For importing a widget in to your project see this link: <http://docs.appcelerator.com/titanium/3.0/#!/guide/Alloy_XML_Markup-section-35621528_AlloyXMLMarkup-ImportingWidgets>

Setup & Usage
------------
Currently there is no initialization parameters needed for the message center.  Simply require the widget and fire off the methods you need:

`var messageCenter = Alloy.createWidget("MessageCenter");`

#### Open / Close the Message Center
	messageCenter.open();
	messageCenter.close();

#### Create / Save a Message at anytime
(Message Center does not have to be open to save a message)

	// Creates a message that points to a url
	messageCenter.createMessage({
		title: "Christmas Special!",
		type: "url",
		content: "http://1.s3.envato.com/files/1143793/christmas_ad_preview3.jpg"
	});

The `type` specifies the type of message you are logging.  This is used for loading the type of detail screen.  e.g. "url" opens the content in a webView, "text" opens the content in just a label, "map" opens the content in a MapView.

#### Create your own type
If you want to create your own message type you'll need to create a new /type/detail.*.js controller.  The widget controller will look at the "type" and automatically try to open that detail controller.

#### Use with push notifications (iOS example)
	var messageCenter = Alloy.createWidget("MessageCenter");

	Ti.Network.registerForPushNotifications({
		types:[
			Ti.Network.NOTIFICATION_TYPE_BADGE,
			Ti.Network.NOTIFICATION_TYPE_ALERT,
			Ti.Network.NOTIFICATION_TYPE_SOUND
		],
		success: function(e) {
			
		},
		error: function(e) {
			
		},
		callback: function(e) {
			var data = e.data;
			var type = (data.type) ? data.type : "text";
			var content = (data.content) ? data.content : "";

			messageCenter.createMessage({
				title: data.alert,
				type: type,
				content: content
			});

			// Automatically open the detail window with this specific notification
			var detail = Alloy.createWidget("MessageCenter", "type/detail." + type, {
				title: data.alert,
				content: content,
				modal: true
			});
			detail.window.open({ modal: true });
		}
	});