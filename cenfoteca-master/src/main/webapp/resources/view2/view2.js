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
							$http.get('rest/protected/rent/getAll',$scope.requestObject).success(function(response) {
								console.log("response",response)
								$scope.alquileres = response.alquileres;
								console.log("$scope.usuarios",$scope.usuarios)
							});
						
							$scope.init = function() {

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

//								if (this.createRentForm.$valid) {
//									$scope.onError = false;

//									alert('as');
									// $files: an array of files selected, each
									// file has name, size, and type.
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
															// Rent is uploaded
															// successfully
															alert('Bien');
															console.log(data);
														});
										// .error(...)
										// .then(success, error, progress);
									}
//								} else {
//									$scope.onError = true;
//								}
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

								$scope.onError = false;
								var dataDelete = {
									idAlquiler : alquiler.idAlquiler
								};
//								console.log($scope.rentToEdit.idAlquiler)
								$http({method: 'DELETE',url:'rest/protected/rent/deleteRents', data:dataDelete, headers: {'Content-Type': 'application/json'}}).success(function(response) {
									$scope.alquileres.splice($scope.alquileres.indexOf(alquiler), 1);
								});
							};

						} ]);