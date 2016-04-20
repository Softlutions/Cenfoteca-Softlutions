'use strict';

angular
		.module('myApp.view5', [ 'ngRoute' ])

		.config([ '$routeProvider', function($routeProvider) {
			$routeProvider.when('/view5/:rentId', {
				templateUrl : 'resources/view5/view5.html',
				controller : 'View5Ctrl'
			});
		} ])

		.controller(
				'View5Ctrl',
				[
						'$scope',
						'$http',
						'$routeParams',
						function($scope, $http, $routeParams) {
							var rentId = $routeParams.rentId;
							
							
						} 
				]);


