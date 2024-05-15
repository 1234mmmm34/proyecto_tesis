import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import {  deudores, deudor } from "../modelos/deudas"
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { DatePipe } from '@angular/common'
import { PersonasService } from '../ingresos-extraordinarios/personas.service';
import { Deudores } from '../ingresos-extraordinarios/deudores.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deudores',
  templateUrl: './deudores.component.html',
  styleUrls: ['./deudores.component.css']
})
export class DeudoresComponent {
  httpclient: any;
  deudores: deudores[] = [];
  deudor =new deudor();
  filtroDeudores:'' | undefined;

  Deudores_totales:Deudores[]=[];


  ngOnInit(){
    //this.fetchDataDeudores();
    this.ConsultarDeudores();
  }

  constructor(private http: HttpClient, private dataService: DataService, private fb: FormBuilder,private personasService:PersonasService){}

  ConsultarDeudores(){
    this.personasService.consultarDeudoresOrdinarios(this.dataService.obtener_usuario(3)).subscribe(
      (deudasUsuario: Deudores[]) => {
       this.Deudores_totales = deudasUsuario
        console.log('deudas de todos los  usuarios', this.Deudores_totales);
        if(this.Deudores_totales.length!=0){

        }else{
          Swal.fire({
            title: 'El usuario seleccionado no tiene deudas extraordinarias vencidas',
            text: '',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
          }); 
        } 
       
      },
      (error) => {
        // Manejo de errores
        console.error('Error:', error);
      }
    );
  }

  restringir_acceso(id_deuda: any) {
    this.dataService.restringir_acceso(id_deuda).subscribe((deudores: deudores[]) => {
      console.log(deudores);
      this.deudores = deudores;
    }); 
  }

  calcularDiasRetraso(proximoPago: string): number {
    const fechaProximoPago = new Date(proximoPago);
    const hoy = new Date();
    const diferenciaTiempo = hoy.getTime() - fechaProximoPago.getTime();
    const diasRetraso = Math.floor(diferenciaTiempo / (1000 * 3600 * 24)); // Calcula los días de diferencia

    return Math.max(0, diasRetraso); // Devuelve al menos cero si la fecha ya ha pasado
  }

  delete(id_deuda:any){
    
  }

  
}
