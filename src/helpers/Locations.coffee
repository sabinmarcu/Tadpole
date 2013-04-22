class LocationsService extends BaseObject

	levels = []
	constructor: (@model) ->
		do @generateLocations

	generateLocations: =>
		@levels = []
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

	getNextChild: (level) => @levels[level] ?= 0; @levels[level] += 75; x: level * 350 + 50 , y: @levels[level] - 75


module.exports = LocationsService
