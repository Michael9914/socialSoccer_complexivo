import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    public _usuarioService: UsuariosService,
    private router:Router,
  ) { }
  canActivate(){
    if (this._usuarioService.loggedIn()) {
      return true;
    }
      this.router.navigate(['/login']);
       Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Primero logueese o registrese',

      });
      return false;

    if ( this._usuarioService.usuario.role === 'ADMIN_ROLE') {
      return true;
    }

    if ( this._usuarioService.usuario.role === 'USER_ROLE') {
      console.log( 'Bloqueado por el  GUARD');
      return true;
    }
    if ( this._usuarioService.usuario.role === 'VOCAL_ROLE') {
      return true;
    }
   else {
      console.log( 'Bloqueado por el  GUARD');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Su usuario esta Inactivo',

      });
      this._usuarioService.logOut();
      return false;
    };





  }



}
