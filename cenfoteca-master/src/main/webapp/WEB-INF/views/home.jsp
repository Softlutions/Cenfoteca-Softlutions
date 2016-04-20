<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<!DOCTYPE html>
<!--[if lt IE 7]>      <html lang="en" ng-app="myApp" class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html lang="en" ng-app="myApp" class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html lang="en" ng-app="myApp" class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html lang="en" ng-app="myApp" class="no-js"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Proyecto 3 | To Do List</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="resources/bower_components/html5-boilerplate/dist/css/normalize.css">
  <link rel="stylesheet" href="resources/bower_components/html5-boilerplate/dist/css/main.css">
  <link rel="stylesheet" href="resources/bower_components/bootstrap/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="resources/bower_components/angular-ui-grid/ui-grid.min.css">
  <link rel="stylesheet" href="resources/app.css">
  <script src="resources/bower_components/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js"></script>
  <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="resources/bower_components/toastr/toastr.min.css">
</head>
<body>
  <!--[if lt IE 7]>
      <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
  <![endif]-->
	<!--nav sidebar -->
	
	<aside>
	  <nav class="navbar navbar-inverse sidebar" role="navigation">
	      
	
	<div class="nav-side-menu">
	    <div class="brand">Softlutions To Do List</div>
	    <i class="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
	  
	        <div class="menu-list">
	  
	            <ul id="menu-content" class="menu-content collapse out">
	                <li>
	                  <a href="app#/view1">
	                  	<i class="glyphicon glyphicon-user fa-lg"></i> User list <span class="arrow"></span>
	                  </a>
	                </li>
		
	                 <li>
	                  <a href="app#/view2">
	                  	<i class="glyphicon glyphicon-cog fa-lg"></i> Rentals maintenance <span class="arrow"></span>
	                  </a>
	                  </li>
	
	                 <li>
	                  <a href="app#/view3">
	                  	<i class="glyphicon glyphicon-cog fa-lg "></i> Users type maintenance <span class="arrow"></span>
	                  </a> 
	                </li>
	                
	               	<li>
	                  <a href="app#/view4">
	                  	<i class="glyphicon glyphicon-list-alt fa-lg"></i> Rental list <span class="arrow"></span>
	                  </a>
	                </li>
	            </ul>
	     </div>
	</div>
	  </nav>
	  
	</aside>

  <div ng-view></div>
  
  <div class="container"><div>version <strong><span app-version></span></strong></div></div>
  
  <!-- In production use:
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/x.x.x/angular.min.js"></script>
  -->
  
  <script src="resources/bower_components/jquery/dist/jquery.min.js"></script>
  <script src="resources/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
  <script src="resources/bower_components/angular/angular.js"></script>
  <script src="resources/bower_components/toastr/toastr.min.js"></script>
  <script src="resources/bower_components/angular-route/angular-route.js"></script>
  <script src="resources/bower_components/angular-ui-grid/ui-grid.min.js"></script>
  <script src="resources/non_bower_components/angular-file-upload-shim.min.js"></script>
  <script src="resources/non_bower_components/angular-file-upload.min.js"></script>
  <script src="resources/app.js"></script>
  <script src="resources/nav.js"></script>
  <script src="resources/view1/view1.js"></script>
  <script src="resources/view2/view2.js"></script>
  <script src="resources/view3/view3.js"></script>
  <script src="resources/view4/view4.js"></script>
  <script src="resources/components/version/version.js"></script>
  <script src="resources/components/version/version-directive.js"></script>
  <script src="resources/components/version/interpolate-filter.js"></script>
</body>
</html>
