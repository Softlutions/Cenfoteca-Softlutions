'use strict';

angular
		.module('myApp.view2', [ 'ngRoute' ])

		.config([ '$routeProvider', function($routeProvider) {
			$routeProvider.when('/view2', {
				templateUrl : 'resources/view2/view2.html',
				controller : 'View2Ctrl'
			});
		} ])

		.controller(
				'View2Ctrl',
				[
						'$scope',
						'$http',
						'$location',
						'$upload',
						function($scope, $http, $location, $upload) {

							$scope.rent = {};
							$scope.files = {};
							$scope.onError = false;
							$scope.tipoAlquilerList = [];
							$scope.requestObject = {};

							$scope.alquileres = [];
							
							$scope.requestObject = {"pageNumber": 0,"pageSize": 0,"direction": "","sortBy": [""],"searchColumn": "string","searchTerm": "","user": {}};
							
							$scope.getAllRent = function () {
								$http.get('rest/protected/rent/getAll',$scope.requestObject).success(function(response) {
									$scope.alquileres = response.alquileres;
								});
							}
						
							
							$scope.init = function() {
								$scope.getAllRent();
								
								$http
										.get(
												'rest/protected/tipoAlquiler/getAll')
										.success(
												function(response) {

													$scope.tipoAlquilerList = response.tipoAlquilerList;
													$scope.requestObject.idTipoAlquiler = $scope.tipoAlquilerList[0].idTipoAlquiler;

												});

							};
							
							$scope.loadData = function(palquiler){
								$scope.rentToEdit = palquiler;
								$scope.idTipoAlquiler = palquiler.idTipoAlquiler;
								$scope.name = palquiler.name;
								$scope.description = palquiler.description;
								$('#createButton').addClass('hidden');
								$('#updateButton').removeClass('hidden');
								
							}
							$scope.init();

							$scope.onFileSelect = function($files) {
								$scope.files = $files;
							};
							$scope.saveRent = function(event) {
								for (var i = 0; i < $scope.files.length; i++) {
									var file = $scope.files[i];
									alert('ok')
									$scope.upload = $upload
										.upload(
												{   
													url : 'rest/protected/rent/create',
													data : {
														idTipoAlquiler : $scope.requestObject.idTipoAlquiler,
														name : $scope.name,
														description : $scope.description,
													},
													file : file,
												})
										.progress(
												function(evt) {
													console
															.log('percent: '
																	+ parseInt(100.0
																			* evt.loaded
																			/ evt.total));
												})
										.success(
												function(data, status,
														headers, config) {
													alert('Bien');
													$scope.getAllRent();
												});
								}
							};
							
							$scope.updateRent = function(event) {
								
								$scope.onError = false;
								var dataRentUpdate = {
								
									name : $scope.name,
									idAlquiler:$scope.rentToEdit.idAlquiler,
									description : $scope.description,
									tipoAlquiler : $scope.requestObject
								};

								$http.put('rest/protected/rent/updateRent',dataRentUpdate).success(function(response) {
									console.log("response",response)
									$scope.rentToEdit.name = $scope.name;
									$scope.rentToEdit.description = $scope.description;
									$('#createButton').removeClass('hidden');
									$('#updateButton').addClass('hidden');
								
							
								});
							};
							
							$scope.deleteRent = function(alquiler) {

								var dataDelete = {
									idAlquiler : alquiler.idAlquiler
								};
								
								$http({method: 'DELETE',url:'rest/protected/rent/deleteRents', data:dataDelete, headers: {'Content-Type': 'application/json'}}).success(function(response) {
									$scope.alquileres.splice($scope.alquileres.indexOf(alquiler), 1);
								});
							};

						} ]);