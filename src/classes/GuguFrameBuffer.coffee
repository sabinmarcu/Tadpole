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
		drawData = 
			item: item
			delta: delta
			absDelta: absDelta
			x: @getX item
			y: @getY item
			width: @getWidth absDelta
			height: @getHeight absDelta
		do (drawData) => @parent.getThemeFunction "gugu", @, drawData

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
