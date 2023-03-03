import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';


import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuarios.models';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})

export class DragdropService {

  usuario: Usuario;
  token: string;
  private proveedoresUrl = environment.base_url + '/create-user';

  constructor(private http: HttpClient, public _usuarioService: UsuariosService) { }

  addFiles(images: File) {
    var arr = []
    var formData = new FormData();
    arr.push(images);

    arr[0].forEach((item, i) => {
      formData.append('avatar', arr[0][i]);
    })
    this.proveedoresUrl =  environment.base_url + '/create-user';
    return this.http.post( this.proveedoresUrl, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.errorMgmt)
    )
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }




  getDocumentos (): Observable<any[]> {
    return this.http.get<any[]>(environment.base_url +'/')
  }

}
