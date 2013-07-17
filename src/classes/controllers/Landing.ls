const STATES = [\main \readmore]; States = new IS.Enum STATES

class LandingController extends IS.Object
	~>
		@set-attributes!

	init-runtime: ~>
		@runtime.init "landing-state", \number

	set-attributes: ~>
		objects = []
		for state in STATES
			objects.push "#{States[state]}: '#state'"
		$ '#landingaside' .attr "ng-class", "{ #{objects*', '} }[runtime.props['landing-state']]"

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

Controller = new LandingController()
angular.module AppInfo.displayname .controller "Landing", ["$scope", "Runtime", Controller.init]
module.exports = Controller
