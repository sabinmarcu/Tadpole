module.exports = 
	name: "blue"
	line: (drawData) ->
		@context.beginPath()
		delta = 0
		sdelta = 0
		absDelta = 0
		if @parent.triggers?.level
			delta = @parent.level - @currentItem.length + 1
			absDelta = -(Math.sqrt delta * delta)
			sdelta = -(Math.sqrt (delta - 1) * (delta - 1))
		@context.strokeStyle = "rgba(256, 256, 256, #{@lineAlphaDelta delta})"
		@context.moveTo (@getX drawData.from) + (@makeValue 150, absDelta), (@getY drawData.from) + (@makeValue 25, absDelta)
		@context.lineTo (@getX drawData.to) + (@makeValue 150, sdelta), (@getY drawData.to) + (@makeValue 25, sdelta)
		@context.stroke()
	background: ->
		@context.fillStyle = "rgb(0, 132, 255)"
		@context.fillRect 0, 0, @buffer.width, @buffer.height
		grad = @context.createLinearGradient 0, @buffer.height - 50, 0, @buffer.height
		grad.addColorStop 0, "rgba(0, 0, 0, 0)"
		grad.addColorStop 1, "rgba(0, 0, 0, 0.2)"
		@context.fillStyle = grad
		@context.fillRect 0, @buffer.height - 50, @buffer.width, 50
		max = @buffer.width; if @buffer.height > max then max = @buffer.height
		grad = @context.createRadialGradient @buffer.width / 2, @buffer.height / 2, 5, @buffer.width / 2, @buffer.height / 2, max / 2
		grad.addColorStop 0, "rgba(256, 256, 256, 0.1)"
		grad.addColorStop 1, "rgba(0, 0, 0, 0.1)"
		@context.fillStyle = grad
		@context.fillRect 0, 0, @buffer.width, @buffer.height
	gugu: (drawData) ->

		@context.lineWidth = 1
		@context.fillStyle = "rgb(0, 132, 255)"
		@context.fillRectR drawData.x - 1, drawData.y + 1, drawData.width, drawData.height
		@context.strokeStyle = "rgba(0, 0, 0, 0.2)"
		@context.strokeRectR drawData.x - 1, drawData.y + 1, drawData.width, drawData.height
		@context.strokeStyle = "rgba(256, 256, 256, 0.7)"
		@context.strokeRectR drawData.x , drawData.y , drawData.width, drawData.height
		text = drawData.item.text

		if text.length > 25 then text = text.substr(0, 22) + "..."
		@context.font = "normal #{12 + 12 * drawData.absDelta / 4}pt Verdana" 
		@context.fillStyle = "rgb(0, 132, 255)"
		@context.fillText text, drawData.x + 19, drawData.y + @getTextDelta drawData.absDelta
		@context.fillStyle = "rgba(256, 256, 256, 0.7)"
		@context.fillText text, drawData.x + 20, drawData.y + @getTextDelta drawData.absDelta