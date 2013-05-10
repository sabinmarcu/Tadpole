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
			if item.children and not item.fold
				@drawLines item.children
				for kid in item.children.topics
					@drawLine item, kid
			@currentItem.pop()

	drawLine: (from, to) =>
		drawData = 
			from: from
			to: to
		do (drawData) => @parent.getThemeFunction "line", @, drawData

	lineAlphaDelta: (delta) => 0.2 + 0.2 * (-Math.sqrt(delta * delta)) / 4


module.exports = LinesFrameBuffer
