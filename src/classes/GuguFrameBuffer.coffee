class GuguFrameBuffer extends DepMan.classes("FrameBuffer")
	constructor: (@model) -> 
		super()
		@context.textAlign = "center"
		@context.textBaseline = "middle" 
	sequence: -> @drawGugus @model.structure
	drawGugus: (set) ->
		for item in set.topics
			@drawGugu item
			if item.children then @drawGugus item.children
	drawGugu: (item) ->
		gradient = @context.createLinearGradient item.x, item.y, item.x + 300, item.y + 50
		gradient.addColorStop 0, "white"
		gradient.addColorStop 0.3, "#eee"
		gradient.addColorStop 1, "#eee"
		@context.fillStyle = gradient
		@context.fillRectR item.x, item.y, 300, 50
		@context.fillStyle = "black"
		@context.fillText item.text, item.x + 75, item.y + 25


module.exports = GuguFrameBuffer