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
	$scope.addChild = (item) -> item.addChild()
	$scope.status = (item) -> item.getStatus()
	$scope.remove = (item) ->
		parent = item.parent
		item.parent.remove item 
		if not parent.topics.length then parent.parent.children = null
		
	$scope.edit = (item) ->
		currentItem = item
		modal = jQuery("#editnodemodal")
		modal.find("#text").val item.text
		modal.find("#status").show()
		modal.find("#status").attr "checked", (item.status is "checked")
		if not(item.status in ["unchecked", "checked"]) then model.find("#status").hide()
		modal.find("#notes").val item.notes or ""
		modal.modal("show").on "hide", ->
			currentItem.text = do modal.find("#text").val
			if item.status in ["checked", "unchecked"]
				if modal.find("#status").attr "checked"
					currentItem.status = "checked"
				else currentItem.status = "unchecked" 
			currentItem.notes = do modal.find("#notes").val
 
	jQuery(window).keydown (e) -> 
		if e.ctrlKey or e.metaKey
			switch String.fromCharCode(e.which).toLowerCase()
				when 's'
					OPML.activeOPML.save()
					e.preventDefault()