angular.module("Arrow").controller "OPMLController", ($scope, $rootScope, OPML) ->

	$scope.safeApply = (fn) ->
		phase = $scope.$parent.$$phase
		console.log phase
		if phase is '$apply' or phase is '$digest'
			if fn and (typeof(fn) is 'function')
				do fn
		else $scope.$apply(fn)

	OPML.activateControllerFunctions.push (obj) ->
		obj.refreshView = $scope.safeApply
		$scope.object = obj
		$scope.view = "outline"

		$scope.isMobile = window.isMobile

		$scope.type = (item) ->
			if item.children isnt null then "noborder"
			else ""
		$scope.hidden = (item) ->
			if item.children isnt null then ""
			else "hidden"
		$scope.folded = (item) -> if not item.children? then "icon-hidden" else "icon-custom"
		$scope.hasKids = (item) -> item.children isnt null
		$scope.toggleFold = (item) -> item.fold = !item.fold
		$scope.toggleCheck = (item) ->
			if item.status in ["checked", "unchecked"]
				if item.status is "checked" then item.status = "unchecked"
				else item.status = "checked"
				obj.modify JSON.stringify(do item.getPath), status: item.status
		$scope.addChild = (item) -> obj.addChild JSON.stringify do item.getPath
		$scope.status = (item) -> item.getStatus()
		$scope.remove = (item) -> obj.removeChild JSON.stringify do item.getPath
		$scope.updateNetwork = (item, path) ->
			obj.modify JSON.stringify(do item.getPath), text: item._text

		hooked = false
		$scope.edit = (item) ->
			modal = jQuery("#editnodemodal") if not modal?
			modal.find("#text").val item.text
			modal.find(".status").show()
			sts = modal.find("#status")
			if item.status is "checked" then sts.prop "checked", true
			else if item.status is "unchecked" then sts.prop "checked", false
			else modal.find(".status").hide()
			modal.find("#notes").val item.notes or ""
			modal.modal("show")
			$scope.path = do item.getPath
			if not hooked
				hooked = true
				sts.on "change", -> $(@).prop "checked", @checked
				modal.on "hide", ->
					status = modal.find("#status").prop "checked"
					console.log status
					if status then status = "checked"
					else status = "unchecked"
					obj.modify JSON.stringify($scope.path),
						"text"   : do modal.find("#text").val
						"status" : status
						"notes"  : do modal.find("#notes").val
					$scope.safeApply()

		$scope.changeView = (to) ->
			$scope.view = to
			if to is "mindmap" then do $scope.object.controller.frameBuffer.start
			else do $scope.object.controller.frameBuffer.end

		jQuery(window).keydown (e) ->
			if e.ctrlKey or e.metaKey
				switch String.fromCharCode(e.which).toLowerCase()
					when 's'
						OPML.activeOPML.save()
						e.preventDefault()

		$scope.safeApply()
