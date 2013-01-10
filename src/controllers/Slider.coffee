class Slider extends BaseObject

	constructor: (@parent, @type = "horrizontal") ->
		@dataSet = {}
		DepMan.stylesheet "slider"
		do @encapsulate
		do @getSizes
		do @capture
	
	getSizes: (el = @inner) =>
		@sizes =
			width :  el.clientWidth
			height:  el.clientHeight

	encapsulate: (el = @parent) =>
		children = []
		children.push child for child in el.children
		@inner = document.createElement "div"
		@inner.setAttribute "class", "slider-inner"
		@parent.appendChild @inner
		@parent.style.width = "#{@parent.clientWidth}px"
		@parent.style.height = "#{@parent.clientHeight}px"
		@parent.className += " slider"
		@parent.Slider = @
		@inner.style.top = "0px"
		@inner.style.left = @inner.style.right = "0px"
		for child in children
			continue if child is @inner
			@inner.appendChild child
		@


	resolveData: (event) =>
		if event.touches then return x: event.touches[0].clientX, y: event.touches[0].clientY
		else return x: event.clientX, y: event.clientY

	capture: (el = @parent) =>

		el.addEventListener "mousedown", @startHandler
		el.addEventListener "touchstart", @startHandler
		el.addEventListener "mousemove", @moveHandler
		el.addEventListener "touchmove", @moveHandler
		el.addEventListener "mouseup", @endHandler
		el.addEventListener "touchend", @endHandler

	startHandler: (e) =>
		@dataSet.first = @resolveData e
		@dataSet.top = parseInt @inner.style.top
		@dataSet.current = null
		@dataSet.continue = false
		setTimeout ( @proxy @decideTap, @ ), 100
		do e.preventDefault

	moveHandler: (e) =>
		@dataSet.current = @resolveData e
		if @dataSet.continue
			delta = @inner.clientHeight - @parent.clientHeight
			return if delta < 0
			newtop = @dataSet.current.y - @dataSet.first.y + @dataSet.top
			console.log newtop, delta
			if newtop < -delta then @inner.style.top = "#{-delta}px"
			else if newtop > 0 and @inner.clientHeight is @parent.clientHeight + delta then @inner.style.top = "0px"
			else @inner.style.top = "#{@dataSet.current.y - @dataSet.first.y + @dataSet.top}px"
		do e.preventDefault

	endHandler: (e) =>
		if not @dataSet.continue then do e.preventDefault
		@dataSet.continue = false
	
	decideTap: () =>
		if @dataSet.current and @dataSet.first isnt @dataSet.current then @dataSet.continue = true

	remove: (el = @parent)=>
		@parent.className = @parent.className.replace /\ ?slider\ ?/, ""
		children = []
		children.push child for child in @inner.children
		@parent.appendChild child for child in children
		@parent.removeChild @inner

		el.removeEventListener "mousedown", @startHandler
		el.removeEventListener "touchstart", @startHandler
		el.removeEventListener "mousemove", @moveHandler
		el.removeEventListener "touchmove", @moveHandler
		el.removeEventListener "mouseup", @endHandler
		el.removeEventListener "touchend", @endHandler




class SliderErrorReporter extends IS.Object

	@errorGroups = []
	@errorGroupMap = []
	@errorMessages = []

	@extend IS.ErrorReporter




module.exports = Slider
