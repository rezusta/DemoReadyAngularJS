(function() {
    var app = angular.module("demoAngularJS");
  
    var alumnosCreacion = {
        templateUrl: 'lib/alumnos/crearAlumno.html',
        bindings: {},
        controller: class AlumnosCreacionCtrl {
            Titulo = "Gestión de alumnos";

            servicioAlumnos: any;
            $location: any;
            $mdToast: any;

            NIA: any;
            nombre: any;
            apellido: any;

            constructor(servicioAlumnos, $location, $mdToast) {
                this.servicioAlumnos = servicioAlumnos;
                this.$location = $location;
                this.$mdToast = $mdToast;
            }

            onAlumnoCreado = (data) => {
                this.mostrarMensaje("El usuario se ha creado correctamente");
                this.$location.path("/alumnos");
            }
            onErrorCreacion = (reason) => {
                this.mostrarMensaje("No se ha podido crear el alumno");
            }
            crearAlumno = (NIA, nombre, apellido) => {
                this.servicioAlumnos.createAlumno(NIA, nombre, apellido).then(this.onAlumnoCreado, this.onErrorCreacion);
            }
            cancelar = () => {
                this.$location.path("/alumnos");
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
  
    app.component("alumnosCreacion", alumnosCreacion);
  }());
  