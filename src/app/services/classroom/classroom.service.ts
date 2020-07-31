import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  module = 'classroom'
  api = environment.apiUrl

  constructor(private _http: HttpClient) { }

  GetClassrooms(): Observable<any> {
    return this._http.get(`${this.api}/${this.module}/GetClassrooms`, { observe: "response" });
  }

  CreateClassroom(params: any): Observable<any> {
    console.log(params);
    //http://104.196.144.212:5000/api/Classroom
    return this._http.post(`${this.api}/${this.module}/CreateClassroom`, params);
  }

  DeleteClassroom(params: any){
    return this._http.delete(`${this.api}/${this.module}/DeleteClassroom`, {
      params: params,
      observe: "response"
  });
  }

  UpdateClassroom(params: any): Observable<any>{
    return this._http.put(`${this.api}/${this.module}/UpdateClassroom`, params);
  }
}
