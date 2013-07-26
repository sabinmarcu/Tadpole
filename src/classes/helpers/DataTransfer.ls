class Client extends BaseClient
	~>
		@queue = {}
		super "http://188.240.47.130:9000"
	connect: ~> 
		@publish "connection.request", it
		super it

	connected: (id) ->
		Toast "Connected to the new ID", "You are now connected to #{id}", "Anything that you do will now be visible and mirrored in the other one's screen, and so will his every move in your screen."
		@publish "connection.new", id

	events:
		"log": -> console.log arguments
		"switchMode": (mode) -> switchMode mode
		
	init: ~> @publish "CONNECTED"
	reconnect: ~> @socket.socket.disconnect!; @socket.socket.connect!

window.Client = new Client()
angular.module AppInfo.displayname .value window.Client
module.exports = window.Client
