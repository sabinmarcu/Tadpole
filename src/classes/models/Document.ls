class DocumentModel extends IS.Object

	init: (data) ~> 
		@parent = @constructor
		@rawData = data.data
		@title = data.title
		@_id = @_uuid
		@parent.documents.push @_id
		@log "New Document: [#{@title}|#{@_id}]";

	rename: (newname) ~> @parent.rename @, newname

	@inject = (@runtime) ~> 
		@documents = []
		@

	@get-document = (data) ~> 
		kid = @reuse null, data
		@runtime.set \active-document, kid._id
		kid
	@new = ~> 
		@get-document title: "New Document", data: [
			* title: "Parent Node"
			* title: "Sibling"
		]

	@rename = (item, newname) ->
		@_symlinks[newname] = item
		if @_symlinks[item._id] then delete @_symlinks[item._id]
		item._id = newname

	@extend IS.Modules.ORM

angular.module AppInfo.displayname .factory \Documents, [ "Runtime", DocumentModel.inject ]
module.exports = DocumentModel
