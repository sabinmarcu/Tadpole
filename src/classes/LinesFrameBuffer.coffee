class LinesFrameBuffer extends DepMan.classes("FrameBuffer")
	constructor: (@model) -> super(); @context.strokeStyle = "#444"
	sequence: -> @drawLines @model.structure
	drawLines: (set) ->
		for item in set.topics
			if item.children
				for kid in item.children.topics
					@drawLine item, kid
				@drawLines item.children
	drawLine: (from, to) ->
		@context.beginPath()
		@context.moveTo from.x + 150, from.y + 25
		@context.lineTo to.x + 150, to.y + 25
		@context.stroke()


module.exports = LinesFrameBuffer