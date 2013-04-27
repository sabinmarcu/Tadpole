class GuguFrameBuffer extends DepMan.classes("FrameBuffer")

	constructor: (@model, @parent) -> 
		@currentItem = []
		super()
		@context.textBaseline = "middle" 
		# @context.font = "normal 12pt Verdana" 

	sequence: =>
		@buffer.width = @buffer.width
		@drawGugus @model.structure

	drawGugus: (set) =>
		for item in set.topics
			@currentItem.push item.text
			if item.children then @drawGugus item.children
			@drawGugu item
			@currentItem.pop()
	drawGugu: (item) =>
		delta = 0
		delta = @parent.level - @currentItem.length + 1 if @parent.triggers?.level
		absDelta = -(Math.sqrt delta * delta)

		switch item.status
			when "checked" then @context.fillStyle = "rgba(0, 135, 255, #{@alphaDelta absDelta})"; texcolor = "rgba(256, 256, 256, #{@alphaDelta absDelta})"; texStrokeColor = "rgba(0, 0, 0, 0)"
			when "unchecked" then @context.fillStyle = "rgba(255, 67, 16, #{@alphaDelta absDelta})"; texcolor = "rgba(0, 0, 0, #{@alphaDelta absDelta})"; texStrokeColor = "rgba(0, 0 , 0, 0)"
			when "determinate" then @context.fillStyle = "rgba(256, 256, 256, #{@alphaDelta absDelta})"; texcolor = "rgba(0, 0, 0, #{@alphaDelta absDelta})"; texStrokeColor = "rgba(256, 256, 256, #{@alphaDelta absDelta})"
			else @context.fillStyle = "rgba(0, 0, 0, #{@alphaDelta absDelta})"; texcolor = "rgba(256, 256, 256, #{@alphaDelta absDelta})"; texStrokeColor = "rgba(0, 0, 0, #{@alphaDelta absDelta})"
		@context.lineWidth = 1
		@context.strokeStyle = "rgba(0, 0, 0, #{@alphaDelta absDelta})"
		@context.fillRectR (@getX item), (@getY item), (@getWidth absDelta), (@getHeight absDelta)
		@context.strokeRectR (@getX item), (@getY item), (@getWidth absDelta), (@getHeight absDelta)
		text = item.text
		if text.length > 25 then text = text.substr(0, 22) + "..."
		@context.strokeStyle = texStrokeColor
		@context.font = "normal #{12 + 12 * absDelta / 4}pt Verdana" 
		@context.fillStyle = texcolor
		@context.strokeText text, (@getX item) + 20, (@getY item) + @getTextDelta absDelta
		@context.fillText text, (@getX item) + 20, (@getY item) + @getTextDelta absDelta

		# if do @verify then @drawButtons item, delta

	drawButtons: (item, delta) =>
		@context.fillStyle = "white"
		@context.strokeStyle = "#444"
		@context.fillRectR (@getX item) + (@getWidth delta) - 30, (@getY item) + 3, 20, 20
		@context.fillRectR (@getX item) + (@getWidth delta) - 30, (@getY item) + 28, 20, 20
		@context.beginPath()
		@context.strokeRectR (@getX item) + (@getWidth delta) - 30, (@getY item) + 3, 20, 20
		@context.strokeRectR (@getX item) + (@getWidth delta) - 30, (@getY item) + 28, 20, 20
		@context.moveTo (@getX item) + (@getWidth delta) - 25, (@getY item) + 13
		@context.lineTo (@getX item) + (@getWidth delta) - 15, (@getY item) + 13
		@context.moveTo (@getX item) + (@getWidth delta) - 20, (@getY item) + 8
		@context.lineTo (@getX item) + (@getWidth delta) - 20, (@getY item) + 18
		@context.moveTo (@getX item) + (@getWidth delta) - 25, (@getY item) + 38
		@context.lineTo (@getX item) + (@getWidth delta) - 15, (@getY item) + 38
		@context.stroke()


	verify: =>
		return false if not @parent? or not @parent.buttons?
		return false if @parent.buttons.length isnt @currentItem.length
		for item, key in @currentItem
			if @parent.buttons[key] isnt item then return false
		return true

module.exports = GuguFrameBuffer
