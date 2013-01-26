class OPMLManager extends IS.Object

	constructor: ->
		@OPMLs = {}
		index = JSON.parse window.localStorage?.getItem "opmls"
		if index
			for item in index
				@open ( window.localStorage?.getItem "opmls.#{item}" ), true
		document.getElementById("createOPML").addEventListener "click", (e) => do @new

	open: (file, silent = false) =>
		do @activeOPML.controller.deactivate if @activeOPML?
		@activeOPML = new (DepMan.model "OPML")(file)
		@OPMLs[@activeOPML.title] = @activeOPML
		do @activeOPML.controller.activate
		do @renderList

	openOPML: (which) =>
		les = document.querySelectorAll ".dragdropplaceholder"
		le.parentNode.removeChild le for le in les if les?
		if not @activeOPML? or ( which isnt @activeOPML.title )
			do @activeOPML.controller.deactivate if @activeOPML?
			@activeOPML = @OPMLs[which]
			do @activeOPML.controller.activate
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

module.exports = new OPMLManager()
