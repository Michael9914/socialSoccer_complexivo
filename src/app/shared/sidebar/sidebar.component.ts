import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios.models';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';



declare function customInitFunctions();


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;

  constructor(private _usuarioService: UsuariosService,  public _sidebar: SidebarService,) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    console.log(this.usuario)
    this._sidebar.cargarMenu();
    customInitFunctions();
  }

  cerrarSesion(){
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
