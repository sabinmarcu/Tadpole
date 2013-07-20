const STATES = [\closed \open]; States = new IS.Enum STATES
const TABS = [\list \server \general \experimental]; Tabs = new IS.Enum TABS
const ICONS = [\icon-list \icon-signal \icon-gear \icon-code]

class SidebarController extends IS.Object
	~>
		@STATES = STATES; @States = States; @ICONS = ICONS; @TABS = TABS; @Tabs = Tabs
		@get-deps!
		@get-tabs!
		@render-aside!
		window.SidebarController = @

	get-deps: ~>
		require "qrcode"
		require "qrcapacitytable"
		@Client = DepMan.helper "DataTransfer"
		@Client.subscribe "CONNECTED", ~>
			@hook-image!
			@generate-image!

	hook-image: ~> @image = $ '.qrcode' .0; @canvas = document.createElement "canvas"
	generate-image: ~>
		@draw ?= new QRCodeDraw()
		@draw.draw @canvas, @Client.id, ->
		@image.setAttribute "src", @canvas.toDataURL()

	get-tabs: ~>
		@tabs = [ DepMan.render [ \sidebar \tabs tab ] for tab in TABS]

	render-aside: ~>
		div = document.createElement "div"
		div.setAttribute \rel, "Sidebar Container"
		div.setAttribute \id, \sidebar-container
		div.innerHTML = DepMan.render [ \sidebar \index ], {TABS, Tabs, States}
		$ 'section#application'
			..append div
			..0
				..addEventListener "contextmenu", ~>
					return unless @runtime.props['sidebar-state'] is States.closed
					@runtime.set 'sidebar-state', States.open
					@safeApply!
				..addEventListener "click", (e) ~>
					return if $ e.target .parents '#sidebar-container' .0
					return unless @runtime.props['sidebar-state'] is States.open
					@runtime.set 'sidebar-state', States.closed
					@safeApply!
		$ '#remote-client-id' .change (e) ~> Client.connect @scope.clientid


	init-runtime: ~>
		@runtime.init "sidebar-state", \number
		@runtime.init "sidebar-tab", \number
		tab <~ Storage.get "sidebar-tab"
		tab ?= 0
		@runtime.set "sidebar-tab", tab
		@runtime.subscribe "prop-sidebar-tab-change", ~> Storage.set "sidebar-tab", @runtime.get "sidebar-tab"

	init: (@scope, @runtime) ~>
		@config-scope!
		@init-runtime!
		@hook-keyboard!
		@scope.clientid = ""
		@scope.language = @runtime.get 'language'

	hook-keyboard: ~>
		key = if Tester.mac then "cmd" else "ctrl"
		handle = (e, tab) ~> 
			e.preventDefault!
			if (@runtime.get "sidebar-state") is States.closed then @runtime.set "sidebar-state", States.open
			@runtime.set "sidebar-tab", Tabs[tab]
			@safeApply!

		for tab in TABS then let currentTab = tab
			jwerty.key "#{key}+#{Tabs[currentTab]+1}", -> handle it, currentTab
		jwerty.key "esc", ~> if (@runtime.get "sidebar-state") is States.open then @runtime.set \sidebar-state, States.closed; @safeApply!

	config-scope: ~>
		@safeApply = (fn) ~>
			phase = @scope.$parent.$$phase
			if phase is "$apply" or phase is "$digest"
				if fn and (typeof(fn) is 'function')
					do fn
			else @scope.$apply(fn)
		@scope <<< @

	toggle-state: ~>
		@log "Toggleing state"
		if @runtime.props['sidebar-state'] is States.open then @runtime.set 'sidebar-state', States.closed
		else @runtime.set "sidebar-state", States.open

Controller = new SidebarController()
angular.module AppInfo.displayname .controller "Sidebar", ["$scope", "Runtime", Controller.init]
module.exports = Controller
