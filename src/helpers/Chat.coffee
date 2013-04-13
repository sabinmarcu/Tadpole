class ChatHelper extends BaseObject
	constructor: ->
		window.storage.get ->

		Client?.events = {}
	gotChat: =>

module.exports = ChatHelper