import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  module = 'info'
  api = environment.apiUrl

  constructor(private _http: HttpClient) { }

  GetTables(): Observable<any> {
    return this._http.get(`${this.api}/${this.module}/GetTables`, { observe: "response" });
  }
  GetProcedures(): Observable<any> {
    return this._http.get(`${this.api}/${this.module}/GetProcedures`, { observe: "response" });
  }
}
