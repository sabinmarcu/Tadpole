class OPMLManager extends IS.Object

	constructor: ->
		@OPMLs = {}
		index = JSON.parse window.localStorage?.getItem "opmls"
		if index
			for item in index
				@open ( window.localStorage?.getItem "opmls.#{item}" ), true
		document.getElementById("createOPML").addEventListener "click", (e) => do @new

	open: (file, silent = false) =>
		do @activeOPML.rcontroller.deactivate if @activeOPML?
		@activeOPML = new (DepMan.model "OPML")(file)
		@OPMLs[@activeOPML.title] = @activeOPML
		do @activeOPML.rcontroller.activate
		do @renderList

	openOPML: (which) =>
		les = document.querySelectorAll ".dragdropplaceholder"
		le.parentNode.removeChild le for le in les if les?
		if not @activeOPML? or ( which isnt @activeOPML.title )
			do @activeOPML.rcontroller.deactivate if @activeOPML?
			@activeOPML = @OPMLs[which]
			do @activeOPML.rcontroller.activate
			do @renderList

	new: => @open """
		<opml version='1.0'>
			<head>
				<title>New OPML</title>
			</head>
			<body>
				<outline text=\"Parent Node\">
					<outline text=\"First Child\" _status=\"checked\" _note=\"Some Notes\" />
					<outline text=\"Second Child\" />
				</outline>
			</body>
		</opml>"""

	renderList: =>
		document.querySelector("aside section").innerHTML = DepMan.render "list", items: @OPMLs, active: @activeOPML
		list = document.querySelectorAll("aside section li")
		for item in list
			item.addEventListener "click", (e) =>
				@openOPML e.target.id
			for kid in item.children
				if kid.tagName is "P" then do (kid) =>
					kid.addEventListener "dblclick", =>
						kid.original = kid.innerHTML
						kid.setAttribute "contenteditable", "true"
						kid.focus()
					kid.addEventListener "blur", =>
						kid.setAttribute "contenteditable", "false"
						@OPMLs[kid.original].title = kid.innerHTML
						@OPMLs[kid.innerHTML] = @OPMLs[kid.original]
						@OPMLs[kid.original] = null
						@OPMLs[kid.innerHTML].save()
						storageIndex = JSON.parse window.localStorage?.getItem "opmls"
						storageIndex.splice storageIndex.indexOf(kid.original), 1
						window.localStorage?.setItem "opmls", JSON.stringify storageIndex
						window.localStorage?.setItem "opmls.#{kid.original}", null

module.exports = new OPMLManager()
