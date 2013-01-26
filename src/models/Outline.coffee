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
	constructor: (bodyElement, @parent) ->
		@topics = do =>
			new Outline element, @ for element in bodyElement when element.tagName is "outline"

class Outline
	constructor: (xmlDoc, @parent) ->
		@[what] = new IS.Variable for what in _params
		@status.getFormatted = => _map[@status.get()]
		_checkParam @text, "text", xmlDoc
		_checkParam @status, "_status", xmlDoc
		_checkParam @note, "_note", xmlDoc
		_children = new OutlineCollection xmlDoc.childNodes, @
		@children.set (if _children.topics.length then _children else null)


module.exports =
	Collection: OutlineCollection
	Element: Outline
	generate: (xml) -> new OutlineCollection xml.getElementsByTagName("body")[0].childNodes
