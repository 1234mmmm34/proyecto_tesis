import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import {  controladores, controlador, fraccionamientos, fraccionamiento } from "../modelos/fraccionamientos"
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from "jquery";

 
@Component({
  selector: 'app-fraccionamientos',
  templateUrl: './fraccionamientos.component.html',
  styleUrls: ['./fraccionamientos.component.css']
})

export class FraccionamientosComponent{

  showHelp: boolean = false;

  httpclient: any;
  UserGroup: FormGroup;
  controladores: controladores[] = [];
  controlador =new controlador();
  fraccionamientos: fraccionamientos[] = [];
  fraccionamiento =new fraccionamiento();


title = 'AngularHttpRequest';
row: any;
home: any;
id_fracc: any;
cont: any;


constructor(private http: HttpClient, private dataService: DataService, private fb: FormBuilder){


this.UserGroup = this.fb.group({
     modelo: ['', Validators.required],
     nombre: ['', Validators.required],
     user: ['', Validators.required],
     password: ['', Validators.required],
     port: ['', Validators.required],
     ip: ['', Validators.required]

   })
}
 


ngOnInit(): void {
  this.fetchDataHikvision(this.dataService.obtener_usuario(1));

  
  $(function myFunction() {
    console.log("si entra")
    var x = <HTMLVideoElement>document.getElementById("informacion");
    var y = <HTMLVideoElement>document.getElementById("controlador");
    if (x.style.display === "block") {
        x.style.display = "none";
        y.style.display = "block";
    } else {
        x.style.display = "block";
        y.style.display = "none";
    }
  });

 

}

//displayedcolumns: string[] = ['nombre', 'direccion', 'coordenadas', 'id_tesorero', 'dia_pago'];




onRowClicked(fraccionamiento: any){
  this.id_fracc = fraccionamiento['id_fraccionamiento'];
}

edit(controladores: {
  nombre: any
  user: any;
  password: any;
  ip: any; 
  port: any;
}){
  this.controlador.nombre= controladores.nombre;
  this.controlador.user= controladores.user;
  this.controlador.password= controladores.password;
  this.controlador.ip= controladores.ip;
  this.controlador.port= controladores.port;


}

fetchDataHikvision(id_administrador: any) {
  this.dataService.fetchDataHikvision(id_administrador).subscribe((controladores: controladores[]) => {
    console.log(controladores);
    this.controladores = controladores;
  });
}

Agregar_fraccionamiento(controladores: {
  nombre: any
  id_controlador: any;
  id_fraccionamiento: any;
  user: any;
  password: any;
  port: any; 
  ip: any;}){

  console.log(controladores);
  controladores.id_fraccionamiento=this.dataService.obtener_usuario(1);
  //console.log("id_usuario: "+this.dataService.obtener_usuario(1));
  const headers = new HttpHeaders({'myHeader': 'procademy'});
  this.http.post(
    "https://localhost:44397/Hikvision/Agregar_Hikvision?"+
    "nombre="+controladores.nombre+
    "&id_fraccionamiento="+controladores.id_fraccionamiento+
    "&user="+controladores.user+
    "&password="+controladores.password+
    "&port="+controladores.port+
    "&ip="+controladores.ip, 
    {headers: headers})
    .subscribe((res) => {
      console.log(res);
      this.ngOnInit();
    });

    this.controladores.push(this.UserGroup.value);
    this.UserGroup.reset();

}

}
