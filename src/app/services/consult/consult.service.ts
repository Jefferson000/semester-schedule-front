import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConsultService {

  module = 'consult'
  api = environment.apiUrl
  //api = 'http://localhost:9003';

  constructor(private _http: HttpClient) { }

  GetFirstConsult(params: any){
    return this._http.get(`${this.api}/${this.module}/FirstConsult`, {
      params: params,
      observe: "response"
  });
  
  }
}
