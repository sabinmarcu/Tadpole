class SwypeleftGesture extends BaseObject

	constructor: (@init) ->
		window.addEventListener "touchmove", @move
		window.addEventListener "touchend", @end

	move: (e) =>
		if @breakup? then return
		scope = angular.element("[ng-controller='NGAsideController']").scope()
		pos = Swype.getParams e
		if pos.x - @init.x > _tolerance
			if scope.sidebarstatus is "open"
				scope.asidetab null, -1
			else
				do scope.togglesidebar
			do scope.$apply
			do @end 

	end: (e) =>
		@breakup = true
		window.removeEventListener "touchmove", @move
		window.removeEventListener "touchend", @end

_tolerance = 100

module.exports = SwypeleftGesture
