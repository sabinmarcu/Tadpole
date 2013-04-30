class SwyperightGesture extends BaseObject

	constructor: (@init) ->
		window.addEventListener "touchmove", @move
		window.addEventListener "touchend", @end

	move: (e) =>
		if @breakup? then return
		appscope = angular.element("[ng-controller='NGAsideController']").scope()
		docscope = angular.element("[ng-controller='OPMLController']").scope()
		pos = Swype.getParams e
		if @init.x - pos.x > _tolerance
			if appscope.sidebarstatus is "closed"
				return if docscope.view is "mindmap"
				do docscope.toggleSidebar
			else
				if @init.x <= 300 then appscope.asidetab null, 1
				else do appscope.togglesidebar
			do appscope.safeApply
			do @end
	end: (e) =>
		@breakup = true
		window.removeEventListener "touchmove", @move
		window.removeEventListener "touchend", @end

_tolerance = 100

module.exports = SwyperightGesture
