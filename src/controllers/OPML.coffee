class OPMLController extends BaseObject

	constructor: (@model) ->
		@e = document.createElement "article"
		@model.structure.render @e

		
	activate: =>
		document.querySelector("article section").appendChild(@e)
		@e.className = "activating"
		document.getElementById("downloadButton").addEventListener "click", @model.download
		document.getElementById("saveButton").addEventListener "click", @model.save
		setTimeout =>
			@e.className = "activated"
		, 50

	deactivate: =>
		console.log "deactivating"
		@e.className = "deactivated"
		setTimeout =>
			document.querySelector("article section").removeChild(@e)
		, 1000
		document.getElementById("downloadButton").removeEventListener "click", @model.download
		document.getElementById("saveButton").removeEventListener "click", @model.save

class OPMLControllerErrorReporter extends BaseObject

	@extend IS.ErrorReporter
	
ER = OPMLControllerErrorReporter
module.exports = OPMLController
