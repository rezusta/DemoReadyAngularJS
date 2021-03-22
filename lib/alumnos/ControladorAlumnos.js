(function() {
  var app = angular.module("demoAngularJS");

  var ControladorAlumnos = function($scope, servicioAlumnos, servicioAsignaturas, $location, $routeParams, $mdToast) {
      $scope.Titulo = "Gestión de alumnos";
      
      var onAlumnos = function(data){
        $scope.alumnos = data;
      }
      var onAsignaturasDia = function(data){
        $scope.asignaturasDia = data;
      }
      var onAsignaturasSemana = function(data){
        $scope.asignaturasSemana = data;
      }
      var onAsignaturas = function(data){
        $scope.asignaturas = data;
      }
      var onAlumnoCreado = function(data){
        $scope.mostrarMensaje("El usuario se ha creado correctamente");
        $location.path("/alumnos");
      }
      var onAlumnoActualizado = function(data) {
        $scope.mostrarMensaje("El usuario se ha actualizado correctamente");
        $location.path("/alumnos");
      }
      var onAlumnoEliminado = function(data){
        $scope.mostrarMensaje("El usuario se ha eliminado correctamente");
        servicioAlumnos.getAlumnos().then(onAlumnos, onError);
      }
      var onAlumnoAsignaturaAdded = function(data){
        $scope.mostrarMensaje("La asignatura se ha añadido correctamente");
        var d = new Date();
        var dia = d.getDay() == 0 ? 7 : d.getDay();
        servicioAlumnos.getAsignaturasAlumnoDia($routeParams.NIA, dia).then(onAsignaturasDia, onError);
        servicioAlumnos.getAsignaturasAlumno($routeParams.NIA).then(onAsignaturasSemana, onError);
      }

      var onAlumnoAsignaturaDeleted = function(data){
        $scope.mostrarMensaje("La asignatura se ha eliminado correctamente");
        var d = new Date();
        var dia = d.getDay() == 0 ? 7 : d.getDay();
        servicioAlumnos.getAsignaturasAlumnoDia($routeParams.NIA, dia).then(onAsignaturasDia, onError);
        servicioAlumnos.getAsignaturasAlumno($routeParams.NIA).then(onAsignaturasSemana, onError);
      }

      var onAlumnoDetalle = function(data){
        $scope.NIA = data[0].NIA;
        $scope.nombre = data[0].nombre;
        $scope.apellido = data[0].apellido;
      }
      var onError = function(reason){
        $scope.mostrarMensaje("No se ha podido recuperar el listado de alumnos");
      }
      var onErrorAdd = function(reason){
        $scope.mostrarMensaje("No se ha podido añadir la asignatura");
      } 
      var onErrorDel = function(reason){
        $scope.mostrarMensaje("No se ha podido eliminar la asignatura");
      } 
      var onErrorCreacion = function(reason){
        $scope.mostrarMensaje("No se ha podido crear el alumno");
      }
      var onErrorEliminacion = function(reason){
        $scope.mostrarMensaje("No se ha podido eliminar el alumno");
      }

      if ($routeParams.NIA) {
        servicioAlumnos.getAlumno($routeParams.NIA).then(onAlumnoDetalle, onError);
        var d = new Date();
        var dia = d.getDay() == 0 ? 7 : d.getDay();
        servicioAlumnos.getAsignaturasAlumnoDia($routeParams.NIA, dia).then(onAsignaturasDia, onError);
        servicioAlumnos.getAsignaturasAlumno($routeParams.NIA).then(onAsignaturasSemana, onError);
        servicioAsignaturas.getAsignaturas().then(onAsignaturas, onError);
      } else {
        servicioAlumnos.getAlumnos().then(onAlumnos, onError);
      }
      
      $scope.navegaPantallaCrearAlumno = function(){
        $location.path("/alumnos/nuevo");
      }
      $scope.crearAlumno = function(NIA, nombre, apellido){
        servicioAlumnos.createAlumno(NIA, nombre, apellido).then(onAlumnoCreado, onErrorCreacion);
      }
      $scope.actualizarAlumno = function(NIA, nombre, apellido){
        servicioAlumnos.putAlumno(NIA, nombre, apellido).then(onAlumnoActualizado, onErrorCreacion);
      }
      $scope.cancelar = function(){
        $location.path("/alumnos");
      }
      $scope.eliminarAlumno = function(NIA){
        servicioAlumnos.deleteAlumno(NIA).then(onAlumnoEliminado, onErrorEliminacion);
      }
      $scope.detalleAlumno = function(NIA){
        $location.path("/alumnos/" + NIA);
      }
      $scope.addUsuarioAsignatura = function(NIA, ID) {
        servicioAlumnos.addAlumnoAsignatura(NIA, ID).then(onAlumnoAsignaturaAdded, onErrorAdd);
      }
      $scope.eliminarAlumnoAsignatura = function(NIA, ID) {
        servicioAlumnos.delAlumnoAsignatura(NIA, ID).then(onAlumnoAsignaturaDeleted, onErrorDel);
      }
      
      // Código necesario para el mensaje emergente
      
      var ctrl = this;
      var last = {
        bottom: true,
        top: false,
        left: true,
        right: false
      };

      ctrl.toastPosition = angular.extend({}, last);
      ctrl.getToastPosition = function() {
        sanitizePosition();

        return Object.keys(ctrl.toastPosition)
        .filter(function(pos) {
          return ctrl.toastPosition[pos];
        }).join(' ');
      };
      function sanitizePosition() {
        var current = ctrl.toastPosition;
  
        if (current.bottom && last.top) {
          current.top = false;
        }
        if (current.top && last.bottom) {
          current.bottom = false;
        }
        if (current.right && last.left) {
          current.left = false;
        }
        if (current.left && last.right) {
          current.right = false;
        }
  
        last = angular.extend({}, current);
      }

      $scope.mostrarMensaje = function(m) {
        var pinTo = ctrl.getToastPosition();
  
        $mdToast.show(
          $mdToast.simple()
          .textContent(m)
          .position(pinTo)
          .hideDelay(3000));
      };

  };

  app.controller("ControladorAlumnos", ControladorAlumnos);
}());
