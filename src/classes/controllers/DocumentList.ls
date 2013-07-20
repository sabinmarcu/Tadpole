class DocumentListController extends IS.Object
	~>
		@log "DocumentList Controller Online"
		window.DocumentListController = @
		@render-list-template!

	render-list-template: ~>
		div = document.create-element "div"
		div.setAttribute "rel", "Documents List Placeholder"
		div.setAttribute "id", "documentlistplaceholder"
		div.innerHTML = DepMan.render [\document \list]
		$ '#sidebar-container section section' .children()[0] .appendChild div

	init: (@scope, @runtime, @models) ~>
		@config-scope!
		@hook-keyboard!

	hook-keyboard: ~>
		key = if Tester.mac then "cmd" else "ctrl"
		handle = (e, key) ~>
			e.preventDefault!
			switch key
			| \new => @add-document!
			| \next, \previous => 
				return if @runtime.props['sidebar-state'] is 0 or @runtime.props['sidebar-tab'] isnt 0
				current = @models.documents.indexOf @runtime.props['active-document']
				if key is \next and current + 1 < @models.documents.length then current += 1
				if key is \previous and current - 1 > 0 then current -= 1
				@runtime.set 'active-document', @models.documents[current]
			| \save => @log "Save not implemented"

		jwerty.key "#{key}+alt+n", ~> @log "N"; handle it, \new
		jwerty.key "#{key}+arrow-down", ~> handle it, \next
		jwerty.key "#{key}+arrow-up", ~> handle it, \previous
		jwerty.key "#{key}+s", ~> handle it, \save
		@log "Handled!"

	config-scope: ~>
		@safeApply = (fn) ~>
			phase = @scope.$parent.$$phase
			if phase is "$apply" or phase is "$digest"
				if fn and (typeof(fn) is 'function')
					do fn
			else @scope.$apply(fn)
		@scope <<< @

	add-document: ~> @models.new!
	switch: ~> @runtime.set 'active-document', it

Controller = new DocumentListController()
angular.module AppInfo.displayname .controller "DocumentList", ["$scope", "Runtime", "Documents", Controller.init]
module.exports = Controller
