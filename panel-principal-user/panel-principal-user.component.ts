import { Component } from '@angular/core';
import {ChangeDetectorRef, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { DataService } from '../data.service';
import { Router } from "@angular/router";
import { ImagenService } from '../panel-principal-admin/imagen.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherAirplay, featherUser } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-panel-principal-user',
  templateUrl: './panel-principal-user.component.html',
  styleUrls: ['./panel-principal-user.component.css'],
 // standalone: true,
  //imports: [NgIconComponent],
  //providers: [provideIcons({ featherAirplay, featherUser })],
})

export class PanelPrincipalUserComponent {
  mobileQuery: MediaQueryList;
  usuario: any;
 
  //fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);


  fillerNav=[
    {name:"Notificaciones", route:"Notificaciones_usuarios", icon:"assignment"},
    {name:"Mis Deudas", route:"MisDeudas", icon:"priority_high"},
    {name:"Proveedores", route:"Proveedores_usuarios", icon:"explore"},
    {name:"Acceso a puerta",route:"AccesoPuerta", icon:"dashboard"},
    {name:'Acuerdos',route:"Acuerdos_usuarios", icon:"supervised_user_circle"},
    
    {name:'',route:"", icon:"", children: [
      {name:'',route:"", icon:""}
    ]},
    
   // {name:'Salir',route:"NotFound", icon:"fa-sign-out "}
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
    

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private dataService: DataService,private router:Router, private imagenService: ImagenService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;

  ngOnInit(): void {
    this.usuario = this.dataService.obtener_usuario(2);
  }

  submenuAbierto: number = -1;
  abrirSubmenu(index: number): void {
    if (this.submenuAbierto === index) {
      this.submenuAbierto = -1; // Si se hace clic en el mismo, ciérralo
    } else {
      this.submenuAbierto = index; // Abre el nuevo submenu
    }
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
}
