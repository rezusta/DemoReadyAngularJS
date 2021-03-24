(function() {
    var app = angular.module("demoAngularJS");
  
    var ControladorSidenav = function($scope, $location, $timeout, $mdSidenav) {
        
        $scope.alumnos = function() {
            $location.path("/alumnos");
            $mdSidenav('right').close()
        }
        $scope.asignaturas = function() {
            $location.path("/asignaturas");
            $mdSidenav('right').close()
        }
  
    };
  
    app.controller("ControladorSidenav", ControladorSidenav);
  }());
  