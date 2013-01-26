require "Object"
class Application extends BaseObject

	constructor: (message) ->

		root = window
		root.echo = ( require "Object" ).echo
		document.title = "Arrow Brainstorming"

		do ->
			meta = document.createElement "meta"
			meta.setAttribute "name", "viewport"
			meta.setAttribute "content", "width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1"
			document.head.appendChild meta

		root.DepMan = new ( require "helpers/DependenciesManager" )

		# FontAwesome
		DepMan.stylesheet "font-awesome"

		# Fonts
		DepMan.googleFont "Electrolize", [400]
		DepMan.googleFont "Open Sans", [400], ["latin", "latin-ext"]

		document.body.innerHTML = DepMan.render "index", title:"Arrow", copyright: "&copy; Sabin Marcu 2013"

		# DnD API
		root.DnD = ( DepMan.controller "DragAndDrop" )
		root.DnD.init()

		( DepMan.helper "OPMLManager" )

		switchMode = (mode) ->
			html = document.querySelector("html")
			if html.className.indexOf(mode) >= 0 then html.className = html.className.replace (new RegExp("\ ?#{mode}")), ""
			else html.className += " #{mode}"

		document.getElementById("sidebarToggle").addEventListener "click", -> switchMode "sidebaroff"
		document.getElementById("fullScreenToggle").addEventListener "click", -> switchMode "fullscreen"

		if window.orientation?
			document.querySelector("html").className += " mobile "
			document.querySelector("aside").addEventListener "click", (e) -> console.log "Aside Tagged"
			els = document.querySelectorAll("article > *")
			for el in els
				el.addEventListener "click", (e) -> console.log "#{this.tagName} Tagged"

		_resize = ->
			html = document.querySelector "html"
			if window.innerWidth <= 1024
				if html.className.indexOf("smallscreen") is -1 then html.className += " smallscreen"
			else html.className = html.className.replace /\ ?smallscreen/, ""
		window.addEventListener "resize", _resize
		do _resize

module.exports = Application

