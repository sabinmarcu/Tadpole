class OPML extends BaseObject

	constructor: (text = null) ->

	parse: (text) =>
		parser = new DOMParser
		xml = parser.parseFromString text, "text/xml"
		@JSONize xml

	JSONize: (xml) =>
		@title = xml.getElementsByTagName("title")[0].childNodes[0].nodeValue
		@json = @parseTree xml.getElementsByTagName("body")[0]
		rows = document.querySelectorAll("article section .row.noborder")
		for row in rows
			row.addEventListener "click", (e) ->
				if ( e.target.className.indexOf "folded" ) >= 0 then e.target.className = e.target.className.replace /\ ?folded/, ""
				else e.target.className = "#{e.target.className} folded"
				do e.preventDefault
				do e.stopPropagation

	parseTree: (tree) =>
		ret = {}
		isNested = false
		for child in tree.childNodes
			continue if child.nodeName isnt "outline"
			isNested = true
			current = {}
			ret[child.getAttribute "text"] = current
			@checkProp current, child, "_note"
			@checkProp current, child, "_status"
			switch current.status
				when "indeterminate" then current.status = "circle-blank"
				when "determinate" then current.status = "circle"
				when "checked" then current.status = "check"
				else current.status = "check-open"
			current.children = @parseTree child
			
		if not isNested then return null
		ret

	checkProp: (into, from, prop) ->
		aux = from.getAttribute prop
		if aux? then into[prop.substr 1] = aux

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

	exportBody: (tree = @json) =>
		string = ""
		for title, props of tree
			string += "<outline text='#{title.replace("\"", "#34;").replace("'", "#39;")}' "
			string += "_note='#{props["note"].replace("\"", "#34;").replace("'", "#39;")
}' " if props["note"]
			if props["status"]
				switch props["status"]
					when "circle-blank" then string += "_status='indeterminate' "
					when "circle" then string += "_status='determinate' "
					when "check" then string += "_status='checked' "
					else string += "_status='unchecked' "
			if props["children"] then string += ">#{@exportBody props["children"]}</outline>"
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
