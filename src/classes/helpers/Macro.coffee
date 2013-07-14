events = ["keyup", "mousedown", "mouseup", "mousemove", "touchdown", "touchup", "touchmove"]
EVENTS = new IS.Enum events
class MacroReccorder

	constructor: ->
		document.addEventListener event, @handler for event in events

	handler: =>

		

module.exports = MacroReccorder
