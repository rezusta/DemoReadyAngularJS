(function() {
    var app = angular.module("demoAngularJS");
  
    var MainControlador = function($scope, $mdSidenav) {
       
        // Código necesario Menú lateral:

        $scope.toggleRight = buildToggler('right');
        $scope.isOpenRight = function(){
        return $mdSidenav('right').isOpen();
        };

        function debounce(func, wait, context) {
            var timer;
            return function debounced() {
                var context = $scope,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function() {
                timer = undefined;
                func.apply(context, args);
                }, wait || 10);
            };
        }

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