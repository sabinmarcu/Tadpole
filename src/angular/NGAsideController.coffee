angular.module("Arrow").controller "NGAsideController", ($scope, $rootScope) ->
	TABS = new IS.Enum([ "LIST", "SERVER", "GENERAL" ])
	$scope.safeApply = (fn) ->
		phase = $scope.$parent.$$phase
		console.log phase
		if phase is '$apply' or phase is '$digest'
			if fn and (typeof(fn) is 'function')
				do fn
		else $scope.$apply(fn)
	storage.getItem "lang", (sets) =>
		$scope.language = sets.language or "en_US"
		$scope.languages = [
			{ lang: "US English", mime: "en-US" }
			{ lang: "Romanian", mime: "ro-RO" }
		]
		$scope.language = item for item in $scope.languages when $scope.language is item.mime
	storage.getItem "theme", (sets) ->
		$scope.theme = sets.theme or "classictheme"
		$scope.themes = [
			{ name: "Blu Theme", mime: "bluetheme" }
			{ name: "Red Theme", mime: "redtheme" }
			{ name: "Classic Theme", mime: "classictheme" }
		]
		$scope.theme = item for item in $scope.themes when $scope.theme is item.mime
	$scope.changedLanguage = ->
		Loading.start()
		Loading.progress "Switching language"
		setTimeout =>
			LanguageHelper.switchLanguage $scope.language.mime
			Loading.progress "Done"
			Loading.end()
		, 1000
	$scope.changedTheme = -> storage.setItem("theme", $scope.theme.mime)
	storage.getItem "sidebarstatus", (sets) -> $scope.sidebarstatus = sets.sidebarstatus or "closed"
	$scope.togglesidebar = ->
		if $scope.sidebarstatus is "closed" then $scope.sidebarstatus = 'open' else $scope.sidebarstatus = 'closed'
		storage.setItem("sidebarstatus", $scope.sidebarstatus)
	storage.getItem "lastpanel", (sets) ->
		$scope.asidetab = (whom = null, step = 1) ->
			if not whom?
				whom = $scope.activeTab + step
				if whom > 2 then whom = 2
				if whom < 0 then whom = 0
			else whom = TABS[whom]
			$scope.activeTab = whom; storage.setItem("lastpanel", whom)
		animationVariants = ["topVariant", "bottomVariant"]
		$scope.getAnim = -> animationVariants[Math.floor(Math.random() * animationVariants.length)]
		$scope.tabIsActive = (whom) ->  TABS[whom].toString() is $scope.activeTab.toString()
		$scope.activeTab = sets.lastpanel or TABS.LIST
		console.log $scope.tabIsActive("LIST")
		console.log $scope.tabIsActive("SERVER")
		console.log $scope.tabIsActive("GENERAL")
	storage.getItem "landing", (sets) ->
		$scope.landingpageactive = sets.landing
		$scope.activateLanding = -> !$scope.landingpageactive; storage.setItem("landing", $scope.landingpageactive)
