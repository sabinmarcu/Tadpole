class PageController extends IS.Object

Promise = new IS.Promise()
angular.module("OneMind").controller "Page", ($scope) ->
	Promise.resolve new PageController $scope

module.exports = Promise
