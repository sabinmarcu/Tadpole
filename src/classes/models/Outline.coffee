_map =
	unchecked: "icon-check-empty"
	checked: "icon-check"
	determinate: "icon-circle"
	indeterminate: "icon-circle-blank"

_params     = [ "status", "note", "text", "children" ]
_checkParam = (object, field, param, from) -> object[field] = from.getAttribute(param) or ""

class OutlineCollection extends BaseObject
	constructor: (bodyElement = null, @parent, @depth = 0) ->
		if not bodyElement then @topics = [] 
		else @topics = do =>
			new Outline element, @ for element in bodyElement when element.tagName is "outline"
	remove: (item) -> @topics.splice (@topics.indexOf item), 1
	getPath: -> 
		if not @parent? then return []
		return do @parent.getPath

class FakeOutline
	constructor: (length) ->
		@text = "New Node"
		@_status = "unchecked"
		@childNodes = []
		@x = length.x
		@y = length.y
	getAttribute: (attr) -> @[attr] or null

class Outline
	constructor: (xmlDoc = null, @parent, length) ->
		xmlDoc ?= new FakeOutline(length)
		@getData xmlDoc
		@_map = _map
		
	getPath: =>
		prev = do @parent.getPath
		prev.push @text
		return prev

	getData: (xmlDoc) =>
		@fold = false
		@[what] = null for what in _params
		_checkParam @, "text", "text", xmlDoc
		@_text = @text
		_checkParam @, "status", "_status", xmlDoc
		_checkParam @, "note", "_note", xmlDoc
		_checkParam @, "x", "_x", xmlDoc
		_checkParam @, "y", "_y", xmlDoc
		@x = parseInt(@x) if @x isnt ""; @y = parseInt(@y) if @y isnt ""
		_children = new OutlineCollection xmlDoc.childNodes, @, @parent.depth + 1
		@children = (if _children.topics.length then _children else null)
		if @status is ""
			if not (@children? and @children.topics.length) then @status = "unchecked"

	getStatus: => 
		if @children? and @children.topics.length
			done = 1
			for kid in @children.topics
				if not (kid.status in ["checked", "determinate"])
					@status = "indeterminate"
					done = 0
					break
			@status = "determinate" if done
		else if @status in ["determinate", "indeterminate"] then @status = "unchecked"
		_map[@status]

	addChild: (length) =>
		if not @children? then @children = new OutlineCollection false, @, @parent.depth + 1
		@children.topics.push new Outline null, @children, length
		

class OutlineErrorReporter extends BaseObject

	@errors: 
		"UpdateError": ["Must give a proper property to update!"]

ER = OutlineErrorReporter


module.exports =
	Collection: OutlineCollection
	Element: Outline
	generate: (xml) -> new OutlineCollection xml.getElementsByTagName("body")[0].childNodes
