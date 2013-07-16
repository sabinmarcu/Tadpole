class SettingsBook extends BaseObject

	@extend IS.Modules.ORM
	@load: (items) ->
		@reuse item for item in items
	init: => @refresh false
	refresh: (promise = true) =>
		console.log "REFRESH", @value
		if promise
			Promise = new IS.Promise(if promise instanceof IS.Promise then promise else null)
			Promise.object = @
		Storage?.get @_id, (value) => @value = value is "true"; if promise then Promise.resolve Promise
		if promise then Promise
		else @
	save: (promise = true) =>
		if promise
			Promise = new IS.Promise(if promise instanceof IS.Promise then promise else null)
			Promise.object = @value
		Storage?.set @_id, @value
		Promise.resolve Promise
		if promise then Promise
		else @
	modify: (value, promise = true) =>
		console.log "MODIFY", @value
		if promise
			Promise = new IS.Promise(if promise instanceof IS.Promise then promise else null)
			Promise.object = @
		@value = value
		Promise.resolve Promise
		if promise then Promise
		else @
	toggle: (promise = true) =>
		console.log "MODIFY", @value
		if promise
			Promise = new IS.Promise(if promise instanceof IS.Promise then promise else null)
			Promise.object = @
		@modify(!@value, Promise).then(@save)
		if promise then Promise
		else @

module.exports = SettingsBook
