(function() {
    var app = angular.module("demoAngularJS");
  
    var asignaturasListado = {
        templateUrl: 'lib/asignaturas/listadoAsignaturas.html',
        bindings: {},
        controller: class AsignaturasListadoCtrl {
    
            Titulo = "Gestión de asignaturas";

            servicioAsignaturas:any;
            $location:any;
            $mdToast:any;

            asignaturas: any;

            constructor(servicioAsignaturas, $location, $mdToast) {
                
                this.servicioAsignaturas = servicioAsignaturas;
                this.$location = $location;
                this.$mdToast = $mdToast;

                servicioAsignaturas.getAsignaturas().then(this.onAsignaturas, this.onError);
            }
            
            onAsignaturas = (data) => {
                this.asignaturas = data;
            }
            onAsignaturaEliminada = (data) => {
                this.mostrarMensaje("La asignatura se ha eliminado correctamente");
                this.servicioAsignaturas.getAsignaturas().then(this.onAsignaturas, this.onError);
            }
            onError = (reason) => {
                this.mostrarMensaje("No se ha podido recuperar el listado de asignaturas");
            }
            onErrorEliminacion = (reason) => {
                this.mostrarMensaje("No se ha podido eliminar la asignatura");
            }
            navegaPantallaCrearAsignatura = () => {
                this.$location.path("/asignaturas/nueva");
            }
            eliminarAsignatura = (ID) => {
                this.servicioAsignaturas.deleteAsignatura(ID).then(this.onAsignaturaEliminada, this.onErrorEliminacion);
            }
            detalleAsignatura = (ID) => {
                this.$location.path("/asignaturas/" + ID);
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
    app.component("asignaturasListado", asignaturasListado);
  }());
  