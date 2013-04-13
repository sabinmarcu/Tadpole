angular.module("Arrow").controller "NGAsideController", ($scope, $rootScope) ->
	TABS = new IS.Enum([ "LIST", "SERVER", "GENERAL" ])
	console.log $scope, @, @ is $scope
	storage.getItem "lang", (sets) =>
		$scope.language = sets.language or "en_US"
		$scope.languages = [
			{ lang: "US English", mime: "en-US" }
			{ lang: "Romanian", mime: "ro-RO" }
		]
		$scope.language = item for item in $scope.languages when $scope.language is item.mime
	storage.getItem "theme", (sets) ->
		$scope.theme = sets.theme or "bluetheme"
		$scope.themes = [
			{ name: "Blu Theme", mime: "bluetheme" }
			{ name: "Red Theme", mime: "redtheme" }
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
		$scope.activeTab = sets.lastpanel or TABS.LIST
		$scope.asidetab = (whom) -> $scope.activeTab = TABS[whom]; storage.setItem("lastpanel", TABS[whom])
		animationVariants = ["topVariant", "bottomVariant"]
		$scope.getAnim = -> animationVariants[Math.floor(Math.random() * animationVariants.length)]
		$scope.tabIsActive = (whom) -> TABS[whom] is $scope.activeTab
	storage.getItem "landing", (sets) ->
		$scope.landingpageactive = sets.landing
		$scope.activateLanding = -> !$scope.landingpageactive; storage.setItem("landing", $scope.landingpageactive)
