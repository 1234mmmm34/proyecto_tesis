import { Component } from '@angular/core';
import {ChangeDetectorRef, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout'
import { DataService } from '../data.service'
import { ImagenService } from './imagen.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-panel-principal-admin',
  templateUrl: './panel-principal-admin.component.html',
  styleUrls: ['./panel-principal-admin.component.css']
})
export class PanelPrincipalAdminComponent {
  imagen: any;


  mobileQuery: MediaQueryList;

  esPanelAdmin(): boolean {
    return this.router.url === 'Home';
  }





  //fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
 
   
  fillerNav=[  
      {name:"Home", route:"Home", icon:"home"},
   // {name:"Acuerdos", route:"Acuerdos", icon:"assignment", children: [
   //   {name: "Agregar", route: "Acuerdos", icon:"assignment_ind"}, 
      {name: "Acuerdos", route: "Acuerdos", icon:"assignment"},
 //   ]},
 //   {name:"Notificaciones", route:"Notificaciones", icon:"priority_high", children: [
  //    {name: "Agregar", route: "Notificaciones", icon:"assignment_ind"},
      {name: "Notificaciones", route: "Notificaciones", icon:"priority_high"},
  //  ]},
  /*
    {name:"Propiedades", route:"Propiedades", icon:"explore", 
    children: [
      {name:"Agregar", route:"Propiedades", icon:"assignment_ind", children: []},
   //   {name:"Personas", route:"Inquilinos", icon:"assignment_ind", children: []},
      {name:"Consultar", route:"ConsultarPropiedades", icon:"class"} 
    ]}, 
    */
    {name:'Usuarios',route:"Usuarios", icon:"supervised_user_circle"},
    /*, 
    children: [
      {name:"Agregar", route:"Usuarios", icon:"person_add", 
      children: []}, 
      {name:"Consultar", route:"AgregarUsuario", icon:"class"},
      {name:"Tesorero", route:"Tesorero", icon:"money", children: []}
    ]},
    */
    {name:"Controlador",route:"Controlador", icon:"cast_connected"},
    {name:"Configuracion",route:"Configuracion",icon:"settings"},
   //{name:'Salir',route:'Home', icon:"exit_to_app"}

   // <font-awesome-icon icon="right-from-bracket" />
   {name:'',route:"", icon:"", children: [
    {name:'',route:"", icon:""}
  ]},
  ]


  exit() {
    //location.reload();
    this.router.navigate(['../']);
  }


  private _mobileQueryListener: () => void;
Nav: any;
usuario: any;

    

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private data: DataService, private imagenService: ImagenService,private router:Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   
  }

 

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;

  ngOnInit(): void {
    this.usuario = this.data.obtener_usuario(8);
    this.Cargar_Imagen(this.data.obtener_usuario(1)); 
    this.esPanelAdmin();
  }



  imagenURL: string = '../assets/usuario.png';
  Cargar_Imagen(id_persona: number){
    const id_Pago = 3; //  ID correspondiente
    this.imagenService.obtenerImagenPorId(id_persona).subscribe(
      (imagen: ArrayBuffer) => {
        this.createImageFromBlob(new Blob([imagen]));
      },
      error => {
        console.error('Error al obtener la imagen', error);
      }
    );
  } 

  createImageFromBlob(image: Blob): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imagenURL = reader.result as string;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
 
  //Configuracion del submenu para que no se abra dos veces
  submenuAbierto: number = -1;
  abrirSubmenu(index: number): void {
    if (this.submenuAbierto === index) {
      this.submenuAbierto = -1; // Si se hace clic en el mismo, ciérralo
    } else {
      this.submenuAbierto = index; // Abre el nuevo submenu
    }
  }

}