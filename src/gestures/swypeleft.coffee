class SwypeleftGesture extends BaseObject

	constructor: (@init) ->
		window.addEventListener "touchmove", @move
		window.addEventListener "touchend", @end

	move: (e) =>
		if @breakup? then return
		appscope = angular.element("[ng-controller='NGAsideController']").scope()
		docscope = angular.element("[ng-controller='OPMLController']").scope()
		pos = Swype.getParams e
		if pos.x - @init.x > _tolerance
			if appscope.sidebarstatus is "open"
				appscope.asidetab null, -1
			else
				return if docscope.view is "mindmap"
				if docscope.sidebarstatus then do docscope.toggleSidebar
				else do appscope.togglesidebar
			do appscope.$apply
			do @end 

	end: (e) =>
		@breakup = true
		window.removeEventListener "touchmove", @move
		window.removeEventListener "touchend", @end

_tolerance = 100

module.exports = SwypeleftGesture
