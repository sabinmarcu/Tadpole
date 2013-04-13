do ->
	class Client extends BaseClient
		
		constructor: ->
			@queue = {}
			super "http://188.240.47.130:9000/"
		connected: (id) ->
			jQuery("#tip-message-head").html "Connected to the new ID"
			jQuery("#tip-message-body").html "<p>You are now connected to #{id}</p><p>Anything that you do will now be visible and mirrored in the other one's screen, and so will his every move in your screen.</p>"
			jQuery("#settings").modal("hide")
			jQuery("#tip-message").modal("show")

		events:
			"log": -> console.log arguments
			"switchMode": (mode) -> switchMode mode
			
		init: =>
			jQuery( "#connectionidself" ).val @id
			jQuery( "#connectid" ).keypress (e) => @connect jQuery("#connectid").val(); jQuery("#connectid").val("") if e.which is 13
			@draw ?= new QRCodeDraw()
			@image ?= document.getElementById("qrimage")
			@draw.draw @image, @id, ->

	window.Client = new Client()
