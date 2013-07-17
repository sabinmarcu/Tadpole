const STATES = [\closed \open]; States = new IS.Enum STATES
const TABS = [\list \server \general \experimental]; Tabs = new IS.Enum TABS
const ICONS = [\icon-list \icon-signal \icon-gear \icon-code]

class SidebarController extends IS.Object
	~>
		@STATES = STATES; @States = States; @ICONS = ICONS; @TABS = TABS; @Tabs = Tabs
		@get-tabs!
		@render-aside!
		window.SidebarController = @

	get-tabs: ~>
		@tabs = [ DepMan.render [ \sidebar \tabs tab ] for tab in TABS]

	render-aside: ~>
		div = document.createElement "div"
		div.setAttribute \rel, "Sidebar Container"
		div.setAttribute \id, \sidebar-container
		div.innerHTML = DepMan.render [ \sidebar \index ], {TABS, Tabs}
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

	config-scope: ~>
		@safeApply = (fn) ~>
			phase = @scope.$parent.$$phase
			if phase is "$apply" or phase is "$digest"
				if fn and (typeof(fn) is 'function')
					do fn
			else @scope.$apply(fn)
		@scope <<< @

Controller = new SidebarController()
angular.module AppInfo.displayname .controller "Sidebar", ["$scope", "Runtime", Controller.init]
module.exports = Controller
