class OPMLManager extends IS.Object

	constructor: () ->
		@OPMLs = []
		@activeOPML = null
		index = JSON.parse window.localStorage?.getItem "opmls"
		if index
			for item, key in index
				console.log item, key, key is index.length - 1
				@open ( window.localStorage?.getItem "opmls.#{item}" ), true


	bootstrap: () ->

		# Binding AngularJS
		DepMan.angular("OPMLController")
		$("aside").html DepMan.render "_list"
		$("aside").attr "ng-controller", "OPMLManager"
		$("article > section").attr "ng-controller", "OPMLController"
		angular.bootstrap $("article section")[0], ["Arrow"]
		DepMan.angular("OPMLManager")

	open: (file, silent = false) =>
		do @activeOPML.controller.deactivate if @activeOPML? and not silent
		@activeOPML = new (DepMan.model "OPML")(file)
		@OPMLs.push @activeOPML
		@activeOPML.index = @OPMLs.indexOf @activeOPML
		do @activeOPML.controller.activate if not silent
		if silent then @activeOPML = null

	openOPML: (opml, override = false) =>
		return if not opml?
		les = document.querySelectorAll ".dragdropplaceholder"
		le.parentNode.removeChild le for le in les if les?
		if not @activeOPML? or ( opml isnt @activeOPML ) or override
			do @activeOPML.controller.deactivate if @activeOPML?
			if opml in @OPMLs then @activeOPML = opml
			do @activeOPML.controller.activate

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

	delete: (opml) => @OPMLs.splice (@OPMLs.indexOf opml), 1; do opml.delete

_inst = new OPMLManager()
Arrow.factory "OPML", -> _inst
do _inst.bootstrap
module.exports = _inst