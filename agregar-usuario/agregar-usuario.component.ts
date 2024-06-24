import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../data.service';
import { usuario, usuarios } from "../modelos/usuarios"
import { fraccionamiento, fraccionamientos } from "../modelos/fraccionamientos"
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid';
import { InvitacionService } from './invitacion.service';
import { CorreoService } from './correo.service';


@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent {
  usuario = new usuario();
  usuarios: usuarios[] = [];
  UserGroup: FormGroup;
  fraccionamientos: fraccionamientos[] | undefined;
  id_fracc: any;
  tipo_usuario: any;
  filtroUsuarios: "" | undefined;
  id_usuario: any;
  tesorero: any;
  mostrarGrid: boolean = false;


  indice: number = 0; 
verdaderoRango: number = 6;
cont: number = 1;

  ngOnInit(): void {

    this.fetchDataUsers(this.dataService.obtener_usuario(1));


    $(function () {

      // Active the first thumb & panel
      $(".tabs-thumb1:first-child").addClass("is-active").closest(".tabs1").find(".tabs-panel1:first-child").show();

      $(this).addClass("is-active");

      $(".tabs-thumb1").click(function () {
        // Cancel the siblings
        $(this).siblings(".tabs-thumb1").removeClass("is-active").closest(".tabs1").find(".tabs-panel1").hide();
        $(this).addClass("is-active");
        // Active the thumb & panel
        $(this).addClass("is-active1").closest(".tabs1").find(".tabs-panel1").eq($(this).index(".tabs-thumb1")).show();
      });
    });



  }

  fetchDataUsers(id_administrador: any) {
  //  console.log("id admiiiiiiiiiiiiiiiiiiiiiiin: " + id_administrador);
  Swal.fire({
   
    title: 'Cargando datos',
    html: 'por favor espere',
    didOpen: () => {

      Swal.showLoading();

    },
    willClose: () => {
      clearInterval(10);
      this.mostrarGrid = true;

    }
  });

    this.dataService.fetchDataUsers(id_administrador).subscribe((usuarios: usuarios[]) => {
      Swal.close();
        
      console.log("fetch", usuarios);
      this.usuarios = usuarios;
    });
  }


  correo_invitado: string = '';
  correo_invitado1: string = '';

  seleccionar(usuario: any){
    this.id_usuario = usuario;
  }


  enviarCorreo(correoDestinatario: string, mensaje: string): void {
    this.correoService.Enviar_Correo(correoDestinatario, this.dataService.obtener_usuario(5) + " te ha invitado a unirte a su comunidad, da click en el enlace y llena el formulario.");
  }



  mandar_correo(correo_invitado: string) {


    console.log(correo_invitado);
    const token = uuidv4();
    console.log(token, correo_invitado, this.dataService.obtener_usuario(1), this.dataService.obtener_usuario(5), this.dataService.obtener_usuario(2), "usuario")

    var correo = correo_invitado;
    this.invitacionService.generarInvitacion(token, correo_invitado, this.dataService.obtener_usuario(1), this.dataService.obtener_usuario(5), this.dataService.obtener_usuario(2), "usuario")
      .subscribe(
        response => {
          console.log('Success:', response);
          this.correoService.Enviar_Correo(correo_invitado, "haz sido invitado por tu administrador para unirte a una comunidad en linea\n por favor termina tu registro en el siguiente link: \n https://localhost:44397:4200/Invitacion?token=" + token);
          // this.enviarCorreo(correoElectronico, "haz sido invitado por tu administrador para unirte a una comunidad en linea\n por favor termina tu registro en el siguiente link: \n https://localhost:44397:4200/Invitacion?token=" + token);
          Swal.fire({
            title: 'Invitacion enviada correctamente',
            text: '',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })

        },
        error => {
          console.error('Error al generar la invitación:', error);

        }
      )
  };




  agregar_usuario(usuario: {

    id_usuario: number | undefined;
    nombre: string | undefined;
    apellido_pat: string | undefined;
    apellido_mat: string | undefined;
    id_fraccionamiento: number | undefined;
    tipo_usuario: string | undefined;
    id_lote: number | undefined;
    telefono: string | undefined;
    fecha_nacimiento: Date | undefined;
    correo: string | undefined;
    contrasenia: string | undefined;
    confirmarContrasena: string | undefined;

  }) {

    if (usuario.contrasenia == usuario.confirmarContrasena) {

      const params = {
        nombre: usuario.nombre,
        apellido_pat: usuario.apellido_pat,
        apellido_mat: usuario.apellido_mat,
        tipo_usuario: "usuario",
        telefono: usuario.telefono,
        fecha_nacimiento: usuario.fecha_nacimiento,
        correo: "N/A",
        contrasenia: "123",
        id_fraccionamiento: this.dataService.obtener_usuario(1),
        id_administrador: this.dataService.obtener_usuario(1),
        id_lote: 1,
        hikvision: "permitido"

        //  Intercomunicador: 123,
        //  Codigo_acceso: "123"
      };

      let direccion = "https://localhost:44397/api/Usuarios/Agregar_Usuario";

      const headers = new HttpHeaders({ 'myHeader': 'procademy' });
      this.http.post(
        direccion,
        params, { headers: headers })
        .subscribe((res) => {
          console.log(res);
          console.log(this.usuarios[0].fecha_nacimiento);
          this.fetchDataUsers(this.dataService.obtener_usuario(1));

          Swal.fire({
            title: 'Usuario agregado',
            text: '',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
        });
    }
    else {
      console.log("error: intentalo de nuevo");
    }

    this.usuarios.push(this.UserGroup.value);
    this.UserGroup.reset();

  }


  disable(usuario: any) {

    this.id_fracc = this.id_usuario;

    return this.http.get("https://localhost:44397/api/Usuario_lote/RestrictedUser?id_usuario=" + this.id_fracc).subscribe(
      () => {

        Swal.fire({
          title: 'Usuario restringido correctamente',
          text: '',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        this.UserGroup.reset();
        this.fetchDataUsers(this.dataService.obtener_usuario(1));

      },
      (error) => {
        console.error('Error al agregar notificación Angular:', error);
        Swal.fire({
          title: 'Por favor, complete todos los campos',
          text: '',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
        this.fetchDataUsers(this.dataService.obtener_usuario(1));
        console.log("hola");
        this.UserGroup.reset();


      })


  }


  delete(usuario: any) {

    this.id_fracc = this.id_usuario;
    console.log(this.id_usuario);

    return this.http.delete("https://localhost:44397/api/Usuario_lote/Eliminar_inquilino?id_persona=" + this.id_fracc).subscribe(
      () => {

        Swal.fire({
          title: 'Usuario eliminado correctamente',
          text: '',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        this.UserGroup.reset();
        this.fetchDataUsers(this.dataService.obtener_usuario(1));

      },
      (error) => {
        console.error('Error al agregar notificación Angular:', error);
        Swal.fire({
          title: 'Por favor, complete todos los campos',
          text: '',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
        this.fetchDataUsers(this.dataService.obtener_usuario(1));
        console.log("hola");
        this.UserGroup.reset();


      })


  }


  enable(usuario: any) {

    this.id_fracc = this.id_usuario;


    return this.http.get("https://localhost:44397/api/Usuario_lote/EnableUser?id_usuario=" + this.id_fracc).subscribe(
      () => {
        Swal.fire({
          title: 'Usuario agregado correctamente',
          text: '',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        this.fetchDataUsers(this.dataService.obtener_usuario(1));

      },
      (error) => {
        console.error('Error al agregar notificación Angular:', error);
        Swal.fire({
          title: 'Por favor, complete todos los campos',
          text: '',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
        this.fetchDataUsers(this.dataService.obtener_usuario(1));
        console.log("hola");
        this.UserGroup.reset();


      })


  }



  constructor(private http: HttpClient, private dataService: DataService, private fb: FormBuilder, private invitacionService: InvitacionService, private correoService: CorreoService) {

    this.UserGroup = this.fb.group({
      id_persona: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido_pat: ['', Validators.required],
      apellido_mat: ['', Validators.required],
      tipo_usuario: ['', Validators.required],
      id_lote: ['', Validators.required],
      telefono: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      correo: ['', Validators.required],
      contrasenia: ['', Validators.required],
      confirmarContrasena: ['', Validators.required],
      id_fraccionamiento: ['', Validators.required],

    })
  }





actualizar_tesorero(){

  this.id_fracc = this.id_usuario;
  this.tesorero='tesorero';


  return this.http.put("https://localhost:44397/api/Personas/Actualizar_TipoUsuario?tipo_usuario="+this.tesorero+"&id_persona=" + this.id_fracc,this.id_fracc).subscribe(
    () => {
      Swal.fire({
        title: 'Tesorero',
        text: '',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
      this.fetchDataUsers(this.dataService.obtener_usuario(1));
      window.location.reload();

    },
    (error) => {
      console.error('Error al agregar notificación Angular:', error);
      Swal.fire({
        title: 'Por favor, complete todos los campos',
        text: '',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
      this.fetchDataUsers(this.dataService.obtener_usuario(1));
      console.log("hola");
      this.UserGroup.reset();



    })


}


  
pageChanged(event: any) {
  // Determinar la acción del paginator
  if (event.previousPageIndex < event.pageIndex) {
    // Se avanzó a la siguiente página
    this.paginador_adelante();
  } else if (event.previousPageIndex > event.pageIndex) {
    // Se retrocedió a la página anterior
    this.paginador_atras();
  }
}




paginador_atras() {

  if (this.indice - this.verdaderoRango >= 0) {
    this.usuarios = this.usuarios.slice(this.indice - this.verdaderoRango, this.indice);
    this.indice = this.indice - this.verdaderoRango;
    this.cont--;
  }
}

paginador_adelante() {
  if (this.usuarios.length - (this.indice + this.verdaderoRango) > 0) {
    this.indice = this.indice + this.verdaderoRango;
    this.usuarios = this.usuarios.slice(this.indice, this.indice + this.verdaderoRango);
    this.cont++;
   // this.consultarNotificacion
  } 
  
}









}