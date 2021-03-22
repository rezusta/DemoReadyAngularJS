(function(){

    var app = angular.module("demoAngularJS");

    var servicioAlumnos = function($http) {

        var ApiURL = "https://demo-backend-tfm.herokuapp.com/api";

        var getAlumno = function(NIA) {
            return $http.get(ApiURL + "/alumno/" + NIA)
                .then(function(response){
                    return response.data;
                });
        };

        var getAlumnos = function() {
            return $http.get(ApiURL + "/alumnos")
                .then(function(response){
                    return response.data;
                });
        };

        var getAsignaturasAlumno = function(NIA) {
            return $http.get(ApiURL + "/alumno/" + NIA + "/asignaturas")
                .then(function(response){
                    return response.data;
                });
        };
        
        var getAsignaturasAlumnoDia = function(NIA, dia) {
            return $http.get(ApiURL + "/alumno/" + NIA + "/asignaturas/" + dia)
                .then(function(response){
                    return response.data;
                });
        };

        var createAlumno = function(NIA, nombre, apellido) {
            var data = {NIA : NIA, nombre : nombre, apellido : apellido};
            return $http({
                url: ApiURL + "/alumno",
                method: "POST",
                data: JSON.stringify(data)
              }).then(function(response){
                return response.data;
            });
        };
        
        var addAlumnoAsignatura = function(NIA, ID) {
            var data = {NIA : NIA, ID : ID};
            return $http({
                url: ApiURL + "/alumnoAsignatura",
                method: "POST",
                data: JSON.stringify(data)
              }).then(function(response){
                return response.data;
            });
        };

        var deleteAlumno = function(NIA) {
            return $http.delete(ApiURL + "/alumno/" + NIA)
                .then(function(response){
                    return response.data;
                });
        };

        var delAlumnoAsignatura = function(NIA, ID) {
            return $http.delete(ApiURL + "/asignatura/" + ID + "/alumno/" + NIA)
                .then(function(response){
                    return response.data;
                });
        };

        var putAlumno = function(NIA, nombre, apellido) {
            var data = {NIA : NIA, nombre : nombre, apellido : apellido};
            return $http({
                url: ApiURL + "/alumno",
                method: "PUT",
                data: JSON.stringify(data)
              }).then(function(response){
                return response.data;
            });
        };

        return {
            getAlumno: getAlumno,
            getAlumnos: getAlumnos,
            createAlumno: createAlumno,
            deleteAlumno: deleteAlumno,
            putAlumno: putAlumno,
            getAsignaturasAlumno: getAsignaturasAlumno,
            getAsignaturasAlumnoDia: getAsignaturasAlumnoDia,
            addAlumnoAsignatura: addAlumnoAsignatura,
            delAlumnoAsignatura: delAlumnoAsignatura
        };
    };

    app.factory("servicioAlumnos", servicioAlumnos);

})();