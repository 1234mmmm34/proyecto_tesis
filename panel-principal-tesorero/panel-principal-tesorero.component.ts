import { Component } from '@angular/core';
import {ChangeDetectorRef, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout'
import { DataService } from '../data.service'
import { ImagenService } from '../panel-principal-admin/imagen.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-panel-principal-tesorero',
  templateUrl: './panel-principal-tesorero.component.html',
  styleUrls: ['./panel-principal-tesorero.component.css']
})
export class PanelPrincipalTesoreroComponent {
  imagen: any;


  mobileQuery: MediaQueryList;

  //fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
 
   
   //{name:'Salir',route:'Home', icon:"exit_to_app"}

   // <font-awesome-icon icon="right-from-bracket" />

   /*
   fillerNav=[
    {name:"Deudas", route:"", icon:"border_color",children:[
     {name:"Agregar Deudas", route:"Deudas", icon:"border_color"},
     {name:'Consultar Deudas', route:'ConsultarDeudas', icon:'border_color'},
    ]}, 
    {name:"Deudores", route:"Deudores", icon:"report_problem"},
    {name:"Egresos", route:"Egresos", icon:"call_made"},
    {name:"Ingresos", route:"Egresos", icon:"call_made",children:[
      {name:"Ingresos Extraordinarios",route:"IngresosExtraordinarios", icon:"call_received"},
    {name:"Ingresos Ordinarios",route:"IngresosOrdinarios", icon:"call_received"},
    ]},
    
    {name:'Proveedores',route:"Proveedores", icon:"store_mall_directory"},
    {name:'Configuracion',route:'Settings',icon:'settings'},
    
    
  ]
*/
/*
  fillerNav=[
    {name:"Deudas", route:"", icon:"border_color",children:[
     {name:"Agregar Deudas", route:"Deudas", icon:"border_color"},
     {name:'Consultar Deudas', route:'ConsultarDeudas', icon:'border_color'},
    ]}, 
    {name:"Deudores", route:"Deudores", icon:"report_problem"},
    {name:"Egresos", route:"Egresos", icon:"call_made"},
    {name:"Ingresos", route:"Egresos", icon:"call_received",children:[
      {name:"Ingresos Extraordinarios",route:"IngresosExtraordinarios", icon:"call_received"},
    {name:"Ingresos Ordinarios",route:"IngresosOrdinarios", icon:"call_received"},
    ]},
    {name:'Proveedores',route:"Proveedores", icon:"store_mall_directory"},
    {name:'Usuarios',route:"Usuarios", icon:"supervised_user_circle", children: [
      {name:"Consultar", route:"ConsultarUsuariosTesorero", icon:"class"}
    ]},
    {name:'Configuracion',route:'Settings',icon:'settings'},
    {name:"Consultar", route:"ConsultarUsuariosTesorero", icon:"class"}

  ]
*/

fillerNav=[
  {name:"Deudas", route:"", icon:"border_color",children:[
   {name:"Agregar Deudas", route:"Deudas", icon:"border_color"},
   {name:'Consultar Deudas', route:'ConsultarDeudas', icon:'border_color'},
  ]}, 
  {name:"Deudores", route:"Deudores", icon:"report_problem"},
  {name:"Egresos", route:"Egresos", icon:"call_made"},
  {name:"Ingresos", route:"Egresos", icon:"call_received",children:[
    {name:"Ingresos Extraordinarios",route:"IngresosExtraordinarios", icon:"call_received"},
  {name:"Ingresos Ordinarios",route:"IngresosOrdinarios", icon:"call_received"},
  ]},
  
  {name:'Proveedores',route:"Proveedores", icon:"store_mall_directory"},
  {name:'Consultar',route:"ConsultarUsuariosTesorero", icon:"user"},
  {name:'Configuracion',route:'Settings',icon:'settings'},
]


  exit() {
    //location.reload();
    this.router.navigate(['../']);
  }

  fillerContent = Array.from(
    {length: 50},
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  );

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
    this.usuario = this.data.obtener_usuario(2);
    this.Cargar_Imagen(this.data.obtener_usuario(1));
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
