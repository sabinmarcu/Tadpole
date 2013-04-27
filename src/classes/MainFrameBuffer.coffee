class MainFrameBuffer extends DepMan.classes("FrameBuffer")

	constructor: (buffer, @model) ->
		@offsets = x: 0, y: 0
		@triggers = 
			legend: true
			level: true
			levelno: true
			shortcuts: true
		@sizes = 
			x: 300
			y: 50
		@level = 0
		@buttons = null
		@renderers = [new (DepMan.classes "GuguFrameBuffer")(@model, @), new (DepMan.classes "AuxFrameBuffer")(@model, @), new (DepMan.classes "LinesFrameBuffer")(@model, @)]
		@Gugu = @renderers[0]; @Line = @renderers[2]; @Aux = @renderers[1]
		super buffer
		@context.textBaseline = "middle" 
		@context.font = "normal 12pt 'Open Sans'" 
		@Controller = new (DepMan.controller "Canvas")(@)

	sequence: ->
		@buffer.width = @buffer.width
		if @triggers.legend then do @drawLegend
		if @triggers.shortcuts then do @drawShortcuts
		if @triggers.level and @triggers.levelno then do @drawLevel
		@context.drawImage @Line.context.canvas, 0, 0
		@context.drawImage @Gugu.context.canvas, 0, 0

	drawLevel: =>
		@context.fillStyle = "rgba(0, 0, 0, 0.4)"
		@context.textAlign = "center"
		@context.font = "normal 24pt Verdana" 
		@context.textBaseline = "top" 
		@context.fillText @level, @buffer.width / 2, 15
		@context.font = "normal 12pt 'Open Sans'" 
		@context.textBaseline = "middle" 
		@context.textAlign = "left"

	drawLegend: =>
		@context.strokeStyle = "rgba(0, 0, 0, 0.1)"
		@context.fillStyle = "rgba(0, 135, 255, 0.4)"
		@context.fillRectR 10, @buffer.height - 25, 15, 15
		@context.strokeRectR 10, @buffer.height - 25, 15, 15
		@context.fillStyle = "rgba(255, 67, 16, 0.4)"
		@context.fillRectR 10, @buffer.height - 45, 15, 15
		@context.strokeRectR 10, @buffer.height - 45, 15, 15
		@context.fillStyle = "rgba(256, 256, 256, 0.4)"
		@context.fillRectR 10, @buffer.height - 85, 15, 15
		@context.strokeRectR 10, @buffer.height - 85, 15, 15
		@context.fillStyle = "rgba(0, 0, 0, 0.4)"
		@context.fillRectR 10, @buffer.height - 65, 15, 15
		@context.strokeRectR 10, @buffer.height - 65, 15, 15
		@context.fillText "Checked", 30, @buffer.height - 15
		@context.fillText "Unchecked", 30, @buffer.height - 35
		@context.fillText "Undeterminate", 30, @buffer.height - 55
		@context.fillText "Determinate", 30, @buffer.height - 75

	drawShortcuts: =>
		@context.fillStyle = "rgba(0, 0, 0, 0.4)"
		@context.fillText "Toggle Legend", 15, 25
		@context.fillText "Toggle Pseudo 3D Display", 15, 45
		@context.fillText "Toggle Pseudo 3D Level Display", 15, 65
		@context.fillText "Toggle Shortcuts", 15, 85
		@context.fillStyle = "rgba(255, 67, 16, 0.4)"
		@context.fillText "L", 5, 25
		@context.fillText "D", 5, 45
		@context.fillText "G", 5, 65
		@context.fillText "S", 5, 85

	_start: => 
		storage.getItem "canvasTriggers", (sets) =>
			if not sets.canvasTriggers? then storage.setItem "canvasTriggers", JSON.stringify @triggers
			else @triggers = JSON.parse sets.canvasTriggers
		do @Controller.start
		do renderer.start for renderer in @renderers

	_end: => do @Controller.end;  do renderer.end for renderer in @renderers

module.exports = MainFrameBuffer
