class ContextMenuController extends BaseObject

	constructor: (data, event) ->
		items = []
		handlers = []
		for name, handler of data
			items.push name
			handlers.push handler
		@placeholder = document.createElement "div"
		@placeholder.innerHTML = DepMan.render "ContextMenu", items: items, event:
			x: event.clientX or event.touches[0].clientX
			y: event.clientY or event.touches[0].clientY
		@menu = @placeholder.children[0]
		document.body.appendChild @placeholder
		do @menu.focus
		@menu.addEventListener "blur", @deactivate
		for kid in @menu.children
			id = kid.id.replace "item-", ""
			kid.addEventListener "click", =>
				do @deactivate
				do handlers[id]
		
	deactivate: =>
		@placeholder.parentNode.removeChild @placeholder
		delete @menu
		delete @placeholder

module.exports = ContextMenuController
