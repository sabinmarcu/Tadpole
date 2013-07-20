class OPMLReader extends IS.Object
	(@data) ~>
		@json = []
		@opml = ""
		switch typeof @data
		| \array, \object => @encode-json!
		| otherwise => @decode-opml!

	encode-json: ~> @json = @data.data; @title = @data.title; [body, expansionState] = @encode-node @json; @opml = """<?xml version='1.0' encoding='utf-8' ?>
		<opml>
			<head>
				<title>#{@data.title}</title>
				<expansionState>#expansionState</expansionState>
			</head>
			<body>
	#body
			</body>
		</opml>
	"""
	encode-node: (list, depth = 3) ~>
		@log "Encoding [#depth]", list
		@index ?= 0
		expansionState = []
		finalstring = ""
		const tabs = new Array(depth + 1) * "\t"
		for node in list
			string = "#tabs<outline "
			for key, value of node then unless key in [ \children \_folded \id ]
				string += "#key='#value' "
			@index += 1
			if node._folded then expansionState.push @index
			if node.children?
				nextState = []
				nextString = ""
				string += ">\n"
				[nextString, nextState] = @encode-node node.children, depth + 1
				string += nextString
				expansionState = expansionState ++ nextState
				string += "#tabs</outline>\n"
			else string += "/>\n"
			finalstring += string
		[ finalstring, expansionState ]

	decode-opml: ~>
		@opml = @data
		@dom = ( new DOMParser() ).parseFromString @opml, "text/xml" .children[0]
		@index = 0
		@expansionState = JSON.parse [ \[, ( @dom.children[0].querySelector "expansionState" .childNodes[0].nodeValue ), \] ] * ""
		@json =
			title: @dom.children[0].querySelector "title" .childNodes[0].nodeValue
			data: @decode-list @dom.children[1].children

	decode-list: (list) ~>
		l = []
		for item in list
			@index += 1
			i = {}
			if @index in @expansionState then i._folded = true
			for attr in item.attributes
				i[attr.nodeName] = attr.nodeValue
			if item.children.length
				i.children = @decode-list item.children
			l.push i
		l


class OPMLAPI extends IS.Object
	~> @log "OPML API Online!"; window.OPML = @
	read: (data) ~> new OPMLReader data

angular.module AppInfo.displayname .service \OPMLReader, new OPMLAPI
