import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Usuario } from 'src/app/models/usuarios.models';
import { UserService } from 'src/app/services/user.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.css']
})
export class AdminUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  user:User[] =[]
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _usuarioService: UsuariosService, public userService: UserService, private router: Router) { }

  ngOnInit() {
    this.cargarUsuarios()
    this.getUsers();

  }
  cargarUsuarios() {

    this.cargando = true;

    this._usuarioService.cargarUsuarios1(this.desde)
      .subscribe((resp: any) => {

        this.totalRegistros = resp.total;

        this.usuarios = resp.usuarios;
        this.cargando = false;

      });


  }

  addUser(form?: NgForm) {
    if (form.value._id) {
      Swal.fire('Admin', `Se actualizo exitosamente`, 'success');

      this.userService.putUser(form.value).subscribe((res) => {
        this.resetForm(form);
        this.getUsers();
      }, (err) => {
        console.log(err)
        Swal.fire('', ``, 'error');
      });
    } else {
      Swal.fire('Administrador', `Edite un Usuario para poder actualizar`, 'error');
    }
  }
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.userService.selectedUser = new User();
    }
  }

  editUser(user: User) {
    this.userService.selectedUser = user;
  }

  deleteUser(_id: string, form: NgForm) {

    Swal
      .fire({
        title: "Admin",
        text: "¿Estas seguro de eliminar el usuario?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      })
      .then(resultado => {
        if (resultado.value) {
          // Hicieron click en "Sí"
          console.log("*se elimina el usuario*");
          Swal.fire('Admin', `Se borro exitosamente`, 'success');
          this.userService.deleteUser(_id).subscribe((res) => {
            this.getUsers();
            this.resetForm(form);
          });
        } else {
          // Dijeron que no
          console.log("*NO se elimina el usuario");
        }
      });
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (res) => {
        this.userService.users = res;
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/signin']);
          }
        }
      }
    );
  }


  cambiarDesde(valor: number) {

    let desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }



  buscarUsuario(termino: string) {

    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios(termino)
      .subscribe((usuarios: Usuario[]) => {

        this.usuarios = usuarios;
        this.cargando = false;
      });

  }

  borrarUsuario(usuario: Usuario) {

    if (usuario._id === this._usuarioService.usuario._id) {
      Swal.fire('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    Swal.fire(
      '¿Esta seguro?',
      'Esta a punto de borrar a ' + usuario.nombre,
      'warning',

    )
      .then(borrar => {

        if (borrar) {

          this._usuarioService.borrarUsuario(usuario._id)
            .subscribe(borrado => {
              this.cargarUsuarios();
            });

        }

      });

  }

  guardarUsuario(usuario: Usuario) {

    this._usuarioService.actualizarUsuario(usuario)
      .subscribe();

  }
}

