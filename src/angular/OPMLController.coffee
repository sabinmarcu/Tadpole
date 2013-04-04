if not document.getElementById("tree_row.html")
	e = document.createElement "script"
	e.innerHTML = DepMan.render "_outline_render"
	e.setAttribute "type", "text/ng-template"
	e.setAttribute "id", "tree_row.html"
	$("article section")[0].appendChild e

angular.module("Arrow").controller "OPMLController", ($scope, $rootScope, OPML) ->
	$scope.object = OPML.activeOPML or null
	$rootScope.$on "opml.change", (item) -> $scope.object = item
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
	$scope.addChild = (item) -> Client.publish "outline.addchild", JSON.stringify do item.getPath
	$scope.status = (item) -> item.getStatus()
	$scope.remove = (item) ->
		parent = item.parent
		item.parent.remove item
		if not parent.topics.length then parent.parent.children = null
	
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
				Client.publish "outline.edit", JSON.stringify($scope.path),
					"text"   : do modal.find("#text").val
					"status" : status
					"notes"  : do modal.find("#notes").val
	
	jQuery(window).keydown (e) ->
		if e.ctrlKey or e.metaKey
			switch String.fromCharCode(e.which).toLowerCase()
				when 's'
					OPML.activeOPML.save()
					e.preventDefault()

	Client?.events =
		"outline.addchild": (path) -> item = OPML.activeOPML.findNode JSON.parse path; item.addChild(); do $scope.$apply
		"outline.edit": (path, data) ->
			item.text = data.text
			if item.status in ["checked", "unchecked"]
				item.status = data.status
			item.notes = data.notes
			$scope.$apply()
