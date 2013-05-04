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
		$scope.view = "mindmap"; do $scope.object.controller.frameBuffer.start

		$scope.isMobile = window.isMobile

		$scope.type = (item) ->
			if item.children isnt null then "noborder"
			else ""
		$scope.hidden = (item) ->
			if item.children isnt null then ""
			else "hidden"
		$scope.folded = (item) -> 
			if not item.children? then "icon-custom icon-hidden"
			else
				if item.fold then "icon-custom icon-chevron-right"
				else "icon-custom icon-chevron-down"
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
			$scope.path = do item.getPath
			console.log ($scope.path.join ", "), $scope.object.marked, ($scope.path.join ", ") in $scope.object.marked
			if ($scope.path.join ", ") in $scope.object.marked
				Toast "Whoops", "Someone is already editing this node ... please try again later :)"
				return 
			$scope.object.markEdit $scope.path

			console.log $scope.path, $scope.object.marked
			modal = jQuery(".editnode##{$scope.getTitle()}") if not modal? or modal[0]?
			modal.find("#text").val item.text
			modal.find(".status").show()
			sts = modal.find("#status")						
			if item.status is "checked" then sts.prop "checked", true
			else if item.status is "unchecked" then sts.prop "checked", false
			else modal.find(".status").hide()
						
			modal.find(".folding").show()
			fld = modal.find "#folding"
			if item.fold then fld.prop "checked", true
			else fld.prop "checked", false
			if item.status in ["checked", "unchecked"] then modal.find(".folding").hide()
						
			modal.find("#notes").val item.note or ""
			modal.find("#new").click => obj.addChild JSON.stringify $scope.path; modal.modal("hide")
			modal.find("#delete").click => modal.modal("hide"); obj.removeChild JSON.stringify $scope.path; modal.remove()
			$(document.body).append modal
			modal.modal("show")

			if not hooked
				hooked = true
				sts.on "change", -> $(@).prop "checked", @checked
				modal.find("form").submit (e) => do e.preventDefault; false
				modal.on "hide", ->
					$scope.object.unMarkEdit $scope.path
					status = modal.find("#status").prop "checked"
					if status then status = "checked"
					else status = "unchecked"
					fold = modal.find("#folding").prop "checked"
					if fold then fold = true
					else fold = false
					console.log do modal.find("#folding").val
					obj.modify JSON.stringify($scope.path),
						"text"   : do modal.find("#text").val
						"status" : status
						"note"   : do modal.find("#notes").val
						"fold"   : fold
					jQuery(".modal-container##{$scope.getTitle()}").append modal
					$scope.safeApply()

		views = ["mindmap", "outline"]
		$scope.changeView = (to = null) ->
			if not to?
				if $scope.view is views[0] then to = views[1]
				else to = views[0]
			$scope.view = to
			if to is "mindmap" then do $scope.object.controller.frameBuffer.start
			else do $scope.object.controller.frameBuffer.end
			$scope.sidebarstatus = false
			$scope.safeApply()

		obj.changeViewType = $scope.changeView

		$scope.getTitle = -> obj.title.replace(/\ /g, "_")
		$scope.sidebarstatus = false
		$scope.toggleSidebar = -> $scope.sidebarstatus = not $scope.sidebarstatus; do $scope.safeApply
		$scope.cancelSidebar = -> $scope.sidebarstatus = false; do $scope.safeApply
		$scope.toggleLegend = -> $scope.object.controller.frameBuffer.triggers.legend = not $scope.object.controller.frameBuffer.triggers.legend if $scope.view is "mindmap"
		$scope.toggleLevel = -> $scope.object.controller.frameBuffer.triggers.level = not $scope.object.controller.frameBuffer.triggers.level if $scope.view is "mindmap"
		$scope.toggleLevelNo = -> $scope.object.controller.frameBuffer.triggers.levelno = not $scope.object.controller.frameBuffer.triggers.levelno if $scope.view is "mindmap"
		$scope.toggleShortcuts = -> $scope.object.controller.frameBuffer.triggers.shortcuts = not $scope.object.controller.frameBuffer.triggers.shortcuts if $scope.view is "mindmap"
		$scope.changeLevel = (amount) -> return if amount is -1 and $scope.object.controller.frameBuffer.level is 0; $scope.object.controller.frameBuffer.level += amount if $scope.view is "mindmap"

		obj.scope = $scope

		jQuery(window).keydown (e) ->
			if e.ctrlKey or e.metaKey
				switch String.fromCharCode(e.which).toLowerCase()
					when 's'
						OPML.activeOPML.save()
						e.preventDefault()

		$scope.safeApply()
