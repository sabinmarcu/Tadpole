_map =
	unchecked: "icon-check-empty"
	checked: "icon-check"
	determinate: "icon-circle"
	indeterminate: "icon-circle-blank"

_params     = [ "status", "note", "text", "children" ]
_checkParam = (field, param, from) ->
	value = from.getAttribute(param) or null
	field.set value

class OutlineCollection extends BaseObject
	constructor: (bodyElement, @parent, @depth = 0) ->
		@e = document.createElement "div"
		@e.className = "container"
		@topics = do =>
			new Outline element, @ for element in bodyElement when element.tagName is "outline"
	render: (pe) =>
		pe.appendChild @e
		do kid.render for kid in @topics


class Outline
	constructor: (xmlDoc, @parent) ->
		@getData xmlDoc

	getData: (xmlDoc) =>
		@[what] = new IS.Variable for what in _params
		@status.getFormatted = => _map[@status.get()]
		_checkParam @text, "text", xmlDoc
		_checkParam @status, "_status", xmlDoc
		_checkParam @note, "_note", xmlDoc
		_children = new OutlineCollection xmlDoc.childNodes, @, @parent.depth + 1
		@children.set (if _children.topics.length then _children else null)

	render: =>
		@e = document.createElement "div"
		hasChildren = @children.get() or null
		if hasChildren then klass = " noborder" else klass = ""
		@e.setAttribute "class", "row#{klass}"
		@e.setAttribute "style", "padding-left: #{50 * (@parent.depth + 1)}px; margin-left: -#{50 * @parent.depth}px"
		if not hasChildren then klass = "hidden" else klass = ""
		@e.innerHTML = DepMan.render "outline", hidden: klass, item: @
		if hasChildren?
			e = document.createElement "div"
			e.setAttribute "class", "row bordertop"
			e.setAttribute "style", "padding-left: #{50 * ( @parent.depth + 1 )}px; margin-left: -#{50 * (@parent.depth + 1)}px"
			@children.get().render e
			@e.appendChild e
		if window.isMobile?
			nav = document.createElement "nav"
			@controls =
				add: document.createElement "li"
				remove: document.createElement "li"
			@controls.add.innerHTML = "<i class='icon-plus'>"
			@controls.remove.innerHTML = "<i class='icon-remove'>"
			nav.appendChild @controls.add
			nav.appendChild @controls.remove
			@e.appendChild nav
		outlinecntrl = new (DepMan.controller "Outline")(@e, @)
		rendercntrl = new (DepMan.controller "OutlineRender")(@e, @)
		@controller = @e.controller = outlinecntrl
		@rcontroller = @e.rcontroller = rendercntrl
		@parent.e.appendChild @e

	delete: =>	@parent.topics.splice @model.topics.indexOf(@), 1
	update: (prop, value) =>
		throw ER.generate 1 if not @[prop]?
		@[prop].set value

class OutlineErrorReporter extends BaseObject

	@errors: 
		"UpdateError": ["Must give a proper property to update!"]

ER = OutlineErrorReporter


module.exports =
	Collection: OutlineCollection
	Element: Outline
	generate: (xml) -> new OutlineCollection xml.getElementsByTagName("body")[0].childNodes
