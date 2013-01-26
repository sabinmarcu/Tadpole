class OPML extends BaseObject

	constructor: (text = null) -> @parse text if text?

	parse: (text) =>
		parser = new DOMParser
		xml = parser.parseFromString text, "text/xml"
		@JSONize xml

	JSONize: (xml) =>
		@title = xml.getElementsByTagName("title")[0].childNodes[0].nodeValue
		@structure = (DepMan.model "Outline").generate xml
		@controller = new (DepMan.controller "OPML")( @ )

	find: (search = [], start = null) =>

		search = search.split "." if search.substr?
		start = @structure if not start

		next = search.shift()
		el = null
		for kid in start.topics
			if kid.text.get() is next then el = kid; break

		return el if search.length is 0
		return null if not el? or not el.children.get()?
		return @find search, el.children.get()

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
			string += "<outline text='#{kid.text.get().replace("\"", "&#34;").replace("'", "&#39;")}' "
			string += "_note='#{kid.note.get().replace("\"", "&#34;").replace("'", "&#39;").replace("\n", " ")}' " if kid.note.get()?
			if kid.status.get()? then string += "_status='#{kid.status.get()}'"
			else if kid.children.get()?
				kids = kid.children.get().topics
				valid = true
				for newkid in kids
					if not ( newkid.status.get() in ["checked", "determinate" ] )
						valid = false
						break
				console.log valid
				if valid then string += "_status='determinate'"
				else string += "_status='indeterminate'"
			else string += "_status='unchecked'"
			if kid.children.get() then string += ">#{@exportBody kid.children.get()}</outline>"
			else string += "/>"
		string

	save: =>
		window.localStorage?.setItem "opmls.#{@title}", do @export
		storageIndex = JSON.parse window.localStorage?.getItem "opmls"
		if not storageIndex then window.localStorage?.setItem "opmls", JSON.stringify [@title]
		else if not ( @title in storageIndex )
			storageIndex.push @title
			window.localStorage?.setItem "opmls", JSON.stringify storageIndex

module.exports = OPML


class OPMLER extends IS.Object

	@errorGroups = []
	@errorGroupMap = []
	@errorMessages = []

	@extend IS.ErrorReporter
