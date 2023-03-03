import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/models/notification';
import { Usuario } from 'src/app/models/usuarios.models';
import { GeneralService } from 'src/app/services/general.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

declare function customInitFunctions();
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  //Notificacion
  notifications = new Array<Notification>();
  newNotifications: number;

  constructor(private _usuarioService: UsuariosService, private _notificationService: GeneralService,
              private router: Router) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
    customInitFunctions();
    //Notificacion
  }

  cerrarSesion() {

    Swal
    .fire({
        title: "Social soccer",
        text: "¿Estas seguro de cerrar sesion en este momento?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
    })
    .then(resultado => {
        if (resultado.value) {
            // Hicieron click en "Sí"
            console.log("*se cierra sesion*");
            Swal.fire('Social Soccer', `Se cerro sesion correctamente gracias por su preferencia UwU`, 'info');
            this._usuarioService.logOut()
        } else {
            // Dijeron que no
            console.log("*NO se se cierra sesion");
        }
    });
  }



}
