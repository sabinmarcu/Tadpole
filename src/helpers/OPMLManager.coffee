class OPMLManager extends IS.Object

	constructor: () ->
		@OPMLs = []
		@activeOPML = null
		@activateControllerFunctions = []

	bootstrap: () =>

		# Binding AngularJS
		DepMan.angular("OPMLController")
		$("article#list").html(DepMan.render("_list")).attr("ng-csp", true).attr("ng-controller", "OPMLManager")
		DepMan.angular("OPMLManager")
		
		window.storage.getItem "opmls", (sets) =>
			index = JSON.parse sets.opmls if sets.opmls?
			if index
				for item, key in index
					console.log item, key, key is index.length - 1
					window.storage.getItem "opmls.#{item}", (sets) =>
						@open sets["opmls.#{item}"], true
			func @OPMLs[index] for func, index in @activateControllerFunctions

	open: (file, silent) =>	Client.publish "opml.open", file, silent; @refreshView?()

	openOPML: (opml, override = false) => if opml? then Client.publish "opml.openOPML", (@OPMLs.indexOf opml), override, opml.text, Client.id; @refreshView?()

	_open: (file, silent = false) =>
		do @activeOPML.controller.deactivate if @activeOPML? and not silent
		x = new (DepMan.model "OPML")(file, @)
		@activeOPML = x
		@OPMLs.push @activeOPML
		@activeOPML.index = @OPMLs.indexOf @activeOPML
		do @activeOPML.controller.activate if not silent
		if silent then @activeOPML = null
		func = @activateControllerFunctions.shift()
		func x


	_openOPML: (opml, override = false, text = null; id = null) =>
		if id? and id isnt Client.id then @_open text
		else
			return if not opml?
			opml = @OPMLs[opml]
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
Client?.events =
	"opml.open": _inst._open
	"opml.openOPML": _inst._openOPML
Client?.loadEvents()
Arrow.factory "OPML", -> _inst
_inst.bootstrap.apply _inst, []
module.exports = _inst
