import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  module = 'professor'
  api = environment.apiUrl

  constructor(private _http: HttpClient) { }

  GetProfessors(): Observable<any> {
    return this._http.get(`${this.api}/${this.module}/GetProfessors`, {observe: "response" });
  }

    
  CreateProfessor(params: any): Observable<any> {
    return this._http.post(`${this.api}/${this.module}/CreateProfessor`, params);
  }

  DeleteProfessor(params: any){
    return this._http.delete(`${this.api}/${this.module}/DeleteProfessor`, {
      params: params,
      observe: "response"
    });
  }

  UpdateProfessor(params: any): Observable<any>{
    return this._http.put(`${this.api}/${this.module}/UpdateProfessor`, params);
  }

}
