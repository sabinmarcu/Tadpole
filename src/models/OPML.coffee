class OPML extends BaseObject

	constructor: (text = null) -> @parse text if text?

	parse: (text) =>
		@controller = new (DepMan.controller "OPML")( @ )
		parser = new DOMParser
		xml = parser.parseFromString text, "text/xml"
		@JSONize xml

	JSONize: (xml) =>
		@title = xml.getElementsByTagName("title")[0].childNodes[0].nodeValue
		@structure = (DepMan.model "Outline").generate xml

	find: (search = [], start = null) =>

		search = search.split "." if search.substr?
		start = @structure if not start

		next = search.shift()
		el = null
		for kid in start.topics
			if kid.text is next then el = kid; break

		return el if search.length is 0
		return null if not el? or not el.children?
		return @find search, el.children

	checkProp: (into, from, prop) ->
		aux = from.getAttribute prop
		if aux? then into[prop.substr 1].set aux

	download: =>
		form = document.createElement "form"
		form.setAttribute "action", "/echo/#{encodeURI(@title)}.opml"
		form.setAttribute "method", "POST"
		input = document.createElement "input"
		input.setAttribute "name", "content"
		input.value = ( do @export ).replace /["']/g, "\""
		form.appendChild input
		document.body.appendChild form
		form.submit()
		document.body.removeChild form


	export: => "<opml version='1.0'><head><title>#{@title}</title></head><body>#{do @exportBody}</body></opml>"

	exportBody: (tree = @structure) =>
		string = ""
		for kid in tree.topics
			string += "<outline text='#{kid.text.replace("\"", "&#34;").replace("'", "&#39;")}' "
			string += "_note='#{kid.note.replace("\"", "&#34;").replace("'", "&#39;").replace("\n", " ")}' " if kid.note?
			if kid.status? then string += "_status='#{kid.status}'"
			else if kid.children?
				kids = kid.children.topics
				valid = true
				for newkid in kids
					if not ( newkid.status in ["checked", "determinate" ] )
						valid = false
						break
				if valid then string += "_status='determinate'"
				else string += "_status='indeterminate'"
			else string += "_status='unchecked'"
			if kid.children then string += ">#{@exportBody kid.children}</outline>"
			else string += "/>"
		string.replace "\n", ""

	save: =>
		window.localStorage?.setItem "opmls.#{@title}", do @export
		storageIndex = JSON.parse window.localStorage?.getItem "opmls"
		if not storageIndex then window.localStorage?.setItem "opmls", JSON.stringify [@title]
		else if not ( @title in storageIndex )
			if @pastTitle?
				storageIndex.splice (storageIndex.indexOf @pastTitle), 1
				localStorage.removeItem "opmls.#{@pastTitle}"
				delete @pastTitle
			storageIndex.push @title
			window.localStorage?.setItem "opmls", ( JSON.stringify storageIndex ).replace /<br\/?>/g, ""
		Toast "Saved #{@title}", "<p>OPML Document saved. You can now return to ruining it, without the worry of loosing it</p>"

	findNode: (path, from = @structure) =>
		#alert "Arrived with path #{path}"
		el = do path.shift
		for kid in from.topics
			#alert "Comparing #{el} with #{kid.text}"
			if kid.text is el
				if path.length > 0 then return @findNode path, kid.children
				else return kid
		return null



	delete: =>
		index = JSON.parse localStorage.getItem "opmls"
		if @title in index
			do @controller.deactivate
			localStorage.removeItem "opmls.#{@title}"
			index.splice (index.indexOf @title), 1
			localStorage.setItem "opmls", JSON.stringify index

module.exports = OPML
