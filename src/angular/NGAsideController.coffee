angular.module("Arrow").controller "NGAsideController", ($scope, $rootScope) ->
	TABS = new IS.Enum([ "LIST", "SERVER", "GENERAL" ])
	$scope.language = localStorage.getItem("lang") or "en_US"
	$scope.languages = [
		{ lang: "US English", mime: "en-US" }
		{ lang: "Romanian", mime: "ro-RO" }
	]
	$scope.language = item for item in $scope.languages when $scope.language is item.mime
	$scope.themes = [
		{ name: "Blu Theme", mime: "bluetheme" }
		{ name: "Red Theme", mime: "redtheme" }
	]
	$scope.theme = localStorage.getItem("theme") or "bluetheme"
	$scope.theme = item for item in $scope.themes when $scope.theme is item.mime
	$scope.changedLanguage = ->
		Loading.start()
		Loading.progress "Switching language"
		setTimeout =>
			LanguageHelper.switchLanguage $scope.language.mime
			Loading.progress "Done"
			Loading.end()
		, 1000
	$scope.changedTheme = -> localStorage.setItem("theme", $scope.theme.mime)
	$scope.sidebarstatus = localStorage.getItem("sidebarstatus") or "closed"
	$scope.togglesidebar = ->
		if $scope.sidebarstatus is "closed" then $scope.sidebarstatus = 'open' else $scope.sidebarstatus = 'closed'
		localStorage.setItem("sidebarstatus", $scope.sidebarstatus)
	$scope.activeTab = localStorage.getItem("lastpanel") or TABS.LIST
	$scope.asidetab = (whom) -> $scope.activeTab = TABS[whom]; localStorage.setItem("lastpanel", TABS[whom])
	animationVariants = ["topVariant", "bottomVariant"]
	$scope.getAnim = -> animationVariants[Math.floor(Math.random() * animationVariants.length)]
	$scope.tabIsActive = (whom) -> TABS[whom] is $scope.activeTab
	$scope.landingpageactive = localStorage.getItem("landing")
	$scope.activateLanding = -> !$scope.landingpageactive; localStorage.setItem("landing", $scope.landingpageactive)
	
