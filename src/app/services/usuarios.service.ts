import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login';
import { Usuario } from '../models/usuarios.models';
import { tap, map, catchError } from 'rxjs/operators';
import { SubirArchivoService } from './subir-archivo.service';
import Swal from 'sweetalert2';



const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  userLogin: Login;
  usuario: Usuario;

  token: string;
  menu: any[] = [];

  public auth2: any;

  constructor(private http: HttpClient,
    private _subirArchivoService: SubirArchivoService,
    private router: Router,
    private ngZone: NgZone) {

    this.cargarStorage();
  }

  estaLogueado() {
    return (localStorage.getItem('token')) ? true : false;
  }


  cargarStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      //  this.token = '';
      this.usuario = null;
      this.menu = [];
    }

  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }




  logOut() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }




  crearUsuario(formData: Usuario) {

    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )

  }

  login(usuario: Login, recuerdame: boolean = false) {
    if (!recuerdame) {
      localStorage.setItem('email', usuario.email);

    } else {
      localStorage.removeItem('email');
    }

    let url = `${environment.base_url}/login`;

    return this.http.post(url, usuario).pipe(map((resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
      console.log(resp)
      return true;
    }));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }




  cambiarImagen(archivo: File, _id: string) {

    this._subirArchivoService.subirArchivo(archivo, 'usuarios', _id)
      .then((resp: any) => {

        this.usuario.img = resp.usuario.img;
        Swal.fire('Imagen Actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(_id, this.token, this.usuario, this.menu);

      })
      .catch(resp => {
        console.log(resp);
      });

  }

  actualizarUsuario(usuario: Usuario) {
    let url = `${environment.base_url}/usuarios/${usuario._id}`;

    return this.http.put(url, usuario).pipe(map((resp: any) => {

      if (usuario._id === this.usuario._id) {
        let usuarioDB = resp.usuario;
        this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
      }
      Swal.fire('Usuario actualizado', usuario.nombre, 'success');
      console.log(resp)
      return resp;

    }));
  }


  cargarUsuarios1(desde: number = 0) {

    let url = environment.base_url + '/usuarios?desde=' + desde;
    return this.http.get(url);

  }

  cargarUsuarios() {
    let url = `${environment.base_url}/usuario `;

    return this.http.get(url).pipe(map((resp: any) => resp));
  }

  buscarUsuarios(termino: string) {
    let url = `${environment.base_url}/busqueda/coleccion/usuarios/${termino}`;

    return this.http.get(url).pipe(map((resp: any) => resp.usuarios));
  }

  borrarUsuario(id: string) {
    let url = `${environment.base_url}/usuarios/${id}?token=${this.token}`;

    return this.http.delete(url).pipe(map((resp: any) => resp.usuario));
  }


}

