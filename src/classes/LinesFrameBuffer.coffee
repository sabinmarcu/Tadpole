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
			if item.children
				@drawLines item.children
				for kid in item.children.topics
					@drawLine item, kid
			@currentItem.pop()

	drawLine: (from, to) =>
		@context.beginPath()
		delta = 0
		sdelta = 0
		absDelta = 0
		if @parent.triggers?.level
			delta = @parent.level - @currentItem.length + 1
			absDelta = -(Math.sqrt delta * delta)
			sdelta = -(Math.sqrt (delta - 1) * (delta - 1))
		@context.strokeStyle = "rgba(0, 0, 0, #{@lineAlphaDelta delta})"
		@context.moveTo (@getX from) + (@makeValue 150, absDelta), (@getY from) + (@makeValue 25, absDelta)
		@context.lineTo (@getX to) + (@makeValue 150, sdelta), (@getY to) + (@makeValue 25, sdelta)
		@context.stroke()

	lineAlphaDelta: (delta) => 0.2 + 0.2 * (-Math.sqrt(delta * delta)) / 4


module.exports = LinesFrameBuffer
