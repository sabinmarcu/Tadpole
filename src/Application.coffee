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

		# Ajustments for Angular
		window.Arrow = angular.module "Arrow", []
		$("body").attr "ng-app", "Arrow"

		# FontAwesome
		DepMan.stylesheet "font-awesome"

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

		document.body.innerHTML = DepMan.render "index", title:"Arrow", copyright: "&copy; Sabin Marcu 2013"

		# Aside Handling
		do ->
			aside = jQuery "aside"
			menu = aside.find "nav"
			content = aside.find "section"
			variants = ["topVariant", "bottomVariant"]
			menu.find("li").each (id, el) ->
				item = content.find "article##{el.dataset["tab"]}"; item = item[0]
				el.addEventListener "click", ->
					c = variants[Math.floor(Math.random() * 100) % 2]
					content.find("article").removeClass "active"
					$(item).addClass "active #{c}"
					localStorage.setItem("lastpanel", el.dataset["tab"])
			x = localStorage.getItem('lastpanel') or "items"
			menu.find("li[data-tab='#{x}']").click()
			b = $("body > article")
			m = $("#showhideappmenu")
			i = m.find("i")[0]
			m.click( ->
				if b.hasClass("sidebaropen") 
					b.removeClass "sidebaropen"
					i.className = "icon-chevron-right"
					localStorage.setItem "sidebarstatus", "closed"
				else 
					b.addClass "sidebaropen"
					i.className = "icon-chevron-left"
					localStorage.setItem "sidebarstatus", "open"
			)
			x = localStorage.getItem("sidebarstatus") or "closed"
			if x is "open" then m.click()

		# DnD API
		root.DnD = ( DepMan.controller "DragAndDrop" )
		root.DnD.init()
		
		jQuery("#languageSelector").change ->
			LanguageHelper.switchLanguage @value
		x = (localStorage.getItem "theme") or "bluetheme"
		jQuery("body").addClass x
		jQuery("#themeSelector").change ->
			jQuery("body").removeClass x
			x = @value
			localStorage.setItem "theme", x
			jQuery("body").addClass x

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
		
		# Grab connectivity drivers
		DepMan.helper "DataTransfer"


module.exports = Application

