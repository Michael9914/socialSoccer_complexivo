import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Responder } from '../models/responder.Models';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class ResponderService {
  private opcionesUrl =  environment.base_url + '/respondea'; 
  constructor(private http: HttpClient) { }

  getResponder(): Observable<Responder[]> {
    return this.http.get<Responder[]>(this.opcionesUrl)
  }

  getResponderId(id: string): Observable<Responder> {
    const url = `${this.opcionesUrl}/${id}`;
    return this.http.get<Responder>(url);
  }

  addResponder (proveedor: Responder): Observable<Responder> {
    return this.http.post<Responder>(this.opcionesUrl, proveedor, httpOptions);
  }

  deleteResponder(opcion: Responder | string): Observable<Responder> {
    const id = typeof opcion === 'string' ? opcion : opcion._id;
    const url = `${this.opcionesUrl}/${id}`;

    return this.http.delete<Responder>(url, httpOptions);
  }

  updateResponder (proveedor: Responder): Observable<any> {
    return this.http.put(this.opcionesUrl, proveedor, httpOptions);
  }

}

