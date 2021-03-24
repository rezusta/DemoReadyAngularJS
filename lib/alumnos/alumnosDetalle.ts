(function() {
    var app = angular.module("demoAngularJS");
  
    var alumnosDetalle = {
        templateUrl: 'lib/alumnos/detalleAlumno.html',
        bindings: {},
        controller: class AlumnosDetalleCtrl {

            servicioAlumnos: any;
            servicioAsignaturas: any;
            $location: any;
            $routeParams: any;
            $mdToast: any;

            Titulo = "Gestión de alumnos";

            alumnos: any;
            asignaturasDia: any;
            asignaturasSemana: any;
            asignaturas: any;

            NIA: any;
            nombre: any;
            apellido: any;

            constructor(servicioAlumnos, servicioAsignaturas, $location, $routeParams, $mdToast) {
                
                this.servicioAlumnos = servicioAlumnos;
                this.servicioAsignaturas = servicioAsignaturas;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.$mdToast = $mdToast;

                if (this.$routeParams.NIA) {
                    this.servicioAlumnos.getAlumno(this.$routeParams.NIA).then(this.onAlumnoDetalle, this.onError);
                    var d = new Date();
                    var dia = d.getDay() == 0 ? 7 : d.getDay();
                    servicioAlumnos.getAsignaturasAlumnoDia(this.$routeParams.NIA, dia).then(this.onAsignaturasDia, this.onError);
                    servicioAlumnos.getAsignaturasAlumno($routeParams.NIA).then(this.onAsignaturasSemana, this.onError);
                    servicioAsignaturas.getAsignaturas().then(this.onAsignaturas, this.onError);
                }
            }
            
            onAsignaturasDia = (data) => {
                this.asignaturasDia = data;
            }
            onAsignaturasSemana = (data) =>{
                this.asignaturasSemana = data;
            }
            onAsignaturas = (data) =>{
                this.asignaturas = data;
            }
            onAlumnoActualizado = (data) =>{
                this.mostrarMensaje("El usuario se ha actualizado correctamente");
                this.$location.path("/alumnos");
            }
            onAlumnoAsignaturaAdded = (data) =>{
                this.mostrarMensaje("La asignatura se ha añadido correctamente");
                var d = new Date();
                var dia = d.getDay() == 0 ? 7 : d.getDay();
                this.servicioAlumnos.getAsignaturasAlumnoDia(this.$routeParams.NIA, dia).then(this.onAsignaturasDia, this.onError);
                this.servicioAlumnos.getAsignaturasAlumno(this.$routeParams.NIA).then(this.onAsignaturasSemana, this.onError);
            }
            onAlumnoAsignaturaDeleted = (data) =>{
                this.mostrarMensaje("La asignatura se ha eliminado correctamente");
                var d = new Date();
                var dia = d.getDay() == 0 ? 7 : d.getDay();
                this.servicioAlumnos.getAsignaturasAlumnoDia(this.$routeParams.NIA, dia).then(this.onAsignaturasDia, this.onError);
                this.servicioAlumnos.getAsignaturasAlumno(this.$routeParams.NIA).then(this.onAsignaturasSemana, this.onError);
            }
            onAlumnoDetalle = (data) =>{
                this.NIA = data[0].NIA;
                this.nombre = data[0].nombre;
                this.apellido = data[0].apellido;
            }
            onError = (data) =>{
                this.mostrarMensaje("No se ha podido recuperar el listado de alumnos");
            }
            onErrorAdd = (data) =>{
                this.mostrarMensaje("No se ha podido añadir la asignatura");
            }
            onErrorDel = (data) =>{
                this.mostrarMensaje("No se ha podido eliminar la asignatura");
            }
            onErrorCreacion = (data) =>{
                this.mostrarMensaje("No se ha podido crear el alumno");
            }
            actualizarAlumno = (NIA, nombre, apellido) => {
                this.servicioAlumnos.putAlumno(NIA, nombre, apellido).then(this.onAlumnoActualizado, this.onErrorCreacion);
            }
            cancelar = () =>{
                this.$location.path("/alumnos");
            }
            addUsuarioAsignatura = (NIA, ID) => {
                this.servicioAlumnos.addAlumnoAsignatura(NIA, ID).then(this.onAlumnoAsignaturaAdded, this.onErrorAdd);
            }
            eliminarAlumnoAsignatura = (NIA, ID) => {
                this.servicioAlumnos.delAlumnoAsignatura(NIA, ID).then(this.onAlumnoAsignaturaDeleted, this.onErrorDel);
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
    app.component("alumnosDetalle", alumnosDetalle);
  }());
  