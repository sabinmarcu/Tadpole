angular.module("Arrow").controller "NGAsideController", ($scope, $rootScope) ->
	TABS = new IS.Enum([ "LIST", "SERVER", "GENERAL" ])
	$scope.safeApply = (fn) ->
		phase = $scope.$parent.$$phase
		console.log phase
		if phase is '$apply' or phase is '$digest'
			if fn and (typeof(fn) is 'function')
				do fn
		else $scope.$apply(fn)
	Storage.get "lang", (lang) =>
		$scope.language = lang or "en_US"
		$scope.languages = [
			{ lang: "US English", mime: "en-US" }
			{ lang: "Romanian", mime: "ro-RO" }
		]
		$scope.language = item for item in $scope.languages when $scope.language is item.mime
		$scope.changedLanguage = ->
			Loading.start()
			Loading.progress "Switching language"
			setTimeout =>
				LanguageHelper.switchLanguage $scope.language.mime
				Loading.progress "Done"
				Loading.end()
			, 1000

	Storage.get "theme", (theme) ->
		$scope.theme = theme or "classictheme"
		$scope.themes = [
			{ name: "Blu Theme", mime: "bluetheme" }
			{ name: "Red Theme", mime: "redtheme" }
			{ name: "Classic Theme", mime: "classictheme" }
		]
		$scope.theme = item for item in $scope.themes when $scope.theme is item.mime
		$scope.changedTheme = -> Storage.set "theme", $scope.theme.mime
	Storage.get "rendertheme", (rendertheme) ->
		$scope.rendertheme = rendertheme or "classic"
		$scope.renderthemes = [
			{ name: "Blu Theme", mime: "blue" }
			{ name: "Orange Theme", mime: "orange" }
			{ name: "Classic Theme", mime: "classic" }
			{ name: "[EXPERIMENTAL] Classic with rounded lines", mime: "classicround"}
		]
		$scope.rendertheme = item for item in $scope.renderthemes when $scope.rendertheme is item.mime
		window.$rendertheme = $scope.rendertheme.mime 
		$scope.changedRenderTheme = -> 
			window.$rendertheme = $scope.rendertheme.mime 
			Storage.set "rendertheme", $scope.rendertheme.mime

	storage.getItem "sidebarstatus", (sets) -> $scope.sidebarstatus = sets.sidebarstatus or "closed"
	$scope.togglesidebar = (to = null) ->
		if to? then $scope.sidebarstatus = to
		else if $scope.sidebarstatus is "closed" then $scope.sidebarstatus = 'open' else $scope.sidebarstatus = 'closed'
		storage.setItem("sidebarstatus", $scope.sidebarstatus)
		$scope.safeApply()
	storage.getItem "lastpanel", (sets) ->
		$scope.asidetab = (whom = null, step = 1) ->
			if not whom?
				whom = parseInt($scope.activeTab) + parseInt step 
				if whom > 2 then whom = 2
				if whom < 0 then whom = 0
			else whom = TABS[whom]
			$scope.activeTab = whom; storage.setItem("lastpanel", whom)
			$scope.safeApply()
		animationVariants = ["topVariant", "bottomVariant"]
		$scope.getAnim = -> animationVariants[Math.floor(Math.random() * animationVariants.length)]
		$scope.tabIsActive = (whom) ->  TABS[whom].toString() is $scope.activeTab.toString()
		$scope.activeTab = sets.lastpanel or TABS.LIST
	$scope.settings = {
		"landing": 
			"name": "Activate the Landing Page"
			"action": ->
		'tutorial': 
			"name": "Activate the Tutorial"
			"action": -> window.location = window.location
		'outlinefirst': 
			"name": "Have the outline view open first (instead of mindmap)"
			"action": -> 
		"exptilt": 
			"name": "[Experimental] Canvas Tilt"
			"action": -> 
				if not window.Tilt then (DepMan.helper "TiltMechanics")() 
	}
	$scope.settingValues ?= {}
	for key, item of $scope.settings then do (key, item) -> 
		$scope.settingValues[key] = Settings.reuse(key).value
		(Settings.reuse key).refresh().then ->
			$scope["activate#{key}"] = ->
				(Settings.reuse key).toggle().then((promise)->
					$scope.settingValues[key] = (Settings.reuse key).value
					promise.resolve promise
				).then item.action
	do $scope.safeApply
