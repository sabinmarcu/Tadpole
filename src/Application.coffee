require "Object"
class Application extends BaseObject

	constructor: () ->
		do @baseSetup
		do @firstTimeInclude
		do @loadApplication

	baseSetup: ->
		window.echo = ( require "Object" ).echo
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
	firstTimeInclude: =>
		window.DepMan = new ( require "helpers/DependenciesManager" )
		window.Loading = new ( DepMan.helper "Loading" )()
	loadApplication: =>
		window.Toast = (title = "Message", body = "")->
			jQuery("#tip-message-head").html title
			jQuery("#tip-message-body").html body
			jQuery("#tip-message").modal("show")
			setTimeout((-> jQuery("#tip-message").modal("hide")), 1500)
		@LoadProgress = LoadProgress = new IS.Promise()
		@LoadProgress.then(( -> Loading.start(); LoadProgress.resolve true ), null, null).then(@loadLibs, null, Loading.progress).then(@bootStrapAngular, null, Loading.progress).then(@loadLanguage, null, Loading.progress).then(@resizeHook, null, Loading.progress).then(@decideView, null, Loading.progress)
		@LoadProgress.resolve true

	# LANDING PAGE
	decideView: =>
		landing = localStorage.getItem("landing")
		if not landing? then landing = true; localStorage.setItem("landing", false)
		@LoadProgress.progress 31
		if landing isnt "false" then @LoadProgress.then(@renderLandingPage, null, Loading.progress).then(@hookLandingPageStuff, null, Loading.progress).then((-> Loading.end()), null, null)
		else @LoadProgress.then(@renderBaseline, null, Loading.progress).then(@dragAndDropHooks, null, Loading.progress).then(@mobileHooks, null, Loading.progress).then(@opmlBootstrap, null, Loading.progress).then(( -> Loading.end() ), null, null)
		@LoadProgress.resolve true
	renderLandingPage: ->
		f = jQuery("body > div")[0]
		@progress 45
		f.parentNode.removeChild f
		@progress 50
		jQuery("body").addClass("landing")
		document.body.innerHTML = DepMan.render "landing", title: "Arrow", copyright: "&copy; Sabin Marcu 2013"
		@progress 60
		setTimeout =>
			@progress 65
			@resolve true
		, 1000
	hookLandingPageStuff: ->
		jQuery("#startapp").click -> localStorage.setItem "landing", false

	# FULL APP
	loadLibs: ->
		DepMan.lib "jquery"
		DepMan.lib "angular.min"
		DepMan.lib "bootstrap.min"
		@progress 3
		DepMan.stylesheet "bootstrap"
		DepMan.stylesheet "font-awesome"
		@progress 5
		DepMan.googleFont "Electrolize", [400]
		DepMan.googleFont "Open Sans", [400, 300], ["latin", "latin-ext"]
		@progress 7
		@resolve true
	bootStrapAngular: ->
		window.Arrow = angular.module "Arrow", []
		DepMan.angular "NGAsideController"
		$("body").addClass("{{theme.mime}}").attr("ng-app", "Arrow").attr("ng-controller", "NGAsideController")
		@progress 10
		@resolve true
	loadLanguage: ->
		DepMan.helper "LanguageHelper"
		@progress 20
		@resolve true
	resizeHook: ->
		_resize = ->
			html = document.querySelector "html"
			if window.innerWidth <= 1024
				if html.className.indexOf("smallscreen") is -1 then html.className += " smallscreen"
			else html.className = html.className.replace /\ ?smallscreen/, ""
		@progress 28
		window.addEventListener "resize", _resize
		@progress 29
		do _resize
		@progress 30
		@resolve true
	renderBaseline: ->
		DepMan.angular "NGAsideController"
		f = jQuery("body > div")[0]
		@progress 32
		f.parentNode.removeChild f
		document.body.innerHTML = DepMan.render "index", title:"Arrow", copyright: "&copy; Sabin Marcu 2013"
		@progress 35
		document.body.appendChild f
		@progress 38
		setTimeout =>
			@progress 40
			@resolve true
		, 500
	dragAndDropHooks: ->
		@progress 60
		window.DnD = ( DepMan.controller "DragAndDrop" )
		window.DnD.init()
		@resolve true
	mobileHooks: ->
		window.isMobile = true
		if window.orientation? or document.orientation?
			window.isMobile = true
			document.querySelector("html")?.className += " mobile "
			document.querySelector("aside")?.addEventListener "click", (e) -> console.log "Aside Tagged"
			els = document.querySelectorAll("article > *")
			if els?
				for el in els
					el.addEventListener "click", (e) -> console.log "#{this.tagName} Tagged"
		window.switchMode = (mode) ->
			html = document.querySelector("html")
			if html.className.indexOf(mode) >= 0 then html.className = html.className.replace (new RegExp("\ ?#{mode}")), ""
			else html.className += " #{mode}"
		@progress 65
		@resolve true
	opmlBootstrap: ->
		( DepMan.helper "OPMLManager" )
		@progress 85
		( DepMan.helper "DataTransfer" )
		@progress 100
		@resolve true


module.exports = Application

