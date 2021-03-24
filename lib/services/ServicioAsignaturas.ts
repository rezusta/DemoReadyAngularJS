(function(){

    var app = angular.module("demoAngularJS");

    var servicioAsignaturas = class servicioAsignaturas {
        
        ApiURL = "https://demo-backend-tfm.herokuapp.com/api";

        $http: any;

        constructor($http) {
            this.$http = $http
        }

        getAsignatura = (ID) => {
            return this.$http.get(this.ApiURL + "/asignatura/" + ID)
                .then(function(response){
                    return response.data;
                });
        };
        
        getAsignaturas = () => {
            return this.$http.get(this.ApiURL + "/asignaturas")
                .then(function(response){
                    return response.data;
                });
        };

        createAsignatura = (nombre, aula, dia, hora, ano) => {
            var data = {nombre : nombre, aula : aula, dia : dia, hora : hora, ano : ano};
            return this.$http({
                url: this.ApiURL + "/asignatura",
                method: "POST",
                data: JSON.stringify(data)
              }).then(function(response){
                return response.data;
            });
        };

        deleteAsignatura = (ID) => {
            return this.$http.delete(this.ApiURL + "/asignatura/" + ID)
                .then(function(response){
                    return response.data;
                });
        };

        putAsignatura = (ID, nombre, aula, dia, hora, ano) => {
            var data = {ID: ID, nombre : nombre, aula : aula, dia : dia, hora : hora, ano : ano};
            return this.$http({
                url: this.ApiURL + "/asignatura",
                method: "PUT",
                data: JSON.stringify(data)
              }).then(function(response){
                return response.data;
            });
        };
    };

    app.service("servicioAsignaturas", servicioAsignaturas);

})();