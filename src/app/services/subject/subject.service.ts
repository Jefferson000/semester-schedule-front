import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  module = 'subject'
  api = environment.apiUrl

  constructor(private _http: HttpClient) { }

  GetSubjects(): Observable<any> {
    return this._http.get(`${this.api}/${this.module}/GetSubjects`, { observe: "response" });
  }
  CreateSubject(params: any): Observable<any> {
    console.log(params);
    //http://104.196.144.212:5000/api/Classroom
    return this._http.post(`${this.api}/${this.module}/CreateSubject`, params);
  }

  DeleteSubject(params: any){
    return this._http.delete(`${this.api}/${this.module}/DeleteSubject`, {
      params: params,
      observe: "response"
    });
  }

  UpdateSubject(params: any): Observable<any>{
    return this._http.put(`${this.api}/${this.module}/UpdateSubject`, params);
  }

}
