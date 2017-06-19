
var app = angular.module('main', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
	.when('/', {
	    controller: 'gridController',
        templateUrl: '/partials/grid.html'
    })
    .when('/chart', {
	    controller: 'chartPopulationController',
        templateUrl: '/partials/chartPopulation.html'
    });

});

app.factory('ShareDataService', function() {
    return {};
});

app.controller('gridController', function($scope,$http,ShareDataService) {
    console.log('gridController--');
    $http.get('https://restcountries.eu/rest/v1/all')
    .success(function(response) 
   {
      response.sort(function(a,b){
          return b.population - a.population;
      });
      response = response.slice(0, 19);
      ShareDataService.data = JSON.parse(JSON.stringify(response));

      $scope.countries = response.map(function(obj){
        obj.population = prettifyNumber(obj.population);
        return obj;
      });
      
   });


   function prettifyNumber(value) {
        var thousand = 1000;
        var million = 1000000;
        var billion = 1000000000;
        var trillion = 1000000000000;
        if (value < thousand) {
            return String(value);   
        }

        if (value >= thousand && value <= 1000000) {
             return  Math.round(value/thousand) + 'Mil(es)';   
        }

        if (value >= million && value <= billion) {
            return Math.round(value/million) + 'Millon(es)';   
        }

        if (value >= billion && value <= trillion) {
            return Math.round(value/billion) + 'Billon(es)';   
        }

        else {
            return Math.round(value/trillion) + 'Trillon(es)';   
        }
    }
});

app.controller('chartPopulationController', function($scope,$http,ShareDataService) {
    console.log('chartPopulationController----');
    var dataC = [];
      console.log('ShareDataService.data',ShareDataService.data);
      for(obj in ShareDataService.data){
          var namePopulate = [];
          namePopulate.push(ShareDataService.data[obj].name);
          namePopulate.push(ShareDataService.data[obj].population);
          
          dataC.push(namePopulate);
      }  
     Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Pupulate Chart'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: ''
            },
            series: [{
                name: 'Population',
                data: dataC,
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    format: '{point.y:.1f}', // one decimal
                    y: 10, // 10 pixels down from the top
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            }]
        });
});



