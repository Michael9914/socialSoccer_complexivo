
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import {AuthService} from './auth.service'
import { UsuariosService } from './usuarios.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: UsuariosService) { }

  intercept(req, next) {
    let tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
    return next.handle(tokenizeReq);
  }

}
