class SwyperightGesture extends BaseObject

	constructor: (@init) ->
		window.addEventListener "touchmove", @move
		window.addEventListener "touchend", @end

	move: (e) =>
		if @breakup? then return
		scope = angular.element("[ng-controller='NGAsideController']").scope()
		pos = Swype.getParams e
		if @init.x - pos.x > _tolerance
			if scope.sidebarstatus is "closed"
				angular.element("[ng-controller='OPMLController']").scope().changeView()
			else
				if @init.x <= 300 then scope.asidetab null, 1
				else do scope.togglesidebar
			do scope.$apply
			do @end
	end: (e) =>
		@breakup = true
		window.removeEventListener "touchmove", @move
		window.removeEventListener "touchend", @end

_tolerance = 100

module.exports = SwyperightGesture
