class OPMLController extends BaseObject

	constructor: (@model) ->
		@e = document.createElement "article"
		# debugger
		@e.innerHTML = DepMan.render "_outline", @model
		@e.setAttribute("ng-csp", "")
		@e.setAttribute "ng-controller", "OPMLController"
		section = $("body > article section")
		e = document.createElement "script"
		e.innerHTML = DepMan.render "_outline_render"
		e.setAttribute "type", "text/ng-template"
		e.setAttribute "id", "tree_row.html"
		@e.appendChild e
		angular.bootstrap @e, ["Arrow"]
		@je = $(@e)


		
	activate: =>
		console.log "activating"
		@je.addClass 'activating'
		@je.removeClass "deactivated"
		jQuery("body > article section").append @e
		setTimeout =>
			@je.removeClass "activating"
			@je.addClass "activated"
		, 50

	deactivate: =>
		console.log "deactivating"
		@je.removeClass "activated"
		@je.addClass "deactivated"
		setTimeout =>
			@e.parentNode.removeChild @e
		, 1000

class OPMLControllerErrorReporter extends BaseObject

	@extend IS.ErrorReporter
	
ER = OPMLControllerErrorReporter
module.exports = OPMLController
