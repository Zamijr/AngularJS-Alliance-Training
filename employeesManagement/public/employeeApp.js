
var app = angular.module('employeeApp', ['ngRoute','tc.chartjs']);

app.config(function ($routeProvider) {
    $routeProvider
	.when('/', {
	    controller: 'customersController',
        templateUrl: '/partials/main.html'
    })
	.when('/edit', {
	    controller: 'newController',
        templateUrl: '/partials/edit.html'
    })
	.when('/back', {
	    controller: 'customersController',
        templateUrl: '/partials/main.html'
    })
	.when('/confirm', {
	    controller: 'confirmController',
        templateUrl: '/partials/confirm.html'
    });;

});

app.factory('Data', function() {
    return { "employees":[
	{
	  "name":"Raj",
	   "age": 31,
	   "class":"JQuery, AngularJS",
	   "address":"1234 Stevens street, San Jose, CA"
	}
	,
	{
	  "name":"Mr Kumar",
	   "age": 23,
	   "class":"JAVA, SQL",
	   "address":"21212 london street, San Jose, CA"
	}
	,
	{
	  "name":"Mike Smith",
	   "age": 28,
	   "class":"C++, AngularJS, HTML5, CSS3",
	   "address":"22 will wood street, Santa Clara, CA"
	}
		]
   }
});

app.factory('ShareDataService', function() {
    return {};
});
app.controller('customersController', function($scope, Data) {   
		$scope.employees = Data.employees;
			
});

app.controller('newController', function($scope,$location, Data,ShareDataService) {
    $scope.employees = Data.employees;
	if(ShareDataService.info){
		$scope.newName = ShareDataService.info.name;
		$scope.newSkill = ShareDataService.info.skill;
	}
	$scope.addUser = function(){
     	 $scope.newEmp = {
			"name": $scope.newName,
			"class": $scope.newSkill
	      };
	  ShareDataService.info= null;  
	  $scope.employees.push($scope.newEmp);
	   $location.path("/");
	}
	$scope.confirm = function(){
	   ShareDataService.info = {
		   "name": $scope.newName,
		   "skill": $scope.newSkill
	   }
	   $location.path("/confirm");
	}
});
app.controller('confirmController', function($scope,$location,ShareDataService) {
	$scope.name = ShareDataService.info.name;
	$scope.skill = ShareDataService.info.skill;
	$scope.cancel = function(){
		$location.path("/edit");
	}
});
/*
function customersController($scope,$http) {
    $http.get('dummy_data.json')
    .success(function(response) {$scope.employees = response.employees;});
}
*/
