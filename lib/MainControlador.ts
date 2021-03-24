(function() {
    var app = angular.module("demoAngularJS");
  
    var MainControlador = function($scope, $mdSidenav) {
       
        // Código necesario Menú lateral:

        $scope.toggleRight = buildToggler('right');
        $scope.isOpenRight = function(){
        return $mdSidenav('right').isOpen();
        };

        function buildToggler(navID) {
        return function() {
            $mdSidenav(navID)
            .toggle()
            .then(function () {
            });
        };
        }

    };
  
    app.controller("MainControlador", MainControlador);
  }());  