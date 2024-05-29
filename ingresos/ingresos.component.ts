import { Component, Injectable, OnInit,  Renderer2, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import {  deudas, deuda, historial } from "../modelos/deudas"
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { DatePipe } from '@angular/common'
import { Personas } from '../ingresos-extraordinarios/personas.model';
import { PersonasService } from '../ingresos-extraordinarios/personas.service';
import Swal from 'sweetalert2';
import { DeudaService } from '../ingresos-extraordinarios/deuda.service';
import { formatDate } from '@angular/common';
import { Deudores } from '../ingresos-extraordinarios/deudores.model';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent {
  tipo_formulario: string='';
  httpclient: any;
  UserGroup: FormGroup;
  UserGroup2: FormGroup;
  total:number=0;
  fecha_corte:string='';
  diasAtraso:number=0;
  recargo:number=0;
  deudas: deudas[] = [];
  deuda =new deuda();
  id_deudas: any;
  periodicidad:number=0;
  destinatario:string='';
  destinatario2:string='';
  especifico:boolean=false;
  formulario: any;
  personas : Personas[]=[];
  id_deuda:number=0;
  id_deudor:number=0;
  tipo_pago: string = "";
  monto:number=0;
  deudasDelUsuario : Deudores[]=[];
  deudasDelUsuarioExtra : Deudores[]=[];

  historial: any;

  constructor(private personasService:PersonasService,private deudaService:DeudaService, private renderer: Renderer2 , private el: ElementRef, private http: HttpClient, private dataService: DataService, private fb: FormBuilder,private personaService:PersonasService){


    
    this.UserGroup = this.fb.group({
         fraccionamiento: ['', Validators.required],
         monto: ['', Validators.required],
         nombre: ['', Validators.required],
         descripcion: ['', Validators.required],
         dias_gracia: ['', Validators.required],
         periodicidad: ['', Validators.required],
         recargo: ['', Validators.required],
         proximo_pago: ['', Validators.required],
         destinatario: ['', Validators.required],
         
    
       })

       this.UserGroup2 = this.fb.group({
        fraccionamiento: ['', Validators.required],
        monto: ['', Validators.required],
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        dias_gracia: ['', Validators.required],
        periodicidad: ['', Validators.required],
        recargo: ['', Validators.required],
        proximo_pago: ['', Validators.required],
        destinatario2: ['', Validators.required],
        cboxpersonas: ['', Validators.required],
        
        
      })

    }

    ngOnInit(): void {

      this.consultarHistorialDeudas(this.dataService.obtener_usuario(3));
    //  this.tipo_formulario=='ordinario';

    }

    
    toggleCollapsible(event: Event): void {
      const element = event.currentTarget as HTMLElement;
      const content = element.nextElementSibling as HTMLElement; // Convertir a HTMLElement
      this.renderer.addClass(element, 'active');
      if (content.style.display === 'block') {
        this.renderer.setStyle(content, 'display', 'none');
        this.renderer.removeClass(element, 'active');
      } else {
        this.renderer.setStyle(content, 'display', 'block');
      }
    }



    onRowClicked(lote: any) {
      this.id_deudas= lote['id_deudas']
  
    }



    consultarHistorialDeudas(id_fraccionamiento: any) {
      this.dataService.fetchDataHistorialDeudas(id_fraccionamiento).subscribe((historial: historial[]) => {
        console.log(historial);
        this.historial = historial;
      });
    }



    edit(deudas: {
      id_deudas: any;
      monto: any;
      nombre: any;
      descripcion: any;
      dias_gracia: any; 
      periodicidad: any;
      recargo: any;
      proximo_pago: any;
    }){
      this.deuda.id_deudas = deudas.id_deudas;
      this.deuda.monto= deudas.monto;
      this.deuda.nombre= deudas.nombre;
      this.deuda.descripcion= deudas.descripcion;
      this.deuda.dias_gracia= deudas.dias_gracia;
      this.deuda.periodicidad= deudas.periodicidad;
      this.deuda.recargo= deudas.recargo;
      this.deuda.proximo_pago= deudas.proximo_pago;
    }
    
    fechaProximoPago:string='';
    /*
agregar_deuda(deudas: {monto: any, nombre: any, descripcion: any, dias_gracia: number, periodicidad: number, recargo: any, id_tesorero: any, id_fraccionamiento: any,proximo_pago:any,destinatario:any}){

  const params = {
    monto: deudas.monto,
    nombre: deudas.nombre,
    descripcion: deudas.descripcion,
    dias_gracia: deudas.dias_gracia,
    periodicidad: deudas.periodicidad,
    recargo: deudas.recargo,
    id_tesorero: this.dataService.obtener_usuario(1),
    id_fraccionamiento: this.dataService.obtener_usuario(3),
    proximo_pago: deudas.proximo_pago,
    proximo_pago1: "string",
    destinatario: this.destinatario
  }

  console.log("DEUDAS", params);

 
  const headers = new HttpHeaders({'myHeader': 'procademy'});
  this.http.post(
   "https://localhost:44397/api/Deudas/Agregar_Deuda",
    params, {headers: headers})
    .subscribe((res) => { 
      console.log(res);
      Swal.fire({
        title: 'Deuda agregada correctamente',
        text: '',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    //  this.ngOnInit(); 
    this.consultarHistorialDeudas(this.dataService.obtener_usuario(1));
    this.UserGroup.reset();
    });
 
}
*/
onChangeOption(event:any){
  const selectedValue = event.target.value;

  this.destinatario=selectedValue;
}

onChangeOption2(event:any){
  const selectedValue = event.target.value;

  if(selectedValue=='personalizado'){
    this.especifico=true;
   // this.onChangeUsuario({ target: { selectedIndex: 2 } });
  }else{
    this.especifico=false;
    this.destinatario=selectedValue;
    this.destinatario2=this.destinatario;
    console.log("Destinatarioooooooooooooooooo:"+this.destinatario);
    console.log("Destinatarioooooooooooooooooo2:"+this.destinatario2);

    
  }
 
  
}


  
actualizar_deuda(
  deudas: {monto: number, nombre: string, descripcion: string, dias_gracia:number, periodicidad: number, recargo: number, id_deudas: number}
){
 
  const params = {
    monto: deudas.monto,
    nombre: deudas.nombre,
    descripcion: deudas.descripcion,
    dias_gracia: deudas.dias_gracia,
    periodicidad: deudas.periodicidad,
    recargo: deudas.recargo,
    id_deudas:  this.id_deudas
    };

    console.log("deudas: ",deudas)

  const httpOptions = {
    headers: new HttpHeaders({
     'Content-Type':  'application/json'
    })
  }; 

  console.log("actualizar: ",params)

  return this.http.put("https://localhost:44397/api/Deudas/Actualizar_Deuda", params).subscribe(
    (_response) => {
      console.log("actualiza",params)
      this.ngOnInit();
      this.UserGroup.reset();

    }
  )

}

/*
delete(id_deudas: any){
  return this.http.delete("https://localhost:44397/api/Deudas/Eliminar_Deuda?id_deudas="+id_deudas).subscribe(
    () => {
      this.consultarHistorialDeudas(this.dataService.obtener_usuario(3));
 
    })

}
*/

/* A PARTIR DE AQUI EMPIEZA LO DE LAS DEUDAS EXTRAORDINARIAS*/
/* A PARTIR DE AQUI EMPIEZA LO DE LAS DEUDAS EXTRAORDINARIAS*/
/* A PARTIR DE AQUI EMPIEZA LO DE LAS DEUDAS EXTRAORDINARIAS*/


  fechaCorte_extra:string='';
  /*
  agregar_deudaExtra(deudas: {monto: number, nombre: string, descripcion: string, dias_gracia:number, periodicidad: number, recargo: number, id_tesorero: number, id_fraccionamiento:number,proximo_pago:string,destinatario:string}){

  deudas.dias_gracia=0;
  deudas.periodicidad=0;
  deudas.recargo=0;
  deudas.proximo_pago=this.fechaCorte_extra;
  deudas.id_fraccionamiento= this.dataService.obtener_usuario(3);
  deudas.id_tesorero = this.dataService.obtener_usuario(1);
  console.log(deudas.id_tesorero);
  console.log(this.fechaCorte_extra);

  const params = {
    id_deudas: 0,
    id_fraccionamiento: deudas.id_fraccionamiento,
    id_tesorero: this.dataService.obtener_usuario(1),
    monto: deudas.monto,
    nombre: deudas.nombre,
    descripcion: deudas.descripcion,
    proximo_pago: deudas.proximo_pago,
    proximo_pago1: "s",
    destinatario: this.destinatario,
    dias_gracia: 0,
    periodicidad: 0,
    recargo: 0
  }

  console.log("PARAMS", params)

  const headers = new HttpHeaders({'myHeader': 'procademy'});
  this.http.post(
   "https://localhost:44397/api/Deudas/Agregar_DeudaExtra",
    params, {headers: headers})
    .subscribe((res) => { 
      Swal.fire({
        title: 'Deuda agregada correctamente',
        text: '',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      console.log(res);
    //  this.ngOnInit(); 
    this.fetchDataDeudasExtra(this.dataService.obtener_usuario(1));
    this.UserGroup.reset();
    });
 
}

*/

actualizar_deudaExtra(
  deudas: {monto: number, nombre: string, descripcion: string, proximo_pago: Date, id_deudas: number}
){
 
  const params = {
    monto: deudas.monto,
    nombre: deudas.nombre,
    descripcion: deudas.descripcion,
    id_deudas:  this.id_deudas,
    proximo_pago: deudas.proximo_pago
    };

    console.log("deudas: ",deudas)

  const httpOptions = {
    headers: new HttpHeaders({
     'Content-Type':  'application/json'
    })
  }; 

  console.log("actualizar: ",params)

  return this.http.put("https://localhost:44397/api/Deudas/Actualizar_Deuda", params).subscribe(
    (_response) => {
      console.log("actualiza",params)
      this.ngOnInit();
      this.UserGroup.reset();

    }
  )

}


onChangeDeuda(event: any) {
  const selectedIndex = event.target.selectedIndex;
  const deudaSeleccionada = this.deudasDelUsuario[selectedIndex];
  this.id_deuda=deudaSeleccionada.id_deuda;

  this.monto = deudaSeleccionada.monto;
  this.fecha_corte = formatDate(deudaSeleccionada.proximo_pago, 'yyyy-MM-dd', 'en-US');
  this.periodicidad = deudaSeleccionada.periodicidad;
  this.recargo=deudaSeleccionada.recargo;

  // Calcular la fecha del próximo pago sumando la periodicidad a la fecha de vencimiento
  const proximoPago = new Date(deudaSeleccionada.proximo_pago); // Convertir a objeto Date
  proximoPago.setDate(proximoPago.getDate() + this.periodicidad); // Sumar la periodicidad en días

  // Formatear la fecha del próximo pago
  this.fechaProximoPago = formatDate(proximoPago, 'yyyy-MM-dd', 'en-US');

  const fechaActual = new Date(); // Fecha actual
  this.diasAtraso = Math.floor((fechaActual.getTime() - proximoPago.getTime()) / (1000 * 3600 * 24));

  // Verificar si los días de atraso son mayores que los días de gracia y agregar recargo

  this.total = deudaSeleccionada.monto

  if (this.diasAtraso > deudaSeleccionada.dias_gracia) {
    // Agregar el recargo al monto de la deuda
    
    this.total += deudaSeleccionada.recargo ; // Agregar el valor de lote al recargo
  
  }
 

}

pagarDeudaExtraordinaria(montoDeudaExtra: any) {
  const idDeudor = this.id_deudor // Reemplaza con el ID del deudor correspondiente
  const idDeuda = this.id_deuda; // Reemplaza con el ID de la deuda correspondiente
  const idFraccionamiento = this.dataService.obtener_usuario(3); // Reemplaza con el ID del fraccionamiento correspondiente
  const proximoPago = this.fechaProximoPago; // Reemplaza con la fecha deseada en el formato correcto
  
  const monto = this.monto

  console.log("monto: ", montoDeudaExtra, "total: ", monto)

  if(montoDeudaExtra<monto){
    this.tipo_pago = "abono";
    montoDeudaExtra = monto - montoDeudaExtra;
  }
  else{
    this.tipo_pago = "liquidacion";
  }

  if(this.archivoSeleccionado){
    this.deudaService.pagarDeudaExtraordinaria(idDeudor, idDeuda, this.dataService.obtener_usuario(3), this.fechaProximoPago,this.archivoSeleccionado, this.tipo_pago, montoDeudaExtra).subscribe(
      (respuesta) => {
        if (respuesta) {
          Swal.fire({
            title: 'La deuda ha sido pagada exitosamente',
            text: '',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          console.log('La deuda ha sido pagada exitosamente');
          this.onChangeDeuda({ target: { selectedIndex: 0 } });
          this.onChangeUsuario({ target: { selectedIndex: 0 } });
          location.reload;
        } else {
          console.log('Hubo un problema al pagar la deuda');
          Swal.fire({
            title: 'Hubo un problema al pagar la deuda',
            text: '',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      },
      (error) => {
        console.error('Error al intentar pagar la deuda:', error);
        Swal.fire({
          title: 'Hubo un problema al pagar la deuda',
          text: 'Por favor contactese con el administrador de la pagina',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }else{
    Swal.fire({
      title: 'Por favor cargue un comprobante de pago',
      text: '',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
}


onChangeUsuario(event: any) {
  this.deudasDelUsuario = [];
  // Aquí puedes agregar la lógica que deseas ejecutar cuando cambia la opción seleccionada
  const valorSeleccionado = event.target.value;
  const destinatarioId = parseInt(valorSeleccionado.split(' - ')[0]);
  this.id_deudor=destinatarioId;
  this.personasService.consultarDeudoresExtraoridinarios(this.dataService.obtener_usuario(3),destinatarioId).subscribe(
    (deudasUsuario: Deudores[]) => {
     this.deudasDelUsuario = deudasUsuario
      console.log('deudas extraordinarias del usuario', deudasUsuario);
      if(this.deudasDelUsuario.length!=0){
        this.onChangeDeuda({ target: { selectedIndex: 0 } });
      }else{
        this.id_deuda=0;
        this.monto = 0;
        this.diasAtraso = 0;
        this.total =0;
        this.recargo=0;
        this.fechaProximoPago='';
        this.periodicidad=0;
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

  this.monto=0;
  this.periodicidad=0;
  this.fecha_corte='';

}

imagenSeleccionada: any; // Variable para mostrar la imagen seleccionada en la interfaz
  archivoSeleccionado: File | null = null;
  imagenEnBytes: Uint8Array | null = null;
  

  handleInputFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagenSeleccionada = reader.result as string;
          this.archivoSeleccionado = file; // Guardar el archivo seleccionado
          Swal.fire({
            title: 'Comprobante cargado correctamente',
            text: '',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });

        };
        reader.readAsDataURL(file);
      }
    }
    input.value = ''; // Limpiar el input de tipo file
  }
}



 