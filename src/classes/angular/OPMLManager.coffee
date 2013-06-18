angular.module("Arrow").controller "OPMLManager", ($scope, $rootScope, OPML) ->

	$scope.safeApply = (fn) ->
		phase = $scope.$parent.$$phase
		console.log phase
		if phase is '$apply' or phase is '$digest'
			if fn and (typeof(fn) is 'function')
				do fn
		else $scope.$apply(fn)

	OPML.refreshView = -> $scope.safeApply()
	$scope.opmls = OPML.OPMLs
	$scope.isactive = (el) -> if el is OPML.activeOPML then "circle" else "circle-blank"
	$scope.activate = (el, override = false) ->
		OPML.openOPML el, override
		storage.setItem "lastOPML", OPML.OPMLs.indexOf OPML.activeOPML
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

	storage.getItem "lastOPML", (sets) -> if OPML.OPMLs.length > 0 then $scope.activate OPML.OPMLs[sets.lastOPML or 0], true
console.log "OPMLManager should be available now"
