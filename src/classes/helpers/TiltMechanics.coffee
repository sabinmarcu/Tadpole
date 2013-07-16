class TiltMechanics extends BaseObject
	constructor: ->
		window.addEventListener "deviceorientation", @handler, true

	handler: (e) => 
		@log e.gamma
		styles = ["webkitTransform", "transform"]
		for prop in styles
			values =
				x: 1 + Math.sin(e.gamma) 
				y: 1 + Math.sin(e.beta)
			if canvas.style[prop]? then canvas.style[prop] = "scaleY(#{values.y}) scaleX(#{values.x})"
			@log prop, canvas.style[prop], canvas.style, canvas.style[prop]?, e.gamma

module.exports = -> window.Tilt = new TiltMechanics()
