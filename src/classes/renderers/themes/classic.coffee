module.exports = 
	name: "classic"
	line: (drawData) ->
		@context.beginPath()
		delta = 0
		sdelta = 0
		absDelta = 0
		if @parent.triggers?.level
			delta = @parent.level - @currentItem.length + 1
			absDelta = -(Math.sqrt delta * delta)
			sdelta = -(Math.sqrt (delta - 1) * (delta - 1))
		@context.strokeStyle = "rgba(0, 0, 0, #{@lineAlphaDelta delta})"
		@context.moveTo (@getX drawData.from) + (@makeValue 150, absDelta), (@getY drawData.from) + (@makeValue 25, absDelta)
		@context.lineTo (@getX drawData.to) + (@makeValue 150, sdelta), (@getY drawData.to) + (@makeValue 25, sdelta)
		@context.stroke()
	background: ->
	gugu: (drawData) ->
		switch drawData.item.status
			when "checked" then bgcolor1 = "rgba(0, 135, 255, 1)"; bgcolor2 = "rgba(0, 100, 220, 1)"; texcolor = "rgba(256, 256, 256, 1)"; texStrokeColor = "rgba(0, 0, 0, 0)"
			when "unchecked" then bgcolor1 = "rgba(255, 67, 16, 1)"; bgcolor2 = "rgba(220, 32, 0, 1)"; texcolor = "rgba(0, 0, 0, 1)"; texStrokeColor = "rgba(0, 0 , 0, 0)"
			when "determinate" then bgcolor1 = "rgba(256, 256, 256, 1)"; bgcolor2 = "rgba(210, 210, 210, 1)"; texcolor = "rgba(0, 0, 0, 1)"; texStrokeColor = "rgba(256, 256, 256, 1)"
			else bgcolor1 = "rgba(50, 50, 50, 1)"; bgcolor2 = "rgba(0, 0, 0, 1)"; texcolor = "rgba(256, 256, 256, 1)"; texStrokeColor = "rgba(0, 0, 0, 1)"
		grad = @context.createLinearGradient drawData.x, drawData.y, drawData.x, drawData.y + drawData.height
		grad.addColorStop 0, bgcolor1
		grad.addColorStop 0.5, bgcolor1
		grad.addColorStop 1, bgcolor2
		@context.fillStyle = grad
		@context.lineWidth = 1
		@context.strokeStyle = "rgba(0, 0, 0, 1)"
		@context.fillRectR drawData.x, drawData.y, drawData.width, drawData.height
		@context.strokeRectR drawData.x, drawData.y, drawData.width, drawData.height
		text = drawData.item.text
		if text.length > 25 then text = text.substr(0, 22) + "..."
		@context.strokeStyle = texStrokeColor
		@context.font = "normal #{12 + 12 * drawData.absDelta / 4}pt Verdana" 
		@context.fillStyle = texcolor
		@context.strokeText text, drawData.x + 20, drawData.y + @getTextDelta drawData.absDelta
		@context.fillText text, drawData.x + 20, drawData.y + @getTextDelta drawData.absDelta