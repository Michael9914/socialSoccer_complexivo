import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vocalia } from '../models/vocalia.model';

@Injectable({
  providedIn: 'root'
})
export class VocaliaService {
  selectedVocalia: Vocalia;
  vocalias: Vocalia[];
  vocalia: Vocalia;
  readonly URL_API = "http://localhost:3500/api/vocalias";

  constructor(private http: HttpClient) {
    this.selectedVocalia = new Vocalia();
  }

  getVocalias(){
    return this.http.get<Vocalia[]>(this.URL_API);
  }

  postVocalia(vocalia: Vocalia) {
    return this.http.post(this.URL_API, vocalia);
  }

  putVocalia(vocalia: Vocalia) {
    return this.http.put(this.URL_API + `/${vocalia._id}`, vocalia);
  }

  deleteVocalia(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
