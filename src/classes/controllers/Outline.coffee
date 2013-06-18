class FakeOutline
	constructor: -> @text = "New Node"; @_status = "unchecked"; @childNodes = []
	getAttribute: (attr) -> @[attr] or null

class OutlineController extends BaseObject
	constructor: (@e, @model) ->

		# Error Handling
		throw ER.generate 1 if not @e? or not @e.tagName?
		throw ER.generate 2 if not @model?

		# Bindings
		@e.controller = @

		# ContextMenu for Desktop
		if !isMobile
			@e.addEventListener "contextmenu", (e) =>
				new (DepMan.controller "ContextMenu")({
					"Delete": @del
					"Add": @add
				}, e)
				do e.preventDefault
				do e.stopPropagation
		else 
			if @model.controls?
				@model.controls.add.addEventListener "click", @add
				@model.controls.remove.addEventListener "click", @del

		# The Controller Part
		kids = @e.children
		for kid in kids then do (kid) =>
			switch kid.tagName
				when "P"
					@p = kid
					kid.addEventListener "dblclick", @doubleClick
					kid.addEventListener "blur", @blur
				when "I"
					if kid.className.indexOf("icon-custom") >= 0 then @f = kid; kid.addEventListener "click", @fold
					else @c = kid; kid.addEventListener "click", =>
						switch kid.className
							when "icon-check" then kid.className = "icon-check-empty"; @model.update "status", "unchecked"
							when "icon-check-empty" then kid.className = "icon-check"; @model.update "status", "checked"
						@refreshParents @model.parent.parent.controller

	doubleClick: =>	
		@p.setAttribute "contenteditable", true
		$("*").each (k, e) => e.addEventListener "click", @blur

	blur: => 
		@p.setAttribute "contenteditable", false
		@model.update "text", @p.innerHTML
		$("*").each (k, e) => e.removeEventListener "click", @blur

	add: =>
		kids = @model.children.get()
		if not kids?
			@model.children.set new (DepMan.model "Outline").Collection([], @model, @model.parent.depth + 1)
			e = document.createElement "div"
			e.setAttribute "class", "row bordertop"
			e.setAttribute "style", "padding-left: #{50 * ( @model.parent.depth + 1 ) }px; margin-left: -#{50 * (@model.parent.depth + 1)}px"
			@model.children.get().render e
			@e.appendChild e
			kids = @model.children.get()
		addition = new (DepMan.model "Outline").Element(new FakeOutline, kids)
		kids.topics.push addition
		console.log addition
		do addition.render
		@model.children.set kids
		@model.update "status", "indeterminate"
		@c.setAttribute "class", "icon-circle-blank"
		@f.className = @f.className.replace /\ ?hidden/g, ""
		@e.className += " noborder"


	del: =>
		@e.parentNode.removeChild @e
		do @model.delete
		
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
			el.model.update "status", "determinate"
		else
			el.c.className = "icon-circle-blank"
			el.model.update "status", "indeterminate"
		@refreshParents el.model.parent.parent.controller if el.model.parent.parent?
			
class OutlineControllerErrorReporter extends BaseObject

	@errors: 
		"Crud" : [
			"Must provide a valid HTML node"
			"Must provide a valid Outline Model"
		]
	
	@extend IS.ErrorReporter

ER = OutlineControllerErrorReporter
module.exports = OutlineController
