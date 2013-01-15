require "Object"
class Application extends BaseObject

	constructor: (message) ->

		root = window
		root.echo = ( require "Object" ).echo
		document.title = "Arrow"

		root.DepMan = new ( require "helpers/DependenciesManager" )

		# FontAwesome
		DepMan.stylesheet "font-awesome"

		# Fonts
		DepMan.googleFont "Electrolize", [400]
		DepMan.googleFont "Droid Sans", [400]

		document.body.innerHTML = DepMan.render "index", title:"Arrow", copyright: "&copy; Sabin Marcu 2013"

		# DnD API
		root.DnD = ( DepMan.controller "DragAndDrop" )
		root.DnD.init()

		do ( DepMan.controller "OPML" ).init


module.exports = Application

