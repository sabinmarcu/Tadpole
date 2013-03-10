angular.module("Arrow").controller "OPMLManager", ($scope, $rootScope, OPML) -> 
	$scope.opmls = OPML.OPMLs
	$scope.isactive = (el) -> if el is OPML.activeOPML then "circle" else "circle-blank"
	$scope.activate = (el, override = false) -> 
		OPML.openOPML el, override
		localStorage.setItem "lastOPML", OPML.OPMLs.indexOf OPML.activeOPML
		$rootScope.$broadcast "opml.change", el
		jQuery("article header h1").html el?.title or "Arrow"
	$scope.new = -> do OPML.new
	$scope.edit = (item) -> 
		item.pastTitle = item.title; 
		$("#opml-#{item.index}").blur do (item) -> (e) ->
			do item.save
	$scope.save = -> OPML.activeOPML.save()
	$scope.download = -> OPML.activeOPML.download()
	$scope.delete = -> 
		OPML.delete(OPML.activeOPML)
		$scope.activate OPML.OPMLs[0]

	jQuery("#saveButton").click $scope.save
	jQuery("#downloadButton").click $scope.download
	# jQuery("#uploadButton").click $scope.upload

	$scope.activate OPML.OPMLs[localStorage.getItem("lastOPML") or 0], true