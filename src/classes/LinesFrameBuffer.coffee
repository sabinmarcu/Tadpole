class LinesFrameBuffer extends DepMan.classes("FrameBuffer")
	constructor: (@model, @parent) -> super(); @context.strokeStyle = "#444"
	sequence: => 
		@context.clearRect 0, 0, @buffer.width, @buffer.height
		@context.beginPath()
		@drawLines @model.structure
		@context.stroke()
	drawLines: (set) =>
		for item in set.topics
			if item.children
				for kid in item.children.topics
					@drawLine item, kid
				@drawLines item.children
	drawLine: (from, to) =>
		@context.moveTo (@getX from) + 150, (@getY from) + 25
		@context.lineTo (@getX to) + 150, (@getY to) + 25


module.exports = LinesFrameBuffer
