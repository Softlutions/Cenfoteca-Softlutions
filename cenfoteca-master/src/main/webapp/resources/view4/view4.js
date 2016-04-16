'use strict';

angular
		.module('myApp.view4', [ 'ngRoute' ])

		.config([ '$routeProvider', function($routeProvider) {
			$routeProvider.when('/view4', {
				templateUrl : 'resources/view4/view4.html',
				controller : 'View4Ctrl'
			});
		} ])

		.controller(
				'View4Ctrl',
				[
						'$scope',
						'$http',
						'$location',
						'$upload',
						function($scope, $http, $location, $upload) {

							$scope.rent = {};
							$scope.files = {};
							$scope.onError = false;
							$scope.requestObject = {};

							$scope.alquileres = [];
							$scope.requestObject = {"pageNumber": 0,"pageSize": 0,"direction": "","sortBy": [""],"searchColumn": "string","searchTerm": "","user": {}};
							$http.get('rest/protected/rent/getIsNotRent',$scope.requestObject).success(function(response) {
								console.log("response",response)
								$scope.alquileres = response.alquileres;
								console.log("$scope.usuarios",$scope.usuarios)
							});
							
							$scope.alquilados = [];
							$http.get('rest/protected/rent/getByUser',$scope.requestObject).success(function(response) {
								console.log("response",response)
								$scope.alquilados = response.alquileres;
								console.log("$scope.usuarios",$scope.usuarios)
								
							$scope.saveRent = function(id){
								$scope.alquilados.push($scope.alquileres[id]);
								$scope.alquileres.splice(id,1);	
								
					/*			$scope.onError = false;
								var dataCreate = {
									idUsuario : $scope.tipoUsuario.tipo,
									idALquiler : $scope
								};
								if($scope.tipoUsuario.tipo !=null){
								$http.post('rest/protected/rent/saveRent',dataCreate).success(function(response) {
									console.log("response",response)
									$scope.tipoUsuarios = $scope.tipoUsuarios.concat(dataCreate);
								});
								}else{
									alert('Mal')
								} */
							};
							});
						} 
				]);


