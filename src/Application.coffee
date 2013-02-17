require "Object"
class Application extends BaseObject

	constructor: () ->

		root = window
		root.echo = ( require "Object" ).echo
		document.title = "Arrow Brainstorming"

		do ->
			meta = document.createElement "meta"
			meta.setAttribute "name", "viewport"
			meta.setAttribute "content", "width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1"
			document.head.appendChild meta

		root.DepMan = new ( require "helpers/DependenciesManager" )

		#jQuery
		DepMan.lib "jquery"

		# FontAwesome
		DepMan.stylesheet "font-awesome"

		# Fonts
		DepMan.googleFont "Electrolize", [400]
		DepMan.googleFont "Open Sans", [400, 300], ["latin", "latin-ext"]

		_resize = ->
			html = document.querySelector "html"
			if window.innerWidth <= 1024
				if html.className.indexOf("smallscreen") is -1 then html.className += " smallscreen"
			else html.className = html.className.replace /\ ?smallscreen/, ""
		window.addEventListener "resize", _resize
		do _resize

		if document.body.className.indexOf("landing") >= 0
			sections = [
				"intro"
				"description"
			]
			data = ""
			for section in sections
				data += DepMan.render "landing.article", data: ( DepMan.doc section ), title: section
			$("section").html data
			$("#ff").click =>
				req = window.navigator.mozApps?.install "#{window.location}manifest.webapp"
				req.onsuccess = => alert "App Installed!"
				req.onerror = => alert "App failed to install!\n Data in console"; console.log req.error.name
			$("#run").click =>
				window.location = "index.app.html"
			return

		document.body.innerHTML = DepMan.render "index", title:"Arrow", copyright: "&copy; Sabin Marcu 2013"

		# DnD API
		root.DnD = ( DepMan.controller "DragAndDrop" )
		root.DnD.init()

		root.isMobile = false
		if window.orientation? or document.orientation?
			root.isMobile = true
			document.querySelector("html")?.className += " mobile "
			document.querySelector("aside")?.addEventListener "click", (e) -> console.log "Aside Tagged"
			els = document.querySelectorAll("article > *")
			if els?
				for el in els
					el.addEventListener "click", (e) -> console.log "#{this.tagName} Tagged"


		( DepMan.helper "OPMLManager" )

		switchMode = (mode) ->
			html = document.querySelector("html")
			if html.className.indexOf(mode) >= 0 then html.className = html.className.replace (new RegExp("\ ?#{mode}")), ""
			else html.className += " #{mode}"

		document.getElementById("sidebarToggle").addEventListener "click", -> switchMode "sidebaroff"
		document.getElementById("fullScreenToggle").addEventListener "click", -> switchMode "fullscreen"


module.exports = Application

