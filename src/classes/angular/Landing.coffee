angular.module("Arrow").controller "Landing", ($scope, $rootScope) ->

	# Some Bootstrapping
	console.log "Controller Active"
	PREFIXES = ["-webkit-", "-moz-", "-ms-", "-o-"]
	$scope.StateNames = window.StateNames
	$scope.States = window.States
	$scope.safeApply = (fn) ->
		phase = $scope.$parent.$$phase
		console.log phase
		if phase is '$apply' or phase is '$digest'
			if fn and (typeof(fn) is 'function')
				do fn
		else $scope.$apply(fn)

	# Now, to the actual controller
	$scope.state = $scope.States.Closed
	$scope.sizes = x: window.innerWidth, y: window.innerHeight
	$scope.getAsideStyle = (zone) ->
		array = width: "#{$scope.sizes.x}px", height: "#{$scope.sizes.y}px"
		array["#{prefix}transform"] = "scale(#{Math.abs($scope.sizes.y / $scope.sizes.x) * 10}) skewX(#{Math.atan($scope.sizes.x / $scope.sizes.y) * 180 / Math.PI}deg)" for prefix in PREFIXES
		switch $scope.state
			when States.Closed
				switch zone
					when "top"
						array["#{prefix}transform"] += "translateX(50%)" for prefix in PREFIXES
					when "bottom"
						array["#{prefix}transform"] += "translateX(-50%)" for prefix in PREFIXES
			else
				switch zone
					when "top"
						array["#{prefix}transform"] += "translateX(100%)" for prefix in PREFIXES
					when "bottom"
						array["#{prefix}transform"] += "translateX(-100%)" for prefix in PREFIXES
		array
	$scope.stateChange = () ->
		switch $scope.state
			when States.Closed
				setTimeout -> 
					$scope.state = States.Active
					jQuery("article").attr("ng-click", "stateChange(#{States.Inactive})")
					do $scope.safeApply
				, 1000
				$scope.state = States.Open
			when States.Inactive 
				setTimeout -> 
					jQuery("article").attr("ng-click", "stateChange(#{States.Inactive})")
					do $scope.safeApply
				, 50
				$scope.state = States.Active
			when States.Active 
				setTimeout -> 
					jQuery("article").attr("ng-click", "stateChange(#{States.Active})")
					do $scope.safeApply
				, 50
				$scope.state = States.Inactive
		do $scope.safeApply
	do $scope.safeApply
	window.addEventListener "resize", ->
		$scope.sizes = x: window.innerWidth, y: window.innerHeight
		do $scope.safeApply
