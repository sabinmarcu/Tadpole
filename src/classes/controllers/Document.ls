const STATES = [\outline \mindmap]; States = new IS.Enum STATES
const AUXSTATES = [\sidebaropen \sidebarclosed]; Aux-states = new IS.Enum AUXSTATES

angular.module AppInfo.displayname .directive "ngcFocus", [\$parse, ($parse) ->
	(scope, element, attr) -> 
		fn = $parse attr['ngcFocus']
		element.bind \focus, (e) ->
			scope.$apply -> fn scope, {$event: e}
]

class DocumentController extends IS.Object
	~>
		@log "Document Controller Online"
		window.DocumentController = @
		@STATES = STATES; @States = States
		@AUXSTATES = STATES; @AuxStates = AuxStates
		@render-document-template!
		Client?.events = 
			"node.change": (...args) ~> @passthrough @node-change, args
			"node.add": (...args) ~> @passthrough @node-add, args
			"node.add-root": (...args) ~> @passthrough @node-add-root, args
			"node.remove": (...args) ~> @passthrough @node-remove, args
		Client?.loadEvents!

	node-change: (index, property, value) ~>
		@log "Changing #{index}'s #{property} to #{value}"
		node = @fetch-node index
		node[property] = value
		if property is \status then @propagate-change node
		@safeApply!

	replicate: (node, property) ~> @prep 'node.change', node.$index, property, node[property]
	add: (node) ~> @node-add node.$index; @prep 'node.add', node.$index
	remove: (node) ~> @node-remove node.$index; @prep 'node.remove', node.$index
	fetch-document: ~>  @models._reccords[@runtime.props['active-document']]
	fetch-node: (index) ~> @fetch-document!.indexes[index-1]

	node-add: (index) ~>
		node = @fetch-node index
		node.children ?= []
		node.children.push {text: "New Node"}
		node.status = \indeterminate
		@fetch-document!.refresh!
		@safe-apply!
		setTimeout LanguageHelper._translateAll, 50

	node-add-root: (init = false) ~> 
		doc = @fetch-document!
		if doc then
			doc.data.push text: "New Root Document"
			doc.refresh!
			@safe-apply!
			setTimeout LanguageHelper._translateAll, 50
			unless init 
				@prep "node.add-root", true
		else @models.new!

	node-remove: (index) ~>
		node = @fetch-node index
		repo = node.$parent.children or node.$parent.data
		repo.splice repo.indexOf node, 1
		if repo.length is 0 and node.$parent.children
			node.$parent.children = null
			node.$parent.status = \unchecked
		@fetch-document!.refresh!
		@safe-apply!


	passthrough: (fn, args) ~>
		id = args.pop!
		if id isnt Client.id then fn.apply @, args

	prep: (ev, ...data) ~>
		data.push Client.id
		data.unshift ev
		Client.publish.apply Client, data 

	render-document-template: ~>
		div = document.create-element "div"
		div.setAttribute "rel", "Main Document Placeholder"
		div.setAttribute "id", "documentplaceholder"
		div.innerHTML = DepMan.render [\document \index], {Aux-states}
		$ div .insertBefore ($ 'section#application' .children![0])

	init-runtime: ~>
		@runtime.init "document-state", \number

	init: (@scope, @runtime, @models) ~>
		@config-scope!
		@init-runtime!
		@hook-keyboard!
		@runtime.subscribe 'prop-active-document-change', @get-active-document
		@get-active-document!

	hook-keyboard: ~>
		key = if Tester.mac then "cmd" else "ctrl"
		handle = (e, way = null) ~>
			e.preventDefault!
			if way then @runtime.set "document-state", States[way]
			else if @runtime.props[\document-state] is States.outline then @runtime.set \document-state, States.mindmap
			else @runtime.set \document-state, States.outline
			@safe-apply!
		jwerty.key "#{key}+]", ~> handle it, \mindmap
		jwerty.key "#{key}+[", ~> handle it, \outline
		jwerty.key "#{key}+alt+tab", ~> handle it

	config-scope: ~>
		@safeApply = (fn) ~>
			phase = @scope.$parent.$$phase
			if phase is "$apply" or phase is "$digest"
				if fn and (typeof(fn) is 'function')
					do fn
			else @scope.$apply(fn)
			LanguageHelper._translateAll!
		@scope <<< @

	switch: (id) ~> @runtime.set 'active-document', id

	get-active-document: ~> 
		@scope.active-document = @models._reccords[@runtime.get 'active-document']
		@runtime.set 'document-state', States.outline
		@safeApply!

	get-styles: (node) ~>
		padding-left: node.$depth * 50 + 25

	change-status: (node, preventBubble = false) ~>
		oldstatus = node.status
		let @ = node
			if @children and @children.length > 0
				det = 0
				for kid in @children
					if kid.status in [\checked \determinate] then det++
				if det is @children.length then @status = \determinate
				else @status = \indeterminate
			else 
				if @$status then @status = \checked
				else @status = \unchecked
		unless node.status is oldstatus
			unless preventBubble
				@replicate node, \status
				@propagate-change node
				@safeApply!

	propagate-change: (node) ~>
		while node
			if node.$parent then node = node.$parent
			else break
			@change-status node, true
		@safeApply!

	refresh: ~> @fetch-document!.refresh!


Controller = new DocumentController()
angular.module AppInfo.displayname .controller "Document", ["$scope", "Runtime", "Documents", Controller.init]
module.exports = Controller
