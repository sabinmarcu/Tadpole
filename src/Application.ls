class Application extends IS.Object
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
		DepMan.lib "QRCodeDraw"
		DepMan.stylesheet "font-awesome"
	firstTimeInclude: ~>
		window.DepMan = new ( require "classes/helpers/DependenciesManager" )
		window.Tester = new ( DepMan.helper "Tester")()
		window.Storage = new ( DepMan.helper "Storage")()
		window.Settings = DepMan.helper "SettingsBook"
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
	fixStylesheets: ~>
		styles = window.getStylesheets!; fwstyles = $('#css-font-awesome')
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
		window.Loading = new ( DepMan.helper "Loading" )()
		angular.module "Revelation", []
		DepMan.helper "Runtime"
		DepMan.helper "Language"
		DepMan.controller "Page"
		DepMan.controller "Landing"
		DepMan.controller "Help"
		angular.bootstrap document.body, ["Revelation"]

module.exports = Application

