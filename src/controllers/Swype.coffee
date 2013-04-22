class Swype extends BaseObject
	constructor: ->
		window.addEventListener "touchstart", @start

	start: (e) =>
		pos = @getParams e
		scope = angular.element("[ng-controller='NGAsideController']").scope()
		if pos.x <= 50 then @gesture = new GESTURES.SWYPELEFT(pos)
		else if pos.x in [50..250] and scope.sidebarstatus is "open" then @gesture = new GESTURES.SWYPERIGHT(pos)
		else if pos.x >= window.innerWidth - 50 then @gesture = new GESTURES.SWYPERIGHT(pos)

	getParams: (e) =>
		if e.touches then x: e.touches[0].pageX, y:e.touches[0].pageY
		else x: e.pageX, y:e.pageY


_gestures = ["SWYPELEFT", "SWYPERIGHT"]
GESTURES = {}
GESTURES[gest] = DepMan.gesture gest.toLowerCase() for gest in _gestures

module.exports = Swype
