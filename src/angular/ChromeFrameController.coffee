angular.module("Arrow").controller "ChromeFrameController", ($scope) ->
	win = chrome.app.window.current()
	$scope.minimise = ->
		if win.isMinimized() then win.restore()
		else win.minimize()
	$scope.maximise = ->
		if win.isMaximized() then win.restore()
		else win.maximize()
	$scope.close = -> win.close()
	panel = jQuery("#chromepanel")[0]
	movedata = null
	panel.addEventListener "mousedown", (e) ->
		bounds = win.getBounds()
		movedata = x: e.screenX - bounds.left, y: e.screenY - bounds.top
	window.addEventListener "mousemove", (e) ->
		if movedata?
			win.moveTo e.screenX - movedata.x, e.screenY - movedata.y
	window.addEventListener "mouseup", (e) -> movedata = null
