window.storage =
	"setItem": (key, value) ->
		if chrome? and chrome.storage? then chrome.storage.sync.set key: value
		else window.localStorage.setItem key, value
	"getItem": (item, callback) ->
		if chrome? and chrome.storage? then chrome.storage.sync.get item, callback
		else
			res = {}; res[item] = window.localStorage.getItem item
			callback res

class StorageItem
	constructor: (@item, @key) ->

	get: (callback, parse = false) =>
		window.storage.getItem @item, (sets) =>
			@value = sets[@item] or null
			@value = JSON.parse @value
			callback @value

	set: (value, stringify = false) =>
		if stringify then value = JSON.stringify value
		window.storage.setItem @item, value

class Storage
	constructor: -> [@items, @lastKey] = [{}, 0]
	new: (item) => @items[item] or (@items[item] = new StorageItem(item, @lastKey++))
	get: (item, callback) => (@new item).get callback
	set: (item, value) => (@new item).set value

module.exports = Storage