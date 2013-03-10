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
			meta = document.createElement "link"
			meta.setAttribute "rel", "applie-touch-icon"
			meta.setAttribute "href", "arrow_up_1.png"
			document.head.appendChild meta
			meta = document.createElement "meta"
			meta.setAttribute "name", "apple-mobile-web-app-capable"
			meta.setAttribute "content", "yes"
			document.head.appendChild meta

		root.DepMan = new ( require "helpers/DependenciesManager" )

		#jQuery
		DepMan.lib "jquery"
		DepMan.lib "angular.min"
		DepMan.lib "bootstrap.min"

		# Messaging
		window.Toast = (title = "Message", body = "")->
				jQuery("#tip-message-head").html title
				jQuery("#tip-message-body").html body
				jQuery("#tip-message").modal("show")
				setTimeout((-> jQuery("#tip-message").modal("hide")), 1500)

		# Ajustments for Angular
		window.Arrow = angular.module "Arrow", []
		$("body").attr "ng-app", "Arrow"

		# FontAwesome
		DepMan.stylesheet "font-awesome"
		DepMan.stylesheet "bootstrap.min"
		DepMan.stylesheet "bootstrap-responsive.min"

		# Fonts
		DepMan.googleFont "Electrolize", [400]
		DepMan.googleFont "Open Sans", [400, 300], ["latin", "latin-ext"]
		
		# Hook Language Translation
		DepMan.helper "LanguageHelper"

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
		
		jQuery("#languageSelector").change ->
			LanguageHelper.switchLanguage @value

		# DnD API
		root.DnD = ( DepMan.controller "DragAndDrop" )
		root.DnD.init()

		root.isMobile = true
		if window.orientation? or document.orientation?
			root.isMobile = true
			document.querySelector("html")?.className += " mobile "
			document.querySelector("aside")?.addEventListener "click", (e) -> console.log "Aside Tagged"
			els = document.querySelectorAll("article > *")
			if els?
				for el in els
					el.addEventListener "click", (e) -> console.log "#{this.tagName} Tagged"


		( DepMan.helper "OPMLManager" )

		window.switchMode = (mode) ->
			html = document.querySelector("html")
			if html.className.indexOf(mode) >= 0 then html.className = html.className.replace (new RegExp("\ ?#{mode}")), ""
			else html.className += " #{mode}"

		document.getElementById("sidebarToggle").addEventListener "click", -> Client?.publish "switchMode", "sidebaroff"
		document.getElementById("fullScreenToggle").addEventListener "click", -> Client?.publish "switchMode", "fullscreen"
		
		# Grab connectivity drivers
		DepMan.helper "DataTransfer"


module.exports = Application

