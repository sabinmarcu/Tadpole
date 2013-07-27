class IndexedDBDriver extends IS.Object
	~> @init!open-database!
	get: ~>
	set: ~>
	remove: ~>
	open: ~>
		@version = 1
		req = indexedDB.open "tadpole", @version
	init: ~> @db = null
	success: ~>
	error: @log "Database Error : ", it

module.exports = new IndexedDBDriver()
