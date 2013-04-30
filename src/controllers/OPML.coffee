class OPMLController extends BaseObject

	constructor: (@model) ->
		@e = document.createElement "article"
		# debugger
		@e.innerHTML = DepMan.render "_outline", @model
		@e.setAttribute("ng-csp", "")
		@e.setAttribute "ng-controller", "OPMLController"
		@e.addEventListener "contextmenu", (e) =>
			console.log e.target.tagName
			if not (e.target.tagName in ["I", "INPUT", "LI"])
				do @model.scope.toggleSidebar
				do e.preventDefault
		down = (e) => 
			return if @model.scope.view is "mindmap" or e.button is 1
			if @model.scope.sidebarstatus then do @model.scope.cancelSidebar
			@timer = setTimeout =>
				do @model.scope.toggleSidebar
			, 400
		up = (e) =>  clearTimeout @timer
		@e.addEventListener "mousedown", down
		@e.addEventListener "touchstart", down
		@e.addEventListener "mouseup", up
		@e.addEventListener "touchend", up
		section = $("body > article section")
		e = document.createElement "script"
		e.innerHTML = DepMan.render "_outline_render"
		e.setAttribute "type", "text/ng-template"
		e.setAttribute "id", "tree_row.html"
		@e.appendChild e
		angular.bootstrap @e, ["Arrow"]
		@je = $(@e)
		@canvas = @je.find("canvas")[0]
		@frameBuffer = new (DepMan.classes "MainFrameBuffer")(@canvas, @model)
		@log @

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
