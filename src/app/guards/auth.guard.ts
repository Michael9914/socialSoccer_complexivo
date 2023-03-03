import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: UsuariosService,
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
      this.router.navigate(['/auth/login']);
       Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Primero logueese o registrese',

      });
      return false;
    }

  }
