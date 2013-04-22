class GuguFrameBuffer extends DepMan.classes("FrameBuffer")
	constructor: (@model, @parent) -> 
		super()
		@context.textBaseline = "middle" 
		@context.font = "normal 12pt Verdana"
	sequence: ->
		@buffer.width = @buffer.width
		@drawGugus @model.structure
	drawGugus: (set) ->
		for item in set.topics
			@drawGugu item
			if item.children then @drawGugus item.children
	drawGugu: (item) ->
		gradient = @context.createLinearGradient (@getX item), (@getY item), (@getX item), (@getY item) + 50
		switch item.status
			when "checked" then @context.fillStyle = "rgb(0, 135, 255)"; texcolor = "black"; texStrokeColor = "rgba(0, 0, 0, 0)"
			when "unchecked" then @context.fillStyle = "rgb(255, 67, 16)"; texcolor = "black"; texStrokeColor = "rgba(0, 0 ,0 ,0)"
			when "determinate" then @context.fillStyle = "white"; texcolor = "black"; texStrokeColor = "white"
			else @context.fillStyle = "black"; texcolor = "white"; texStrokeColor = "black"
		@context.fillRectR (@getX item), (@getY item), 300, 50
		@context.lineWidth = 1
		@context.strokeStyle = "white"
		@context.strokeRectR (@getX item), (@getY item), 300, 50
		text = item.text
		if text.length > 40 then text = text.substr(0, 37) + "..."
		@context.strokeStyle = texStrokeColor
		@context.strokeText text, (@getX item) + 25, (@getY item) + 25
		@context.fillStyle = texcolor
		@context.fillText text, (@getX item) + 25, (@getY item) + 25

module.exports = GuguFrameBuffer
