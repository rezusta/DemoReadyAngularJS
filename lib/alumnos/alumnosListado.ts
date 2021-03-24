(function() {
    var app = angular.module("demoAngularJS");
  
    var alumnosListado = {
        templateUrl: 'lib/alumnos/listadoAlumnos.html',
        bindings: {},
        controller: class AlumnosListado {

            Titulo = "Gestión de alumnos";

            servicioAlumnos: any;
            $location: any;
            $mdToast: any;

            alumnos: any;

            constructor(servicioAlumnos, $location, $mdToast) {
                this.servicioAlumnos = servicioAlumnos;
                this.$location = $location;
                this.$mdToast = $mdToast;

                this.servicioAlumnos.getAlumnos().then(this.onAlumnos, this.onError);
            }
    
            onAlumnos = (data) => {
                this.alumnos = data;
            }
            onAlumnoEliminado = (data) => {
                this.mostrarMensaje("El usuario se ha eliminado correctamente");
                this.servicioAlumnos.getAlumnos().then(this.onAlumnos, this.onError);
            }
            onErrorEliminacion = (reason) => {
                this.mostrarMensaje("No se ha podido eliminar el alumno");
            }
            onError = (reason) => {
                this.mostrarMensaje("No se ha podido recuperar el listado de alumnos");
            }
            navegaPantallaCrearAlumno = () => {
                this.$location.path("/alumnos/nuevo");
            }
            eliminarAlumno = (NIA) => {
                this.servicioAlumnos.deleteAlumno(NIA).then(this.onAlumnoEliminado, this.onErrorEliminacion);
            }
            detalleAlumno = (NIA) => {
                this.$location.path("/alumnos/" + NIA);
            }
            
            // Código necesario para el mensaje emergente
            last = {
                bottom: true,
                top: false,
                left: true,
                right: false
            }
    
            toastPosition = angular.extend({}, this.last)

            getToastPosition = () => {
                this.sanitizePosition();
    
                return Object.keys(this.toastPosition)
                .filter(function(pos) {
                    return this.toastPosition[pos];
                }).join(' ');
            }

            sanitizePosition = () => {
                var current = this.toastPosition;
            
                if (current.bottom && this.last.top) {
                    current.top = false;
                }
                if (current.top && this.last.bottom) {
                    current.bottom = false;
                }
                if (current.right && this.last.left) {
                    current.left = false;
                }
                if (current.left && this.last.right) {
                    current.right = false;
                }
            
                this.last = angular.extend({}, current);
            }
    
            mostrarMensaje = (m) => {
                var pinTo = this.getToastPosition();
            
                this.$mdToast.show(
                    this.$mdToast.simple()
                    .textContent(m)
                    .position(pinTo)
                    .hideDelay(3000));
            }
        }
    }
  
    app.component("alumnosListado", alumnosListado);
  }());
  