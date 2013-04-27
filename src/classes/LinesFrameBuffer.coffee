class LinesFrameBuffer extends DepMan.classes("FrameBuffer")
	constructor: (@model, @parent) -> 
		@currentItem = [];
		super()

	sequence: => 
		@context.clearRect 0, 0, @buffer.width, @buffer.height
		@drawLines @model.structure

	drawLines: (set) =>
		for item in set.topics
			@currentItem.push item.text
			delta = 0
			delta = @parent.level - @currentItem.length + 1 if @parent.triggers?.level
			absDelta = -(Math.sqrt delta * delta)
			if item.children
				@drawLines item.children
				for kid in item.children.topics
					@drawLine item, kid, delta
			@currentItem.pop()

	drawLine: (from, to, delta) =>
		@context.beginPath()
		@context.strokeStyle = "rgba(0, 0, 0, #{@lineAlphaDelta delta})"
		@context.moveTo (@getX from) + (@makeValue 150, delta), (@getY from) + (@makeValue 25, delta)
		@context.lineTo (@getX to) + (@makeValue 150, delta - 1), (@getY to) + (@makeValue 25, delta - 1)
		@context.stroke()

	lineAlphaDelta: (delta) => 0.2 + 0.2 * (-Math.sqrt(delta * delta)) / 4


module.exports = LinesFrameBuffer
