import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../services/info/info.service';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {

  tablesInfo: string = ''
  proceduresInfo: string = '';
  constructor(private _infoService: InfoService) { }

  ngOnInit() {
    console.log('Estoy en Info');
    this.getProcedures();

  }

  getProcedures(){
    console.log('getProcedures');
    this._infoService.GetProcedures().subscribe(
      (response) => {
        console.log(response.body.data);
        for(let i of response.body.data){
          this.proceduresInfo += `nombre: ${i.name}, creación: ${i.create_date}, actualización: ${i.modify_date}                                                                                                             `;
        }
        this.getTables();
      },(error)  => {
        console.log(error);
      }
    );
  }

  getTables(){
    console.log('getTables');
    this._infoService.GetTables().subscribe(
      (response) => {
        console.log(response.body.data);
        for(let i of response.body.data){
          this.tablesInfo += `nombre: ${i.name}, creación: ${i.create_date}, actualización: ${i.modify_date}                                                                                                             `;
        }
      },(error)  => {
        console.log(error);
      }
    );
  }

}
