do ->
	class Client extends BaseClient
		
		constructor: -> super()
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
			jQuery("#qrimage").attr "src", "https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=#{@id}&choe=UTF-8"
			jQuery("#qrimage").removeClass "hidden"

	window.Client = new Client()
