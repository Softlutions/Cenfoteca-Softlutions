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
							
							$scope.doClick = function (index, event){
								$scope.requestObject = {name:$scope.alquileres[index].name,description:$scope.alquileres[index].description, idAlquiler:$scope.alquileres[index].idAlquiler};
							}
							
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

							$scope.init();

							$scope.onFileSelect = function($files) {
								$scope.files = $files;
							};
							$scope.saveRent = function(event) {

								if (this.createRentForm.$valid) {
									$scope.onError = false;

									// $files: an array of files selected, each
									// file has name, size, and type.
									for (var i = 0; i < $scope.files.length; i++) {
										var file = $scope.files[i];
										$scope.upload = $upload
												.upload(
														{
															url : 'rest/protected/rent/create',
															data : {
																idTipoAlquiler : $scope.requestObject.idTipoAlquiler,
																name : $scope.requestObject.name,
																description : $scope.requestObject.description,
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
								} else {
									$scope.onError = true;
								}
							};

							$scope.updateRent = function(event) {

								$scope.onError = false;
								var data = {
									idTipoAlquiler : $scope.requestObject.idTipoAlquiler,
									name : $scope.requestObject.name,
									idAlquiler:2,
									description : $scope.requestObject.description,
								};
								
								$http.put('rest/protected/rent/modify',data).success(function(response) {
									console.log("response",response)
									alert('Bien')

								});
								
								// .error(...)
								// .then(success, error, progress);

							};

						} ]);