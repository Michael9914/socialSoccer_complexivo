import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  
  private uri =  environment.base_url; 

  constructor(private http: HttpClient) { }

  create (json: any, url: string): Observable<any> {
    return this.http.post<any>(`${this.uri}/${url}`, json, httpOptions);
  }

  get(url: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.uri}/${url}`, httpOptions);
  }

  getOne(url: string): Observable<Notification[]> {
    return this.http.get<any[]>(`${this.uri}/${url}`, httpOptions);
  }

  updateOpcion (json: any, url: string): Observable<any> {
    return this.http.put(`${this.uri}/${url}`, json, httpOptions);
  }

  deleteOpcion(url: string): Observable<Notification> {
    return this.http.delete<Notification>(`${this.uri}/${url}`, httpOptions);
  }
  
}
