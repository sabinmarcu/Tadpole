class OPMLController extends IS.Object
	@OPMLs = {}

	@init = ->
		index = JSON.parse window.localStorage?.getItem "opmls"
		if index
			for item in index
				@open ( window.localStorage?.getItem "opmls.#{item}" ), true

	@open = (file, silent = false) ->
		@activeOPML = (new (DepMan.model "OPML"))
		@activeOPML.parse file
		@OPMLs[@activeOPML.title] = @activeOPML
		unless silent
			do @renderView
		do @renderList

	@openOPML = (which) ->
		@activeOPML = @OPMLs[which]
		do @renderView
		do @renderList

	@renderView = ->
		document.querySelector("article section").innerHTML = DepMan.render "view", items: @activeOPML.json
		rows = document.querySelectorAll("article section .row.noborder")
		for row in rows
			row.addEventListener "click", (e) ->
				if ( e.target.className.indexOf "folded" ) >= 0 then e.target.className = e.target.className.replace /\ ?folded/, ""
				else e.target.className = "#{e.target.className} folded"
				do e.preventDefault
				do e.stopPropagation
		ao = @activeOPML
		document.querySelector("article header h1").innerHTML = @activeOPML.title
		document.querySelector("article header h1").addEventListener "click", (e) ->
			do ao.download
			do e.preventDefault
			do e.stopPropagation
		findElement = @proxy (e) ->
			path = e.target.parentNode.dataset["objectpath"]
			path = path.split "."
			prop = do path.shift
			item = @activeOPML.json[prop]
			parent = null
			while path.length
				parent = item
				prop = do path.shift
				item = item.children[prop]
			[ item, parent, prop ]
		, @
		checkboxes = document.querySelectorAll("article section i:not(.icon-custom)")
		for cb in checkboxes
			cb.addEventListener "click", @proxy (e) =>
				do e.preventDefault
				do e.stopPropagation
				switch e.target.className
					when "icon-check" then status = "check-empty"
					when "icon-check-empty" then status = "check"
					when "icon-circle" then status = "circle-blank"
					when "icon-circle-blank" then status = "circle"
				item = findElement e
				item.status = status
				e.target.setAttribute "class", "icon-#{status}"
			, @
		texts = document.querySelectorAll("article section p")
		console.log "Saving"
		for text in texts
			text.addEventListener "dblclick", @proxy (e) ->
				e.target.setAttribute "contenteditable", "true"
				console.log e.target.parentNode.dataset["objectpath"]
				[item, parent, prop] = findElement e
				e.target.addEventListener "blur", @proxy (e) ->
					txt = e.target.innerText
					console.log parent, txt, item
					parent.children[txt] = item
					parent.children[prop] = null
					path = e.target.parentNode.dataset["objectpath"].split "."
					do path.pop
					path.push txt
					e.target.parentNode.setAttribute "data-objectpath", path.join "."
					e.target.removeAttribute "contentEditable"
				, @
			, @
		

	@renderList = ->
		document.querySelector("aside section").innerHTML = DepMan.render "list", items: @OPMLs, active: @activeOPML
		list = document.querySelectorAll("aside section li")
		cntr = @
		for item in list
			item.addEventListener "click", (e) ->
				cntr.openOPML.call cntr, e.target.id

module.exports = OPMLController
