const STATES = [\landing \application \help]; States = new IS.Enum STATES
const MODALS = [\modal-inactive \modal-active \modal-active]; Modals = new IS.Enum MODALS

class PageController extends IS.Object
	# First time setup
	~>
		@set-attributes!
		@render-index!
		@log "PageController Initialized"
	set-attributes: ~>
		document.body.setAttribute "ng-csp", true
		document.body.setAttribute "ng-controller", "Page"
		window.PageController = @

	# Initialization stuff
	init: (@scope, @runtime) ~>
		# Bootstrapping the scope and other variables
		@config-scope!
		@init-runtime!
		@get-stored!

		# And now, building the interface
		@log "Initializing the PageController"
		#Loading.start();
		#Loading.progress "Loading Application"
		#Loading.progress 10
		#@safeApply!
		#Loading.end();

		# And, of course, returning the object
		@

	render-index: ~>
		d = document.createElement "div"
		d.setAttribute "id", "appwrapper"
		# Computing ng-class 
		#objects = []
		#for state in STATES
			#objects.push "#{States[state]}: '#{state}'"
		#objects-string = objects.join ", "
		#class-string = "{#objects-string}[runtime.props['app-state']]"
		# Applying it
		d.setAttribute "class", "{{computeClass()}}"
		#d.setAttribute "ng-class", class-string
		# Rendering
		d.innerHTML = DepMan.render "index", {States}
		# Appending
		document.body.insertBefore d, document.body.children[0]
	config-scope: ~>
		@safeApply = (fn) ~>
			phase = @scope.$parent.$$phase
			if phase is "$apply" or phase is "$digest"
				if fn and (typeof(fn) is 'function')
					do fn
			else @scope.$apply(fn)
		@scope <<< @
	init-runtime: ~> @runtime.init "app-state", \number
	get-stored: ~>
		@prev-state = States[\landing]
		Storage.get "app-state", (state) ~>
			@prev-state = parseInt state or States[\landing]
			@runtime.set "app-state", @prev-state
		@runtime.subscribe "prop-app-state-change", (value) ~>
			switch value
			| States[\landing] => Storage.set "app-state", States[\landing]; @log "State changed, switching to landing next time!"
			| otherwise =>
				if @prev-state is States[\landing]
					Storage.set "app-state", States[\application]
					@log "State changed, switching to app next time!"
			@log @prev-state
			@prev-state = value

	# Finally, the stuff connected with the scope (angular magic)
	get-body-state: ~> STATES[@runtime.get "app-state"]
	compute-class: ~> [STATES[@runtime.get('app-state')], MODALS[@runtime.get("modal-state")]] * " "


# Bootstrapping the whole shebang!
Controller = new PageController()
angular.module AppInfo.displayname .controller "Page", ["$scope", "Runtime", Controller.init]
module.exports = Controller
