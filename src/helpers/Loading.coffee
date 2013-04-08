class LoadingHelper extends BaseObject
	@extend IS.Modules.Overload
	@include IS.Modules.Overload
	constructor: ->
		f = document.createElement "div"
		f.innerHTML = DepMan.render "loadingscreen"
		document.body.appendChild f
		@loadingScreen = document.getElementById "loadingscreen"
		@message = document.getElementById "loadingmessage"
		@log "Loading screen ready"

	start: => @loadingScreen.className = "active"
	end: => @loadingScreen.className = ""
	progress: (arg) => @message.innerHTML = (if typeof arg is "number" then "Loading: #{arg}%" else arg)

 module.exports = LoadingHelper
