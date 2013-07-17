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
			meta.setAttribute "href", "icon.ico"
			document.head.appendChild meta
			meta = document.createElement "meta"
			meta.setAttribute "name", "apple-mobile-web-app-capable"
			meta.setAttribute "content", "yes"
			document.head.appendChild meta
			meta = document.createElement \link
			meta.set-attribute \rel, \icon
			meta.set-attribute \href, \icon.ico
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
		angular.module AppInfo.displayname, []
		DepMan.helper "Runtime"
		DepMan.helper "Language"
		[ window.Notification, window.Toast ] = DepMan.helper "Notification"
		DepMan.controller "Modals"
		DepMan.controller "Page"
		DepMan.controller "Landing"
		DepMan.controller "Help"
		DepMan.controller "Sidebar"
		angular.bootstrap document.body, [AppInfo.displayname]

module.exports = Application

