class GuguFrameBuffer extends DepMan.classes("FrameBuffer")

	constructor: (@model, @parent) -> 
		@currentItem = []
		super()
		@context.textBaseline = "middle" 

	sequence: =>
		@buffer.width = @buffer.width
		@drawGugus @model.structure

	drawGugus: (set) =>
		for item in set.topics
			@currentItem.push item.text
			if item.children and not item.fold then @drawGugus item.children
			@drawGugu item
			@currentItem.pop()
	drawGugu: (item) =>
		delta = 0
		delta = @parent.level - @currentItem.length + 1 if @parent.triggers?.level
		absDelta = -(Math.sqrt delta * delta)
		x = @getX item
		y = @getY item
		width = @getWidth absDelta
		height = @getHeight absDelta

		switch item.status
			when "checked" then bgcolor1 = "rgba(0, 135, 255, 1)"; bgcolor2 = "rgba(0, 100, 220, 1)"; texcolor = "rgba(256, 256, 256, 1)"; texStrokeColor = "rgba(0, 0, 0, 0)"
			when "unchecked" then bgcolor1 = "rgba(255, 67, 16, 1)"; bgcolor2 = "rgba(220, 32, 0, 1)"; texcolor = "rgba(0, 0, 0, 1)"; texStrokeColor = "rgba(0, 0 , 0, 0)"
			when "determinate" then bgcolor1 = "rgba(256, 256, 256, 1)"; bgcolor2 = "rgba(210, 210, 210, 1)"; texcolor = "rgba(0, 0, 0, 1)"; texStrokeColor = "rgba(256, 256, 256, 1)"
			else bgcolor1 = "rgba(50, 50, 50, 1)"; bgcolor2 = "rgba(0, 0, 0, 1)"; texcolor = "rgba(256, 256, 256, 1)"; texStrokeColor = "rgba(0, 0, 0, 1)"
		grad = @context.createLinearGradient x, y, x, y + height
		grad.addColorStop 0, bgcolor1
		grad.addColorStop 0.5, bgcolor1
		grad.addColorStop 1, bgcolor2
		@context.fillStyle = grad
		@context.lineWidth = 1
		@context.strokeStyle = "rgba(0, 0, 0, 1)"
		@context.fillRectR x, y, width, height
		@context.strokeRectR x, y, width, height
		text = item.text
		if text.length > 25 then text = text.substr(0, 22) + "..."
		@context.strokeStyle = texStrokeColor
		@context.font = "normal #{12 + 12 * absDelta / 4}pt Verdana" 
		@context.fillStyle = texcolor
		@context.strokeText text, x + 20, y + @getTextDelta absDelta
		@context.fillText text, x + 20, y + @getTextDelta absDelta

		# if do @verify then @drawButtons item, delta

	drawButtons: (item, delta) =>
		x = @getX item
		y = @getY item
		width = @getWidth delta
		@context.fillStyle = "white"
		@context.strokeStyle = "#444"
		@context.fillRectR x + width - 30, y + 3, 20, 20
		@context.fillRectR x + width - 30, y + 28, 20, 20
		@context.beginPath()
		@context.strokeRectR x + width - 30, y + 3, 20, 20
		@context.strokeRectR x + width - 30, y + 28, 20, 20
		@context.moveTo x + width - 25, y + 13
		@context.lineTo x + width - 15, y + 13
		@context.moveTo x + width - 20, y + 8
		@context.lineTo x + width - 20, y + 18
		@context.moveTo x + width - 25, y + 38
		@context.lineTo x + width - 15, y + 38
		@context.stroke()


	verify: =>
		return false if not @parent? or not @parent.buttons?
		return false if @parent.buttons.length isnt @currentItem.length
		for item, key in @currentItem
			if @parent.buttons[key] isnt item then return false
		return true

module.exports = GuguFrameBuffer
