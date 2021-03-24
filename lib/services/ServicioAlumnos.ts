(function(){

    var app = angular.module("demoAngularJS");

    var servicioAlumnos  = class servicioAlumnos {
        
        ApiURL = "https://demo-backend-tfm.herokuapp.com/api";

        $http: any;

        constructor($http) {
            this.$http = $http
        }

        getAlumno = (NIA) => {
            return this.$http.get(this.ApiURL + "/alumno/" + NIA)
                .then(function(response){
                    return response.data;
                });
        };

        getAlumnos = () => {
            return this.$http.get(this.ApiURL + "/alumnos")
                .then(function(response){
                    return response.data;
                });
        };

        getAsignaturasAlumno = (NIA) => {
            return this.$http.get(this.ApiURL + "/alumno/" + NIA + "/asignaturas")
                .then((response) => {
                    return response.data;
                });
        };
        
        getAsignaturasAlumnoDia = (NIA, dia) => {
            return this.$http.get(this.ApiURL + "/alumno/" + NIA + "/asignaturas/" + dia)
                .then(function(response){
                    return response.data;
                });
        };

        createAlumno = (NIA, nombre, apellido) => {
            var data = {NIA : NIA, nombre : nombre, apellido : apellido};
            return this.$http({
                url: this.ApiURL + "/alumno",
                method: "POST",
                data: JSON.stringify(data)
              }).then(function(response){
                return response.data;
            });
        };
        
        addAlumnoAsignatura = (NIA, ID) => {
            var data = {NIA : NIA, ID : ID};
            return this.$http({
                url: this.ApiURL + "/alumnoAsignatura",
                method: "POST",
                data: JSON.stringify(data)
              }).then(function(response){
                return response.data;
            });
        };

        deleteAlumno = (NIA) => {
            return this.$http.delete(this.ApiURL + "/alumno/" + NIA)
                .then(function(response){
                    return response.data;
                });
        };

        delAlumnoAsignatura = (NIA, ID) => {
            return this.$http.delete(this.ApiURL + "/asignatura/" + ID + "/alumno/" + NIA)
                .then(function(response){
                    return response.data;
                });
        };

        putAlumno = (NIA, nombre, apellido) => {
            var data = {NIA : NIA, nombre : nombre, apellido : apellido};
            return this.$http({
                url: this.ApiURL + "/alumno",
                method: "PUT",
                data: JSON.stringify(data)
              }).then(function(response){
                return response.data;
            });
        };
    };

    app.service("servicioAlumnos", servicioAlumnos);

})();