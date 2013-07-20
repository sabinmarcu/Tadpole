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
		jwerty.key "#{key}+[", ~> handle it, \mindmap
		jwerty.key "#{key}+]", ~> handle it, \outline
		jwerty.key "#{key}+tab", ~> handle it

	config-scope: ~>
		@safeApply = (fn) ~>
			phase = @scope.$parent.$$phase
			if phase is "$apply" or phase is "$digest"
				if fn and (typeof(fn) is 'function')
					do fn
			else @scope.$apply(fn)
		@scope <<< @

	switch: (id) ~> @runtime.set 'active-document', id

	get-active-document: ~> 
		@scope.active-document = @models._reccords[@runtime.get 'active-document']
		@runtime.set 'document-state', States.outline
		@safeApply!

Controller = new DocumentController()
angular.module AppInfo.displayname .controller "Document", ["$scope", "Runtime", "Documents", Controller.init]
module.exports = Controller
