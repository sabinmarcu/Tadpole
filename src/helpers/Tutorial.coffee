module.exports = =>
	DepMan.lib "introjs"
	DepMan.stylesheet "introjs"
	intro = introJs()
	scope = angular.element("[ng-controller='NGAsideController']").scope()
	manager = angular.element("[ng-controller='OPMLManager']").scope()
	scope.sidebarstatus = "closed"; scope.safeApply()
	intro.onchange (target) => 
		target = parseInt(target.getAttribute "data-step")
		switch target
			when 1 then setTimeout (=> $(".introjs-helperLayer").css("left", "0px")), 50
			when 2 then scope.sidebarstatus = "open"; scope.safeApply()
			when 4 then scope.asidetab "LIST"
			when 5 then scope.asidetab "SERVER"
			when 9 then scope.asidetab "GENERAL"
			when 10 then scope.asidetab "LIST"
	intro.oncomplete =>

		scope.sidebarstatus = "closed"; scope.safeApply()
		window.FIRSTOPMLTUTORIAL = 1
		$("[data-step]").removeAttr("data-step").removeAttr("data-intro").removeAttr("data-position")
		manager.new()
		opml = angular.element("[ng-controller='OPMLController']").scope()
		opml.changeView "outline"

		intro = introJs()
		intro.onchange (target) =>
			target = parseInt(target.getAttribute "data-step")
			switch target
				when 9 then opml.sidebarstatus = true; opml.safeApply()
				when 11 then opml.changeView "mindmap"; opml.sidebarstatus = true; opml.safeApply()
				when 17 then opml.changeLevel(1)
				when 18 then opml.changeLevel(-1)
		setTimeout -> 
			base = $("body > article section article .approw").first()
			base.find(".icon-custom").first().attr("data-intro", "If this node has children, press this button to fold them").attr("data-step", "3")
			base.find(".icon-circle-blank").first().attr("data-intro", "This is the status icon. For nodes with children, this icon will show the overall status. For leaf nodes, interacting with this icon toggles the status.").attr("data-step", "4")
			base.find("input").first().attr("data-intro", "This is where the text of the node is stored and edited.").attr("data-step", "5")
			base.find(".btn.add").last().attr("data-intro", "Press this button to add a child node to this one.").attr("data-step", "6").attr("data-position", "left")
			base.find(".btn.remove").last().attr("data-intro", "Press this button to remove this node.").attr("data-step", "7").attr("data-position", "left")
			base.find(".btn.edit").last().attr("data-intro", "Press this button to open a edit window for this node.").attr("data-step", "8").attr("data-position", "left")
			intro.goToStep(1).start()
		, 500

	Storage.set "tutorial", "false"

	intro.start "#showhideappmenu"