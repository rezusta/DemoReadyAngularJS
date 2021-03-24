(function() {
    var app = angular.module("demoAngularJS");
  
    var asignaturasCreacion = {
        templateUrl: 'lib/asignaturas/crearAsignatura.html',
        bindings: {},
        controller: class AsignaturasCreacionCtrl {

            Titulo = "Gestión de asignaturas";
            
            servicioAsignaturas:any;
            $location:any;
            $routeParams:any;
            $mdToast:any;

            ID:any;
            nombre:any;
            aula:any;
            dia:any;
            hora:any;
            ano:any;

            constructor(servicioAsignaturas, $location, $routeParams, $mdToast) {
                this.servicioAsignaturas = servicioAsignaturas;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.$mdToast = $mdToast;
            }
      
            onAsignaturaCreada = (data) => {
                this.$location.path("/asignaturas");
            }
            onErrorCreacion = (reason) => {
                this.mostrarMensaje("No se ha podido crear la asignatura");
            }
            crearAsignatura = (ID, nombre, aula, dia, hora, ano) => {
                this.servicioAsignaturas.createAsignatura(ID, nombre, aula, dia, hora, ano).then(this.onAsignaturaCreada, this.onErrorCreacion);
            }
            cancelar = () => {
                this.$location.path("/asignaturas");
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
  
    app.component("asignaturasCreacion", asignaturasCreacion);
  }());
  