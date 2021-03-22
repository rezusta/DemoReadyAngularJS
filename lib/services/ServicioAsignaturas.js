(function(){

    var app = angular.module("demoAngularJS");

    var servicioAsignaturas = function($http) {

        var ApiURL = "https://demo-backend-tfm.herokuapp.com/api";

        var getAsignatura = function(ID) {
            return $http.get(ApiURL + "/asignatura/" + ID)
                .then(function(response){
                    return response.data;
                });
        };

        var getAsignaturas = function() {
            return $http.get(ApiURL + "/asignaturas")
                .then(function(response){
                    return response.data;
                });
        };

        var createAsignatura = function(nombre, aula, dia, hora, ano) {
            var data = {nombre : nombre, aula : aula, dia : dia, hora : hora, ano : ano};
            return $http({
                url: ApiURL + "/asignatura",
                method: "POST",
                data: JSON.stringify(data)
              }).then(function(response){
                return response.data;
            });
        };

        var deleteAsignatura = function(ID) {
            return $http.delete(ApiURL + "/asignatura/" + ID)
                .then(function(response){
                    return response.data;
                });
        };

        var putAsignatura = function(ID, nombre, aula, dia, hora, ano) {
            var data = {ID: ID, nombre : nombre, aula : aula, dia : dia, hora : hora, ano : ano};
            return $http({
                url: ApiURL + "/asignatura",
                method: "PUT",
                data: JSON.stringify(data)
              }).then(function(response){
                return response.data;
            });
        };

        return {
            getAsignatura: getAsignatura,
            getAsignaturas: getAsignaturas,
            createAsignatura: createAsignatura,
            deleteAsignatura: deleteAsignatura,
            putAsignatura: putAsignatura
        };
    };

    app.factory("servicioAsignaturas", servicioAsignaturas);

})();