class OPMLController extends BaseObject

	constructor: (@model) ->
		@e = document.createElement "article"
		@e.innerHTML = DepMan.render "_outline"

		
	activate: =>
		console.log "activating"
		$("article section")[0].appendChild(@e)
		@e.className = "activating"
		setTimeout =>
			@e.className = "activated"
			angular.bootstrap $("article section")[0], ["Arrow"]
		, 50

	deactivate: =>
		console.log "deactivating"
		@e.className = "deactivated"
		setTimeout =>
			@e.parentNode.removeChild(@e) if @e.parentNode?
		, 1000

class OPMLControllerErrorReporter extends BaseObject

	@extend IS.ErrorReporter
	
ER = OPMLControllerErrorReporter
module.exports = OPMLController
