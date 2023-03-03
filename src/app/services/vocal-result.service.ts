import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VocalResult } from '../models/vocaliaResult.model';

@Injectable({
  providedIn: 'root'
})
export class VocalResultService {

  selectedVocalResult: VocalResult;
  vocalResults: VocalResult[];
  vocalResult: VocalResult;
  readonly URL_API = "http://localhost:3500/api/vocalResults";

  constructor(private http: HttpClient) {
    this.selectedVocalResult = new VocalResult();
  }

  getVocalResults(){
    return this.http.get<VocalResult[]>(this.URL_API);
  }

  postVocalResult(vocalResult: VocalResult) {
    return this.http.post(this.URL_API, vocalResult);
  }

  putVocalResult(vocalResult: VocalResult) {
    return this.http.put(this.URL_API + `/${vocalResult._id}`, vocalResult);
  }

  deleteVocalResult(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }}
