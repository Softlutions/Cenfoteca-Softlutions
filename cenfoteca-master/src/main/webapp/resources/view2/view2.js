'use strict';

angular.module('myApp.view2', [ 'ngRoute' ])
.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/view2', {
		templateUrl : 'resources/view2/view2.html',
		controller : 'View2Ctrl'
	});
}])
.controller('View2Ctrl', ['$scope', '$http', '$location', '$upload', function($scope, $http, $location, $upload) {
		$scope.loggedUser = JSON.parse(localStorage.loggedUser);
		$scope.DEFAULT_IMAGE = "resources/appImages/imagen-no-disponible.gif";
		$scope.rent = {};
		$scope.files = {};
		$scope.idRent = 0;
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
			$http.get('rest/protected/tipoAlquiler/getAll').success(function(response) {
				$scope.tipoAlquilerList = response.tipoAlquilerList;
				$scope.requestObject.idTipoAlquiler = $scope.tipoAlquilerList[0].idTipoAlquiler;
			});
		};
		
		$scope.loadData = function(palquiler){
			$scope.rentToEdit = palquiler;
			$scope.requestObject.idTipoAlquiler = palquiler.tipoAlquiler.idTipoAlquiler;
			$scope.name = palquiler.name;
			$scope.description = palquiler.description;
			$scope.file = palquiler.image;
			$scope.rentFile = palquiler.image;
			$scope.idRent = palquiler.idAlquiler;
			
			$('#createButton').addClass('hidden');
			$('#updateButton').removeClass('hidden');
			
		}
		$scope.init();

		$scope.onFileSelect = function($files) {
			$scope.file = $files[0];
			
			if($scope.file != null){
				var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png|.gif)$");
				
				if(regex.test($scope.file.name.toLowerCase())){
					var reader = new FileReader();
					reader.onload = function(e){
						$scope.rentFile = e.target.result;
						$scope.$apply();
					}
					reader.readAsDataURL($scope.file);
				}else{
					$scope.file = null;
					$scope.rentFile = null;
				}
			}
		};
		
		$scope.saveRent = function(event) {
			if($scope.requestObject != null){
				if($scope.file != null){
					$upload.upload({
						url:'rest/protected/rent/create',
						data : {
							idTipoAlquiler : $scope.requestObject.idTipoAlquiler,
							name : $scope.name,
							description : $scope.description,
							idRent : $scope.idRent
						},
						file : $scope.file
					})
				.progress(
					function(evt) {
						
					})
				.success(
					function(data, status, headers, config) {
						$scope.getAllRent();
						$scope.name = "";
						$scope.idRent = 0;
						$scope.rentToEdit = null;
						$scope.description = "";
						$scope.requestObject = {};
						$scope.rentFile = null;
					});
				}else{
					$scope.updateRent(event);
				}
			}
		};
		
		$scope.updateRent = function(event) {
			$scope.onError = false;
			var dataRentUpdate = {
				name : $scope.name,
				idAlquiler:$scope.rentToEdit.idAlquiler,
				description : $scope.description,
				tipoAlquiler : $scope.requestObject,
				image : $scope.file
			};
			
			$http.put('rest/protected/rent/updateRent',dataRentUpdate).success(function(response) {
				$scope.rentToEdit.name = $scope.name;
				$scope.rentToEdit.description = $scope.description;
				$scope.rentToEdit.image = $scope.file;
				$('#createButton').removeClass('hidden');
				$('#updateButton').addClass('hidden');
				
				$scope.name = "";
				$scope.rentToEdit = null;
				$scope.description = "";
				$scope.requestObject = {};
				$scope.file = null;
				$scope.rentFile = null;
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
	}]);