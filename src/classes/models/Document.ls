class DocumentModel extends IS.Object
	init: ~> 
		@parent = @constructor
		@log "New Document: [#{@_id}]";
	rename: (newname) ~> @parent.rename @, newname
	@rename = (item, newname) ->
		@_symlinks[newname] = item
		if @_symlinks[item._id] then delete @_symlinks[item._id]
		item._id = newname
	@extend IS.Modules.ORM

angular.module AppInfo.displayname .factory \Documents, [ DocumentModel ]
module.exports = DocumentModel
