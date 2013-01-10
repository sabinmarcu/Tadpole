_baseObj =
	echo: (args...) ->
		_d = new Date
		args[0] = "[#{do _d.getHours}:#{do _d.getMinutes}:#{do _d.getSeconds}][#{@name or @__proto__.constructor.name}]	#{args[0]}"
		@

class BObject extends IS.Object
	@extend _baseObj
	@include _baseObj

module.exports = window.BaseObject = BObject
