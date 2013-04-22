COLORS = new IS.Enum ["R", "G", "B"]

class AuxFrameBuffer extends DepMan.classes("GuguFrameBuffer")
	sequence: =>
		@linkBack = {}
		@lastColor = [0, 0, 1]
		@context.clearRect 0, 0, @buffer.width, @buffer.height
		@context.fillStyle = "black"
		@context.fillRect 0, 0, @buffer.width, @buffer.height
		@drawGugus @model.structure

	drawGugu: (item) ->
		path = item.getPath()
		code = "#{@lastColor[COLORS.R]}, #{@lastColor[COLORS.G]}, #{@lastColor[COLORS.B]}"
		@linkBack[code] = path
		@context.fillStyle = "rgb(#{code})"
		do @upColor
		@context.fillRectR (@getX item), (@getY item), 300, 50

	upColor: =>
		@lastColor[COLORS.B] += 1
		if @lastColor[COLORS.B] > 255
			@lastColor[COLORS.B] = 0
			@lastColor[COLORS.G] += 1
		if @lastColor[COLORS.G] > 255
			@lastColor[COLORS.G] = 0
			@lastColor[COLORS.R] += 1

	scan: (pos) =>
		img = ( @context.getImageData pos.x, pos.y, 1, 1 ).data
		@getLink "#{ img[0] }, #{ img[1] }, #{ img[2] }", @linkBack


	getLink: (which) => @linkBack[which] or null
		

module.exports = AuxFrameBuffer
