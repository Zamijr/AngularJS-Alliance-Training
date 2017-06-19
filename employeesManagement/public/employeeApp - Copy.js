
var app = angular.module('employeeApp', ['ngRoute']);

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
    });

});

app.service('BaseService', function ($http)
 {  
	var emps;  
	return {    
		getEmps: function () {      
				 if (emps === undefined){ 
				   this.find()
				 };       
		   return emps;     
	    },   
		find: function ()  {     
    			return $http.get('dummy_data.json').then(function (data) {
						emps = data.employees;       
						return emps;      
						
			          });   
		}  
	};
}); 

/*
app.factory('DataService', function($http) {
   return {
     getData: function() {
       //since $http.get returns a promise,
       //and promise.then() also returns a promise
       //that resolves to whatever value is returned in it's 
       //callback argument, we can return that.
       return $http.get('dummy_data.json').then(function(result) {
           return result.data;
       });
     }
   }
});

app.factory('ModelService', function($scope,$location, DataService) {
    var factory = {};
	var emps = [];
	DataService.getData().then(function(data) {
       //this will execute when the 
       //AJAX call completes.
       emps = data.employees;
       console.log(data);
   });
   
   factory.getEmp = function(){
     return emps;
   }
   return factory;
});
*/

app.controller('customersController', function ($scope, $routeParams, BaseService) 
{  
    $scope.$watch(function () {    
	              return BaseService.getEmps();  
			     }, 
                 function (emps) {   
   				  $scope.employees = emps;  
				 });
});

/*
app.controller('newController', function($scope,$location) {
    $scope.employees = DataService.employees;
	
	$scope.addUser = function()
	{
     	 $scope.newEmp = {
	     "name": $scope.newName,
		 "class": $scope.newSkill
	  };
	  $scope.employees.push($scope.newEmp);
	  $location.path("/");
	}
	
});
*/

/*
function customersController($scope,$http) {
    $http.get('dummy_data.json')
    .success(function(response) {$scope.employees = response.employees;});
}
*/
