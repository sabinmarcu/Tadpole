class DnD extends BaseObject
	
	@ph = null

	@init: ->
		document.addEventListener "dragenter", ( @proxy @dragEnter, @ ), true
		document.addEventListener "dragexit", ( @proxy @dragExit, @ ), true
		document.addEventListener "dragleave", ( @proxy @dragExit, @ ), true

	@dragEnter: (e) ->
		@ph = document.createElement "div"
		@ph.className = "dragdropplaceholder"
		span = document.createElement "span"
		span.innerHTML = "Drop file over here"
		@ph.appendChild span
		document.querySelector("article section").appendChild @ph
		@ph.className += " active"
		@ph.addEventListener "dragover", ( @proxy @dragOver, @ ), true
		@ph.addEventListener "drop", ( @proxy @dragHandler, @ ), true
		do e.stopPropagation
		do e.preventDefault

	@dragExit: (e) ->
		@ph.parentNode.removeChild @ph
		do e.stopPropagation
		do e.preventDefault

	@dragOver: (e) ->
		@ph.className = @ph.className.replace /\ ?hover/, ""
		@ph.className += " hover"
		e.dataTransfer.dropEffect = "copy"
		do e.stopPropagation
		do e.preventDefault

	@dragHandler: (e) =>
		do e.stopPropagation
		do e.preventDefault

		@ph.className = @ph.className.replace /\ ?(hover|active)/, ""

		files = e.dataTransfer.files or e.target.files
		for file in files
			continue if not file.name.match /.*opml/
			do =>
				reader = new FileReader
				reader.onload = @readHandler
				reader.readAsText file

	@readHandler: (file) =>
		DepMan.helper("OPMLManager").open file.target.result
		

module.exports = DnD
