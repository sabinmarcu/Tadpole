class Client extends BaseClient
	~>
		@queue = {}
		super "http://188.240.47.130:8080"
	connected: (id) ->
		Toast "Connected to the new ID", "You are now connected to #{id}", "Anything that you do will now be visible and mirrored in the other one's screen, and so will his every move in your screen."

	events:
		"log": -> console.log arguments
		"switchMode": (mode) -> switchMode mode
		
	init: ~> @publish "CONNECTED"

window.Client = new Client()
angular.module AppInfo.displayname .value window.Client
module.exports = window.Client
