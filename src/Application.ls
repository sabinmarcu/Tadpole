require "classes/Object"
class Application extends BaseObject
	~>
		do @baseSetup
		do @firstTimeInclude
		do @loadLibs
		do @fixStylesheets
		do @loadApplication

	baseSetup: ->
		AppInfo.displayname ?= AppInfo.name
		window.echo = ( require "classes/Object" ).echo
		document.title = AppInfo.displayname
		do ->
			meta = document.createElement "meta"
			meta.setAttribute "name", "viewport"
			meta.setAttribute "content", "width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1"
			document.head.appendChild meta
			meta = document.createElement "link"
			meta.setAttribute "rel", "apple-touch-icon"
			meta.setAttribute "href", "arrow.png"
			document.head.appendChild meta
			meta = document.createElement "meta"
			meta.setAttribute "name", "apple-mobile-web-app-capable"
			meta.setAttribute "content", "yes"
			document.head.appendChild meta
	loadLibs: ->
		DepMan.lib "prelude"
		window <<< window.prelude
		DepMan.lib "jquery"
		DepMan.lib "angular.min"
		DepMan.lib "bootstrap.min"
		DepMan.lib "QRCodeDraw"
		DepMan.stylesheet "bootstrap"
		DepMan.stylesheet "bootstrap-responsive"
		DepMan.stylesheet "font-awesome"
	firstTimeInclude: ~>
		window.DepMan = new ( require "classes/helpers/DependenciesManager" )
		window.Tester = new ( DepMan.helper "Tester")()
		window.Storage = new ( DepMan.helper "Storage")()
		window.Settings = DepMan.helper "SettingsBook"
		#window.Settings.load ["loading", "tutorial", "exp-tilt"]
	fixStylesheets: ~>
		styles = window.getStylesheets!; fwstyles = $('#css-font-awesome')
		styles.innerHTML = styles.innerHTML.replace /\<\<INSERT\_BACKGROUND\_IMAGE\_HERE\>\>/g, DepMan.image "background"
		styles.innerHTML = styles.innerHTML.replace /\<\<INSERT OPEN SANS 300 WOFF HERE\>\>/g, DepMan.font "woff/opensans1"
		styles.innerHTML = styles.innerHTML.replace /\<\<INSERT OPEN SANS 400 WOFF HERE\>\>/g, DepMan.font "woff/opensans2"
		styles.innerHTML = styles.innerHTML.replace /\<\<INSERT ELECTROLIZE WOFF HERE\>\>/g, DepMan.font "woff/electrolize"
		styles.innerHTML = styles.innerHTML.replace /\<\<INSERT ROBOTO 100 WOFF HERE\>\>/g, DepMan.font "woff/roboto100"
		styles.innerHTML = styles.innerHTML.replace /\<\<INSERT ROBOTO 400 WOFF HERE\>\>/g, DepMan.font "woff/roboto400"
		document.head.appendChild styles
		fwstyles.html (fwstyles.html().replace /\<\<INSERT FONTAWESOME EOT HERE\>\>/g, DepMan.font "eot/fontawesome-webfont")
		fwstyles.html (fwstyles.html().replace /\<\<INSERT FONTAWESOME TTF HERE\>\>/g, DepMan.font "ttf/fontawesome-webfont")
		fwstyles.html (fwstyles.html().replace /\<\<INSERT FONTAWESOME WOFF HERE\>\>/g, DepMan.font "woff/fontawesome-webfont")
	loadApplication: ~>
		window.Loading = new ( DepMan.helper "Loading" )(); $ '#loadingscreen' .click -> 
			window.Loading.end!
			setTimeout window.Loading.start, 5000
		Loading.start!; Loading.progress "Loading Application"
		document.body.set-attribute \ng-csp, true
		document.body.set-attribute \ng-controller "Page"
		OneMind = angular.module "OneMind", []
		DepMan.angular "Page"
		angular.bootstrap document.body
		window.Toast = (title = "Message", ...body) ->
			b = body.shift()
			if webkitNotifications? and chrome.storage?
				for item in body then b += "\n#{item}" 
				notif = webkitNotifications.createNotification '/arrow_up_1.png', title, b
				notif.show()
			else
				b = "<p>#{b}</p>"
				for item in body then b += "<p>#{item}</p>"
				jQuery("#tip-message-head").html title
				jQuery("#tip-message-body").html b
				jQuery("#tip-message").modal("show")
				setTimeout((-> jQuery("#tip-message").modal("hide")), 1500)				





		#@LoadProgress = LoadProgress = new IS.Promise()
		#@LoadProgress.then(( -> Loading.start(); LoadProgress.resolve true ), null, null).then(@loadLibs, null, Loading.progress).then(@bootStrapAngular, null, Loading.progress).then(@loadLanguage, null, Loading.progress).then(@resizeHook, null, Loading.progress).then(@decideView, null, Loading.progress)
		#@LoadProgress.resolve true

	## LANDING PAGE
	#decideView: ~>
		#storage.getItem "landing", (set) ~>
			#landing = set.landing
			#if chrome? and chrome.storage? then landing = "false"
			#if not landing? then landing = true; storage.setItem("landing", "false")
			#landing = landing.toString()
			#@log landing, set
			#@LoadProgress.progress 31
			#if landing isnt "false" then @LoadProgress.then(@renderLandingPage, null, Loading.progress).then(@hookLandingPageStuff, null, Loading.progress).then(@finish, null, Loading.progress).then((-> Loading.end()), null, null)
			#else @LoadProgress.then(@dataTransferBootstrap, null, Loading.progress).then(@renderBaseline, null, Loading.progress).then(@dragAndDropHooks, null, Loading.progress).then(@mobileHooks, null, Loading.progress).then(@opmlBootstrap, null, Loading.progress).then(@extras, null, Loading.progress).then(@finish, null, Loading.progress).then(@lastMinute, null, null)
			#@LoadProgress.resolve true

	#renderLandingPage: ->
		#f = jQuery("body > div")[0]
		#@progress 45
		#f.parentNode.removeChild f
		#@progress 50
		#DepMan.angular "Landing"
		#jQuery("body").addClass("landing")
		#jQuery("body").attr("ng-controller", "Landing")
		#window.StateNames = ["Closed", "Open", "Inactive", "Active"]
		#window.States = new IS.Enum(window.StateNames)
		#document.body.innerHTML = DepMan.render "landing", STATES: window.States, STATE_NAMES: window.StateNames
		#@progress 60
		#@resolve true

	#hookLandingPageStuff: ->
		#angular.bootstrap document, ["Arrow"]
		#setTimeout ~>
			#@resolve true
		#, 50

	## FULL APP
	#bootStrapAngular: ->
		#window.Arrow = angular.module "Arrow", []
		#DepMan.angular "NGAsideController"
		#document.childNodes[1].setAttribute("ng-csp", "")
		#document.body.className += " {{theme.mime}}"
		#document.body.setAttribute("ng-controller", "NGAsideController")
		#@progress 10
		#@resolve true
	#loadLanguage: ->
		#DepMan.helper "LanguageHelper"
		#@progress 20
		#@resolve true
	#resizeHook: ->
		#_resize = ->
			#html = document.querySelector "html"
			#if window.innerWidth <= 1024
				#if html.className.indexOf("smallscreen") is -1 then html.className += " smallscreen"
			#else html.className = html.className.replace /\ ?smallscreen/, ""
		#@progress 28
		#window.addEventListener "resize", _resize
		#@progress 29
		#do _resize
		#@progress 30
		#@resolve true
	#renderBaseline: ->
		#f = jQuery("body > div")[0]
		#@progress 32
		#f.parentNode.removeChild f
		#document.body.innerHTML = DepMan.render "index", title:"Arrow", copyright: "&copy; Sabin Marcu 2013"
		#@progress 35
		#document.body.appendChild f
		#@progress 38
		#setTimeout ~>
			#@progress 40
			#@resolve true
		#, 500
	#dragAndDropHooks: ->
		#@progress 60
		#window.DnD = ( DepMan.controller "DragAndDrop" )
		#window.DnD.init()
		#@progress 62
		#window.Swype = new (DepMan.controller "Swype")()
		#@resolve true
	#mobileHooks: ->
		#window.isMobile = true
		#if window.orientation? or document.orientation?
			#window.isMobile = true
			#document.querySelector("html")?.className += " mobile "
			#document.querySelector("aside")?.addEventListener "click", (e) -> console.log "Aside Tagged"
			#els = document.querySelectorAll("article > *")
			#if els?
				#for el in els
					#el.addEventListener "click", (e) -> console.log "#{this.tagName} Tagged"
		#window.switchMode = (mode) ->
			#html = document.querySelector("html")
			#if html.className.indexOf(mode) >= 0 then html.className = html.className.replace (new RegExp("\ ?#{mode}")), ""
			#else html.className += " #{mode}"
		#@progress 65
		#@resolve true
	#opmlBootstrap: ->
		#( DepMan.helper "OPMLManager" )
		#@progress 85
		#@resolve true
	#dataTransferBootstrap: ->
		#( DepMan.helper "DataTransfer")
		#@resolve true
	#extras: ->
		#if chrome? and chrome.app? and chrome.storage?
			#console.log "Should install chromeframecontroller"
			#DepMan.angular "ChromeFrameController"
			#d = document.createElement "div"
			#d.innerHTML = DepMan.render "chromehandler"
			#document.body.appendChild d
			#@progress 90
		#@resolve true
     #finish: ->
		#@progress 95
		#console.log "Finished"
		#angular.bootstrap document, ["Arrow"]
		#@resolve true
	#lastMinute: ->
		#Settings.reuse("tutorial").refresh().then ~> 
			#tut = Settings.reuse("tutorial").value
			#unless tut is false then (DepMan.helper "Tutorial")()
		#Settings.reuse("exptilt").refresh().then ~>
			#if (Settings.reuse "exptilt").value is true then (DepMan.helper "TiltMechanics")() 
		#@progress 100
		#Loading.end()


module.exports = Application

