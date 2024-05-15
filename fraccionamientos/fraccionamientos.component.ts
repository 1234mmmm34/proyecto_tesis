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
  user: any;
  password: any;
  ip: any; 
  port: any;
}){
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
/*
fetchData(id_administrador: any) {
  this.dataService.fetchData(id_administrador).subscribe((fraccionamientos: fraccionamientos[]) => {
    console.log(fraccionamientos);
    this.fraccionamientos = fraccionamientos;
  });
}

/*
Consultar_fraccionamiento(id_administrador:number):Observable<controladores[]>{
  let direccion = "https://localhost:44397/Fraccionamientos/Consultar_Fraccionamiento?id_fraccionamiento="+ id_administrador;
  return this.http.get<controladores[]>(direccion);
}
*/
Agregar_fraccionamiento(controladores: {
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
    "https://localhost:44397/Hikvision/Agregar_Hikvision?id_controlador=1&id_fraccionamiento="+controladores.id_fraccionamiento
    +"&user="+controladores.user+
    "&password="+controladores.password+
    "&port="+controladores.port+
    "&ip="+controladores.ip, {headers: headers})
    .subscribe((res) => {
      console.log(res);
      this.ngOnInit();
    });

    this.controladores.push(this.UserGroup.value);
    this.UserGroup.reset();

}
/*
  Actualizar_fraccionamiento(products: {nombre: string, direccion: string, coordenadas: string, id_administrador: number, id_tesorero: number, dia_pago: number}){
   
    const params = {
      nombre: products.nombre,
      direccion: products.direccion,
      coordenadas: products.coordenadas, 
      id_tesorero: 0,
      id_fraccionamiento: this.id_fracc,
      id_administrador: this.dataService.obtener_usuario(1),
      dia_pago: products.dia_pago

      };

    const httpOptions = {
      headers: new HttpHeaders({
       'Content-Type':  'application/json'
      })
    }; 

    console.log("actualizar: ",params)

    return this.http.put("https://localhost:44397/Fraccionamientos/Actualizar_Fraccionamiento", params).subscribe(
      (_response) => {
        this.ngOnInit();
        this.UserGroup.reset();

      }
    )

  }

*/
/*
  delete(fraccionamiento: any){
    return this.http.delete("https://localhost:44397/Fraccionamientos/Eliminar_Fraccionamiento?id_fraccionamiento="+this.id_fracc).subscribe(
      () => {
        this.fetchData(this.dataService.obtener_usuario(1))
        console.log("hola");

   
      })


}
 */
}
