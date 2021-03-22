(function(){
    var app = angular.module("demoAngularJS", ["ngMaterial", "ngRoute"]);

    app.config(function($routeProvider){
        $routeProvider
            .when("/", {
                templateUrl: "lib/alumnos/listadoAlumnos.html",
                controller: "ControladorAlumnos"
            })
            .when("/alumnos", {
                templateUrl: "lib/alumnos/listadoAlumnos.html",
                controller: "ControladorAlumnos"
            })
            .when("/alumnos/nuevo", {
                templateUrl: "lib/alumnos/crearAlumno.html",
                controller: "ControladorAlumnos"
            })
            .when("/alumnos/:NIA", {
                templateUrl: "lib/alumnos/detalleAlumno.html",
                controller: "ControladorAlumnos"
            })
            .when("/asignaturas", {
                templateUrl: "lib/asignaturas/listadoAsignaturas.html",
                controller: "ControladorAsignaturas"
            })
            .when("/asignaturas/nueva", {
                templateUrl: "lib/asignaturas/crearAsignatura.html",
                controller: "ControladorAsignaturas"
            })
            .when("/asignaturas/:ID", {
                templateUrl: "lib/asignaturas/detalleAsignatura.html",
                controller: "ControladorAsignaturas"
            })
            .otherwise({redirectTo: "/"});
    });

}());