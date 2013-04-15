class LocationsService extends BaseObject

	levels = []
	constructor: (@model) ->
		@levels = []
		do @_firstTimeSetup

	_firstTimeSetup: =>
		@generate @model.structure, 0

	generate: (list, depth) =>
		@levels[depth] ?= 30
		levelX = depth * 350 + 50
		for item in list.topics
			if item.children then @generate item.children, depth + 1
			if item.x is "" or item.y is ""
				item.y = @levels[depth]
				item.x = levelX
				@levels[depth] += 75


module.exports = LocationsService