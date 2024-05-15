import { Component } from '@angular/core';
import { Personas } from './personas.model';
//import { PersonasService } from './personas.service';
import { NotificacionesService } from './notificaciones.service';
import { Notificaciones } from './notificaciones.model';
import { usuario, usuarios } from "../modelos/usuarios";
import { NumberFormatStyle } from '@angular/common';
import { DataService } from '../data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultar-notificaciones',
  templateUrl: './consultar-notificaciones.component.html',
  styleUrls: ['./consultar-notificaciones.component.css']
})
export class ConsultarNotificacionesComponent {
  constructor(private NotificacionesService: NotificacionesService,
    private notificacionesService: NotificacionesService, private dataService: DataService) { }
  personas: Personas[] = [];

  id_fraccionamineto: number = 15;
  respuestaNotificacion: string | null = null;
  idNotificacion: number | undefined;
  notificaciones: Notificaciones[] = [];
  tipoSeleccionado: string = 'General';
  idFraccionamiento: number = 15;
  idUsuario: number = 0;
  filtroNotificaciones: "" | undefined;
  usuarios: usuarios[] = [];
  indice: number = 0;
  verdaderoRango: number = 6;
  cont: number = 1;
  registrosTotales: number = 0;
  notificaciones1: Notificaciones[] = [];
  id_destinatario: number = 2;



  ngOnInit(): void {

    this.consultarNotificacion(this.dataService.obtener_usuario(1), this.indice, this.verdaderoRango, this.id_destinatario);

    //this.consultarNotificacion(this.dataService.obtener_usuario(1), 0, 6, this.id_destinatario);
  // this.registrosTotales = this.dataService.numeroRegistrosTabla(this.dataService.obtener_usuario(1), "notificaciones")

   

  
  }



  paginador_atras() {

    if (this.indice - this.verdaderoRango >= 0) {
      this.notificaciones1 = this.notificaciones.slice(this.indice - this.verdaderoRango, this.indice);
      this.indice = this.indice - this.verdaderoRango;
      this.cont--;
    }
  }

  paginador_adelante() {
    if (this.notificaciones.length - (this.indice + this.verdaderoRango) > 0) {
      this.indice = this.indice + this.verdaderoRango;
      this.notificaciones1 = this.notificaciones.slice(this.indice, this.indice + this.verdaderoRango);
      this.cont++;
     // this.consultarNotificacion
    } 
    
  }

  onChange(event: any){ 

      const selectedValue = event.target.value;
    
      this.id_destinatario=selectedValue;
     // console.log(this.id_destinatario);

     this.consultarNotificacion(this.dataService.obtener_usuario(1), 0, 100, this.id_destinatario);
  }
  

  consultarNotificacion(idFraccionamiento: any, indice: number, verdaderoRango: number, id_destinatario: number) {
    this.NotificacionesService.consultarNotificacion(idFraccionamiento, 0, 100, id_destinatario).subscribe((notificaciones: Notificaciones[]) => {
      //  console.log("notificaciones: ", valor);
        this.notificaciones = notificaciones;
        this.indice = 0;
        this.verdaderoRango = 6;
        this.notificaciones1 = this.notificaciones.slice(this.indice, this.indice + this.verdaderoRango);

      });
  }




  agregarNotificacion(formulario: any): void {
    //const idFraccionamiento = parseInt(formulario.fraccionamiento);
    const idFraccionamiento = this.id_fraccionamineto;
    //console.log(idFraccionamiento);
    const tipo = formulario.tipo;
    console.log("tipo"+  tipo);
    let destinatarioId=0;
    if(tipo=='general'){
    destinatarioId=0;
    }else if(tipo=='individual'){
      destinatarioId = parseInt(formulario.destinatario.split(' - ')[0]);
    }else{
      return;
    }
    //console.log(destinatarioId);
    const asunto = formulario.asunto;
    //console.log(asunto); 
    const mensaje = formulario.mensaje;
    //console.log(mensaje);
 
    this.NotificacionesService.agregarNotificacion(idFraccionamiento, tipo, destinatarioId, asunto, mensaje)
      .subscribe(
        (respuesta: string) => {
          this.respuestaNotificacion =respuesta;
          console.log('Respuesta:', respuesta);
          Swal.fire({
            title: 'Notificacion agregada correctamente',
            text: '',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.ngOnInit();
        },
        (error) => {
          console.error('Error al agregar notificación Angular:', error);
          Swal.fire({
            title: 'Error al agregar notificación',
            text: '',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        
        }
      );
   }







/*

  actualizarNotificaciones(): void {
    this.notificaciones = []; // Vaciar el arreglo antes de cargar nuevas notificaciones

    if (this.tipoSeleccionado === 'General') {
      this.idUsuario = 0;
    } else {
      // Asignar el ID de usuario correspondiente a la sesión (puedes ajustarlo según tu lógica de inicio de sesión)
      // this.idUsuario = ...;
      this.idUsuario = 1;
    }
  }

  filtrarPorTipo(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.tipoSeleccionado = target.value;
    this.actualizarNotificaciones();
  }
  */

}
