'use strict';

angular.module('myApp.view3', ['ngRoute', 'ui.grid', 'ui.grid.edit', 'ui.grid.cellNav'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'resources/view3/view3.html',
    controller: 'View3Ctrl'
  });
}])
//**********************************************************
//
.controller('View3Ctrl', ['$scope','$http', '$rootScope' ,function($scope,$http,$upload) {
	
	$scope.loggedUser = JSON.parse(localStorage.loggedUser);
	
	$scope.digameSuID = function(tipoUsuario){
		
	}
	$scope.tipoUsuarios = [];
	$scope.requestObject = {"pageNumber": 0,"pageSize": 0,"direction": "","sortBy": [""],"searchColumn": "string","searchTerm": "","user": {}};
	$http.get('rest/protected/tipoUsuario/getAll').success(function(response) {
		$scope.tipoUsuarios = response.tipoUsuarioList;
	});
	
	$scope.saveTypeUser = function(event){
		$scope.onError = false;
		
		var dataCreate = {
			tipo : $scope.tipoUsuario.tipo
		};
		
		if($scope.tipoUsuario.tipo !=null && $scope.tipoUsuario.tipo != ''){
			$http.post('rest/protected/tipoUsuario/createTypeUser',dataCreate).success(function(response) {
				$scope.tipoUsuarios = $scope.tipoUsuarios.concat(dataCreate);
				$('#editCreateUserType').modal('hide');
			});
		}else{
			toastr.error("Empty records can't be saved", 'Error')
		}
		
		
	};
	
	$scope.loadData = function(ptipoUsuario){
		$scope.userToEdit = ptipoUsuario;
		$scope.tipoUsuario =  {};
		$scope.tipoUsuario.tipo = ptipoUsuario.tipo;

		$('#createButton').addClass('hidden');
		$('#updateButton').removeClass('hidden');
		
		$('#editCreateUserType').modal('show');
	}
	
	$scope.openCreateModal = function(){
		$('#createButton').removeClass('hidden');
		$('#updateButton').addClass('hidden');
		$scope.tipoUsuario =  {};
		$('#editCreateUserType').modal('show');
		
	}
	
	$scope.updateTypeUser = function(ptipoUsuario) {
		$scope.onError = false;
		
		var dataUpdate = {
			idTipoUsuario : $scope.userToEdit.idTipoUsuario,
			tipo: ptipoUsuario.tipo
		};
		
		if(ptipoUsuario.tipo != null && ptipoUsuario.tipo != ''){
			$http.put('rest/protected/tipoUsuario/updateTypeUser',dataUpdate).success(function(response) {
				$scope.userToEdit.tipo = ptipoUsuario.tipo;
				$('#createButton').removeClass('hidden');
				$('#updateButton').addClass('hidden');
				$scope.tipoUsuario.tipo = "";
			});
			$('#editCreateUserType').modal('hide');
		}else{
			toastr.error("Empty records can't be saved", 'Error')
		}
	};
	$scope.deleteTypeUser = function(tipoUsuario) {
		$scope.onError = false;
		var dataDelete = {
			idTipoUsuario : tipoUsuario.idTipoUsuario
		};
		
		$http({method: 'DELETE',url:'rest/protected/tipoUsuario/deleteTypeUser', data:dataDelete, headers: {'Content-Type': 'application/json'}}).success(function(response) {
			if(response.code == 200){
				$scope.tipoUsuarios.splice($scope.tipoUsuarios.indexOf(tipoUsuario), 1);
				toastr.success(response.codeMessage)
			}else{
				toastr.error(response.codeMessage, 'Error')
			}
		});
	};
}]);


