require "Object"

class Application extends BaseObject
	constructor: (name) ->

		# Just some useful bindings
		window.root = window
		window.echo = BaseObject.echo
		window.name = "AtlasPortal Application"
		document.title = "Atlas"

		# Here we go
		echo "Starting Application"
		
		root.DepMan = new ( require "helpers/DependenciesManager" )
		root.LinkManager = new ( DepMan.helper "LinkManager" )
		
		root.DepMan.stylesheet "font-awesome"

		root.DepMan.googleFont "Electrolize", [400, 300]
		root.DepMan.googleFont "Source Sans Pro", [400, 300]
		root.DepMan.googleFont "Inconsolata", [400, 300]

		items = [
			{link: "/about", title: "About", help: "About the ATLAS Project"}
			{link: "/typography", title: "Typography", help: "Demo of Design / Typography"}
			{link: "/colors", title: "Colors", help: "Demo of Design / Colors"}
			{link: "/scaffolding", title: "Scaffolding", help: "Demo of Design / Scaffolding", replacePlaceHolder: true}
			{link: "/grid", title: "Grid", help:"Grid elements" }
			{link: "/", title: "Go Home", help: "Go back to the beginning"}
		]

		renderLayout = ->
			return if document.getElementById "layoutActive" 
			document.body.innerHTML = DepMan.render "layout", title: "ATLAS", items: items
			do LinkManager.linkAllAnchors

		renderDoc = (doc, replace = false, handler = null) ->
			do renderLayout
			el = (document.querySelector "section")
			return if not el?
			if replace
				e = document.createElement "div"
				e.innerHTML = DepMan.doc doc
				re = el.parentNode
				re.removeChild el
				re.appendChild e
			else el.innerHTML = DepMan.doc doc
			do handler if handler?

		routes =
			"/": -> document.body.innerHTML = DepMan.render "indexPage", title: "ATLAS", tagline: "Comin' up"; do LinkManager.linkAllAnchors
			"/checkin": => do renderLayout


		do (routes) -> console.log routes
		for item in items
			if item.link isnt "/"
				routes[item.link] = do(item) => =>
					args = [ item.link.substr 1 ]
					if item.replacePlaceHolder? then args.push true
					if item.after? then args.push item.after
					renderDoc.apply renderDoc, args
					true
		console.log routes

		root.LinkManager.setRoutes routes
		
module.exports = Application
