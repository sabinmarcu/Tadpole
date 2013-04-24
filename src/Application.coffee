require "Object"
class Application extends BaseObject

	constructor: () ->
		do @baseSetup
		do @firstTimeInclude
		do @loadApplication

	baseSetup: ->
		window.echo = ( require "Object" ).echo
		document.title = "Arrow Brainstorming"
		window.storage =
			"setItem": (key, value) ->
				if chrome? and chrome.storage? then chrome.storage.sync.set key: value
				else window.localStorage.setItem key, value
			"getItem": (item, callback) ->
				if chrome? and chrome.storage? then chrome.storage.sync.get item, callback
				else
					res = {}; res[item] = window.localStorage.getItem item
					callback res
		do ->
			meta = document.createElement "meta"
			meta.setAttribute "name", "viewport"
			meta.setAttribute "content", "width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1"
			document.head.appendChild meta
			meta = document.createElement "link"
			meta.setAttribute "rel", "apple-touch-icon"
			meta.setAttribute "href", "arrow_up_1.png"
			document.head.appendChild meta
			meta = document.createElement "meta"
			meta.setAttribute "name", "apple-mobile-web-app-capable"
			meta.setAttribute "content", "yes"
			document.head.appendChild meta
			#document.addEventListener "touchmove", ((e) -> e.preventDefault()), false
	firstTimeInclude: =>
		window.DepMan = new ( require "helpers/DependenciesManager" )
		window.Loading = new ( DepMan.helper "Loading" )()
	loadApplication: =>
		window.Toast = (title = "Message", body...) ->
			b = body.shift()
			if webkitNotifications? and chrome.storage?
				b += "\n#{item}" for item in body 
				notif = webkitNotifications.createNotification '/arrow_up_1.png', title, b
				notif.show()
			else
				b = "<p>#{b}</p>"
				b += "<p>#{item}</p>" for item in body
				jQuery("#tip-message-head").html title
				jQuery("#tip-message-body").html b
				jQuery("#tip-message").modal("show")
				setTimeout((-> jQuery("#tip-message").modal("hide")), 1500)
		@LoadProgress = LoadProgress = new IS.Promise()
		@LoadProgress.then(( -> Loading.start(); LoadProgress.resolve true ), null, null).then(@loadLibs, null, Loading.progress).then(@bootStrapAngular, null, Loading.progress).then(@loadLanguage, null, Loading.progress).then(@resizeHook, null, Loading.progress).then(@decideView, null, Loading.progress)
		@LoadProgress.resolve true

	# LANDING PAGE
	decideView: =>
		storage.getItem "landing", (set) =>
			landing = set.landing
			if chrome? and chrome.storage? then landing = "false"
			if not landing? then landing = true; storage.setItem("landing", false)
			landing = landing.toString()
			@log landing, set
			@LoadProgress.progress 31
			if landing isnt "false" then @LoadProgress.then(@renderLandingPage, null, Loading.progress).then(@hookLandingPageStuff, null, Loading.progress).then((-> Loading.end()), null, null)
			else @LoadProgress.then(@dataTransferBootstrap, null, Loading.progress).then(@renderBaseline, null, Loading.progress).then(@dragAndDropHooks, null, Loading.progress).then(@mobileHooks, null, Loading.progress).then(@opmlBootstrap, null, Loading.progress).then(@extras, null, Loading.progress).then(@finish, null, null)
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
		jQuery("#startapp").click -> storage.setItem "landing", false

	# FULL APP
	loadLibs: ->
		DepMan.lib "jquery"
		DepMan.lib "angular.min"
		DepMan.lib "bootstrap.min"
		DepMan.lib "QRCodeDraw"
		@progress 3
		DepMan.stylesheet "bootstrap"
		DepMan.stylesheet "font-awesome"
		@progress 5
		DepMan.stylesheet "ElectrolizeFont"
		DepMan.stylesheet "OpenSansFont"
		@progress 7
		@resolve true
	bootStrapAngular: ->
		window.Arrow = angular.module "Arrow", []
		DepMan.angular "NGAsideController"
		document.childNodes[1].setAttribute("ng-csp", "")
		document.body.className += " {{theme.mime}}"
		document.body.setAttribute("ng-controller", "NGAsideController")
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
		@progress 62
		window.Swype = new (DepMan.controller "Swype")()
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
		@resolve true
	dataTransferBootstrap: ->
		( DepMan.helper "DataTransfer")
		@resolve true
	extras: ->
		if chrome? and chrome.app? and chrome.storage?
			console.log "Should install chromeframecontroller"
			DepMan.angular "ChromeFrameController"
			d = document.createElement "div"
			d.innerHTML = DepMan.render "chromehandler"
			document.body.appendChild d
			@progress 90
		@resolve true
	finish: ->
		@progress 95
		angular.bootstrap document, ["Arrow"]
		@progress 100
		Loading.end()


module.exports = Application

