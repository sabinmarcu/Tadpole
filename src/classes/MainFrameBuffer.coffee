class MainFrameBuffer extends DepMan.classes("FrameBuffer")

	constructor: (buffer, model) ->
		@Gugu = new (DepMan.classes "GuguFrameBuffer")(model)
		# @Aux = new (DepMan.classes "AuxFrameBuffer")()
		@Line = new (DepMan.classes "LinesFrameBuffer")(model)
		super buffer

	sequence: ->
		@context.fillStyle = "black"
		@context.fillRect 0, 0, @buffer.width, @buffer.height 
		@context.drawImage @Line.context.canvas, 0, 0
		@context.drawImage @Gugu.context.canvas, 0, 0

	_start: -> 
		@Line.start()
		@Gugu.start()

	_end: -> 
		@Line.end()
		@Gugu.end()



module.exports = MainFrameBuffer