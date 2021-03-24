(function(){
    var app = angular.module("demoAngularJS", ["ngMaterial", "ngRoute"]);

    app.config(function($routeProvider){
        $routeProvider
            .when("/", {
                template: "<alumnos-listado></alumnos-listado>",
                controllerAs: '$ctrl'
            })
            .when("/alumnos", {
                template: "<alumnos-listado></alumnos-listado>",
                controllerAs: '$ctrl'
            })
            .when("/alumnos/nuevo", {
                template: "<alumnos-creacion></alumnos-creacion>",
                controllerAs: '$ctrl'
            })
            .when("/alumnos/:NIA", {
                template: "<alumnos-detalle></alumnos-detalle>",
                controllerAs: '$ctrl'
            })
            .when("/asignaturas", {
                template: "<asignaturas-listado></asignaturas-listado>",
                controllerAs: '$ctrl'
            })
            .when("/asignaturas/nueva", {
                template: "<asignaturas-creacion></asignaturas-creacion>",
                controllerAs: '$ctrl'
            })
            .when("/asignaturas/:ID", {
                template: "<asignaturas-detalle></asignaturas-detalle>",
                controllerAs: '$ctrl'
            })
            .otherwise({redirectTo: "/"});
    });

    angular.element(document).ready(function() {
        angular.bootstrap(document.body, ['demoAngularJS']);
    })
}());

