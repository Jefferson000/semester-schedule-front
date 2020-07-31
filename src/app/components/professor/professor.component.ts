import { Component, OnInit,ViewChild} from '@angular/core';
import { ProfessorService } from '../../services/professor/professor.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Professor } from '../../classes/professor'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubjectService } from '../../services/subject/subject.service';
@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {

  ELEMENT_DATA: Professor[] = [];
  //Pagination
  displayedColumns: string[] = ['name', 'subjectName','option'];
  dataSource = new MatTableDataSource<Professor>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(
    private _professorSevice: ProfessorService,
    private _subjectService: SubjectService,
    private _router: Router,
    private _toast: ToastrService
    ) { }

  ngOnInit() {
    console.log('Estoy en Professor');
    this.getProfessor()
  }

  getProfessor(){
    this.ELEMENT_DATA = [];
    this._professorSevice.GetProfessors().subscribe(
        (response) => {
        console.log(response.body.data);
        for(let i of response.body.data){
          let profesor = new Professor(i.professor_id,i.name,i.schedule, i.subject_name);
          this.ELEMENT_DATA.push(profesor);
        }
        this.dataSource.data = this.ELEMENT_DATA;
        this.dataSource.paginator = this.paginator;
        },(error)  => {
          this._toast.error('', 'Muchas peticiones al mismo tiempo');//TODO
        }
    );
  }

  onCreateProfessor(){
    this._router.navigate(['/main/action-professor']);
  }

  deleteProfessor(professor_id: any){
    console.log(professor_id);
    this._professorSevice.DeleteProfessor({
      professor_id
    }
    ).subscribe(
      (response) => {
        console.log(response);
        this.getProfessor();
        this._toast.success('', 'Professor Eliminado!');//TODO
      },(error)  => {
        this._toast.error('', 'Professor NO Eliminado');//TODO
      }
  );
  }

  editProfessor(element: any){
    console.log(element);
    //0
    
    this._router.navigate([`/main/edit-professor/${element.id}/${element.name}/${element.schedule}/${element.subjectName}`]);

  } 

}
