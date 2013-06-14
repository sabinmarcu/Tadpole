class TiltMechanics extends BaseObject
	constructor: ->
		window.addEventListener "deviceorientation", @handler, true

	handler: (e) => 
		@log e.gamma
		styles = ["webkitTransform", "transform"]
		for prop in styles
			zoom = 1 + e.gamma / 180 * 10
			if canvas.style[prop]? then canvas.style[prop] = "rotateY(#{-e.gamma}deg) rotateX(#{-e.beta}deg)"
			@log prop, canvas.style[prop], canvas.style, canvas.style[prop]?, e.gamma

module.exports = -> window.Tilt = new TiltMechanics()