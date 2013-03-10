class DepMan extends BaseObject

	constructor : (@basePrefix = "", @deps = []) -> @echo "Activated DependenciesManager!"
	_require    : (module, prefix = "") =>
		@deps["#{prefix}#{module}"] = require "#{@basePrefix}#{prefix}#{module}"
		return @deps["#{prefix}#{module}"]

	render     : (module, args...) => (@_require module, "views/").apply @, args
	doc        : (module) => @_require module, "docs/"
	stylesheet : (module) => @_require module, "stylesheets/"
	helper     : (module) => @_require module, "helpers/"
	controller : (module) => @_require module, "controllers/"
	model      : (module) => @_require module, "models/"
	lib        : (module) => @_require module, "libs/"
	angular    : (module) => @_require module, "angular/"
	googleFont : (font, sizes, subsets = null) =>
		names = font.split " "

		_s = @deps["#{font}"] = document.createElement "link"
		string =  "http://fonts.googleapis.com/css?family=#{names.join "+"}:#{sizes.join ","}"
		if subsets? then string += "&subset=#{subsets.join ","}"
		_s.setAttribute "href", string
		_s.setAttribute "rel", "stylesheet"
		_s.setAttribute "type", "text/css"

		document.head.appendChild _s
		_s



class DepErr extends IS.Object

	@errors:
		"RequireError": [ "Could not require module!" ]

	@extend IS.ErrorReporter

module.exports = DepMan
