class StorageItem
	constructor: (@item, @key, @parent) -> @driver = @parent.driver

	get: (callback, parse = false) =>
		@driver.get @item, (@value) =>
			@value = JSON.parse @value if parse
			callback @value

	set : (value, stringify = false) =>
		if stringify then value = JSON.stringify value
		@driver.set @item, value
	
	remove: () => @driver.remove @item; @parent._remove @item

class Storage
	constructor: (callback) ->
		# Initial setup
		[@items, @lastKey, drivers] = [{}, 0, { "localstorage": "LocalStorage", "indexeddb": "IndexedDB" }]

		# Loading Drivers
		Loading.start().progress "Loading Database"
		if Tester.indexeddb then @driver = new ( DepMan.helper "storage/Drivers/#{drivers.indexeddb}" )(=> Loading.end(); callback() )
		else if Tester.localstorage then @driver = new ( DepMan.helper "storage/Drivers/#{drivers.localstorage}" )(=> Loading.end(); callback() )

	# CRUD Definitions
	reuse  : (item) => @items[item] or (@items[item] = new StorageItem(item, @lastKey++, @))
	get    : (item, callback, parse = false) => (@reuse item).get callback, parse
	set    : (item, value, stringify = false) => (@reuse item).set value, stringify
	remove : (item) => do (@reuse item).remove

	# Ceanup Functions
	_remove: (item) => @items[item] = null

module.exports = Storage
