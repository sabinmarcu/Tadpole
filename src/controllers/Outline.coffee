class OutlineController extends BaseObject
	constructor: (@e, @model) ->
		@model.controller = @
		throw ER.generate 1 if not @e? or not @e.tagName?
		throw ER.generate 2 if not @model?
		@e.controller = @
		kids = @e.children
		for kid in kids then do (kid) => 
			switch kid.tagName
				when "P"
					@p = kid
					kid.addEventListener "dblclick", => console.log kid; kid.setAttribute "contenteditable", true
					kid.addEventListener "blur", => kid.setAttribute "contenteditable", false; @update "text", kid.innerHTML
				when "I"
					if kid.className.indexOf("icon-custom") >= 0 then @f = kid; kid.addEventListener "click", @fold
					else @c = kid; kid.addEventListener "click", =>
						switch kid.className
							when "icon-check" then kid.className = "icon-check-empty"; @update "status", "unchecked"
							when "icon-check-empty" then kid.className = "icon-check"; @update "status", "checked"
						@refreshParents @model.parent.parent.controller
		
	update: (prop, value) =>
		throw ER.generate 3 if not @model[prop]?
		@model[prop].set value
		
	fold: =>
		if @model.children.get()?
			if @e.className.indexOf("folded") >= 0 then @e.className = @e.className.replace /\ ?folded/g, ""
			else @e.className += " folded"

	refreshParents: (el) ->
		valid = true
		for kid in el.model.children.get().topics
			if not ( kid.status.get() in ["checked", "determinate"] )
				valid = false
				break
		if valid
			el.c.className = "icon-circle"
			el.update "status", "determinate"
		else
			el.c.className = "icon-circle-blank"
			el.update "status", "indeterminate"
		@refreshParents el.model.parent.parent.controller if el.model.parent.parent?
			
class OutlineControllerErrorReporter extends BaseObject

	@errorGroupMap: [ 1, 1, 2 ]
	@errorGroups: [ "Crud", "cRud", "crUd", "cruD" ]
	@errorMessages: [
		"Must provide a valid HTML node"
		"Must provide a valid Outline Model"
		"Must provide a valid property"
	]
	
	@extend IS.ErrorReporter

ER = OutlineControllerErrorReporter
module.exports = OutlineController
