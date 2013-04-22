class MainFrameBuffer extends DepMan.classes("FrameBuffer")

	constructor: (buffer, @model) ->
		@Gugu = new (DepMan.classes "GuguFrameBuffer")(model, @)
		@Aux = new (DepMan.classes "AuxFrameBuffer")(model, @)
		@Line = new (DepMan.classes "LinesFrameBuffer")(model, @)
		@renderers = [@Gugu, @Line]
		@offsets = x: 0, y: 0
		super buffer
		@buffer.addEventListener "mousedown", @down
		@buffer.addEventListener "mouseup", @up
		@buffer.addEventListener "mousemove", @move
		@buffer.addEventListener "touchstart", @down
		@buffer.addEventListener "touchend", @up
		@buffer.addEventListener "touchmove", @move
		$(@buffer).css("background", "black")


	down: (e) =>
		@init = @getPos e
		do @Aux.sequence
		@node = @Aux.scan @init
		if not @node
			@initOffset = x: @offsets.x, y: @offsets.y
		else
			node = []
			node.push item for item in @node
			node = @model.findNode node
			@initOffset = x: node.x, y: node.y
		do @start
	up: (e) =>
		@init = null
		@node = null
		do @end
	move: (e) =>
		return null if not @init?
		pos = @getPos e
		if @node then @model.move @node,
			x: @initOffset.x + pos.x - @init.x
			y: @initOffset.y + pos.y - @init.y
		else @offsets = x: pos.x - @init.x + @initOffset.x, y: pos.y - @init.y + @initOffset.y

	getPos: (e) =>
		if e.touches then e = e.touches[0]
		x: e.pageX, y: e.pageY

	sequence: ->
		@buffer.width = @buffer.width
		do renderer.sequence for renderer in @renderers
		@context.drawImage @Line.context.canvas, 0, 0
		@context.drawImage @Gugu.context.canvas, 0, 0


module.exports = MainFrameBuffer
