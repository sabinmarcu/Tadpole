class OPMLController extends BaseObject

	constructor: (@model) ->
		@e = document.createElement "article"
		@e.innerHTML = DepMan.render "collection", item: @model.structure, depth: 0, path: ""
		do @hookControllers

	hookControllers: (base = @e.children[0], prev = "") =>
		for dom in base.children
			obj = @model.find dom.dataset.objectpath
			cntrl = new (DepMan.controller "Outline")(dom, obj)
			obj.controller = dom.controller = cntrl
			if obj.children.get()?
				div = null
				div = kid for kid in dom.children when kid.className.indexOf("row") >= 0
				@hookControllers div.children[0], dom.dataset.objectpath + "."

		
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
