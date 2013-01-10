class DepMan extends BaseObject

	constructor : (@basePrefix = "", @deps = []) -> @echo "Activated DependenciesManager!"
	_require    : (module, prefix = "") =>
		try
			@deps["#{prefix}#{module}"] = require "#{@basePrefix}#{prefix}#{module}"
			return @deps["#{prefix}#{module}"]
		catch e
			throw DepErr.generate 1, "[BP= #{@basePrefix}][P= #{prefix}][P= #{module}] #{DepErr.wrapCustomError e}"

	render     : (module, args...) => (@_require module, "views/").apply @, args
	doc        : (module) => @_require module, "docs/"
	stylesheet : (module) => @_require module, "stylesheets/"
	helper     : (module) => @_require module, "helpers/"
	controller : (module) => @_require module, "controllers/"
	model      : (module) => @_require module, "models/"
	googleFont : (font, sizes) =>
		names = font.split " "

		_s = @deps["#{font}"] = document.createElement "link"
		_s.setAttribute "href", "http://fonts.googleapis.com/css?family=#{names.join "+"}:#{sizes.join ","}"
		_s.setAttribute "rel", "stylesheet"
		_s.setAttribute "type", "text/css"

		document.head.appendChild _s
		_s
		
		

class DepErr extends IS.Object
	
	@errorGroups   = [ "RequireError" ]
	@errorGroupMap = [ 1 ]
	@errorMessages = [ "Could not require module!" ]

	@extend IS.ErrorReporter

module.exports = DepMan
