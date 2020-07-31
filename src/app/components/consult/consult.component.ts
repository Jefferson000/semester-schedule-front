import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsultService } from '../../services/consult/consult.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css']
})
export class ConsultComponent implements OnInit {

  ELEMENT_DATA = []
  generalForm: FormGroup;

  displayedColumns: string[] = ['professor', 'subject','semester'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  constructor(
    private _formBuilder: FormBuilder,
    private _consultService: ConsultService,    
    private _toast: ToastrService,
    private _router: Router
    ) { }

  ngOnInit() {
    this.generalForm = this._formBuilder.group({
      semester: ['', Validators.required]      //subjects: ['', Validators.required]
    });
    //this.getFirstConsult();
  }

  // getProfessor(){
  //   this.ELEMENT_DATA = [];
  //   this._professorSevice.GetProfessors().subscribe(
  //       (response) => {
  //       console.log(response.body.data);
  //       for(let i of response.body.data){
  //         let profesor = new Professor(i.professor_id,i.name,i.schedule, i.subject_name);
  //         this.ELEMENT_DATA.push(profesor);
  //       }
  //       this.dataSource.data = this.ELEMENT_DATA;
  //       this.dataSource.paginator = this.paginator;
  //       },(error)  => {
  //         this._toast.error('', 'Muchas peticiones al mismo tiempo');//TODO
  //       }
  //   );
  // }

  getFirstConsult(){
    this.ELEMENT_DATA = [];
    console.log('HOLA');
    this._consultService.GetFirstConsult({
      semester: this.generalForm.get('semester').value
    }).subscribe(
      (response) => {
        let res: any;
        res = response.body;
        console.log(response.body);
        this.ELEMENT_DATA = res.data;
        this.dataSource.data = this.ELEMENT_DATA;
        this.dataSource.paginator = this.paginator;
          this._toast.success('', 'Información cargada!');
          //this._router.navigate(['/main/professor']);
      },error => {
        console.log(error);
        this._toast.error('', 'Información NO cargada! :(');
        //this._router.navigate(['/main/professor']);
      });
  }

  getValidation(element: any){
    console.log(element);
    if(element==0||element===''){
      return 'N/A'
    }else{
      return element;
    }
  }

}
