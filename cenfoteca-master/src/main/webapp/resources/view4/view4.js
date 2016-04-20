'use strict';

angular
	.module('myApp.view4', [ 'ngRoute' ])
	
	.config([ '$routeProvider', function($routeProvider) {
		$routeProvider.when('/view4', {
			templateUrl : 'resources/view4/view4.html',
			controller : 'View4Ctrl'
		});
	}])
	
	.controller('View4Ctrl',['$scope','$http','$location','$upload',function($scope, $http, $location, $upload) {
		$scope.rent = {};
		$scope.files = {};
		$scope.onError = false;
		$scope.requestObject = {};
		$scope.alquileres = [];
		$scope.alquilados = [];
		
		angular.element(document).ready(function () {
			
			$http.get('rest/protected/rent/getAll').success(function(response) {
				$scope.alquileres = response.alquileres;
				$http.get('rest/protected/rent/getByUser/1').success(function(response) {
					$scope.alquilados = response.alquileres;
					$scope.alquilados.forEach(function(alquiler){
						var index = $scope.alquileres.map(function(x) {return x.idAlquiler; }).indexOf(alquiler.idAlquiler);
						if(index!=-1){
							$scope.alquileres.splice(index,1);
						}
					});
				});
			});						
		});
		
		$scope.returnRent = function(rentId) {	
			console.log(rentId);
			var dataCreate = {
				idUsuario : 1,
				idAlquiler : rentId
			};
		 	$http({method: 'DELETE',url:'rest/protected/rent/returnRent', data:dataCreate, headers: {'Content-Type': 'application/json'}}).success(function(response) {
			 	console.log(rentId);			 	 
			 	if (response.code == 200) {
			 		var index = $scope.alquilados.map(function(x) {return x.idAlquiler; }).indexOf(rentId);
			 		console.log($scope.alquilados.map(function(x) {return x.idAlquiler; }).indexOf(rentId));
			 		$scope.alquileres.push($scope.alquilados[index]);
					$scope.alquilados.splice(index,1);	
			 	}
		 	});
		 };
	
		$scope.saveRent = function(index){
			var selectedRent = $scope.alquileres[index];
			$scope.alquilados.push(selectedRent);
			$scope.alquileres.splice(index,1);	
			
			var dataCreate = {
				idUsuario : 1,
				idAlquiler : selectedRent.idAlquiler
			};
			
		//	if($scope.tipoUsuario.tipo !=null){
			$http.post('rest/protected/rent/saveRent',dataCreate).success(function(response) {
				console.log("response",response)
				
			});
		};			
}]);
	
	
