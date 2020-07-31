import { Component, OnInit,ViewChild} from '@angular/core';
import { SubjectService } from '../../services/subject/subject.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Subject } from '../../classes/subject';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  ELEMENT_DATA: Subject[] = [];

  displayedColumns: string[] = ['name', 'credits','semester','subjetType','option'];
  dataSource = new MatTableDataSource<Subject>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(
    private _subjectService: SubjectService,
    private _router: Router,
    private _toast: ToastrService
    ) { }

  ngOnInit() {
    console.log('Estoy en Subect');
    this.getSubject();
  }

  getSubject(){
    this.ELEMENT_DATA = []
    this._subjectService.GetSubjects().subscribe(
        (response) => {
        console.log(response.body);
        for(let i of response.body.data){
          let subject = new Subject(i.subject_id,i.name,i.schedule,i.subject_type,i.semester,i.credits);
          this.ELEMENT_DATA.push(subject);
        }
        this.dataSource.data = this.ELEMENT_DATA;
        this.dataSource.paginator = this.paginator;
        },(error)  => {
          this._toast.error('', 'Muchas peticiones al mismo tiempo');//TODO
        }
    );
    console.log(this.ELEMENT_DATA);
  }

  onCreateSubject(){
    this._router.navigate(['/main/create-subject']);
  }

 
  onDeleteSubject(subject_id: any){
    console.log(subject_id);
    this._subjectService.DeleteSubject({
      subject_id
    }
    ).subscribe(
      (response) => {
        console.log(response);
        this.getSubject();
        this._toast.success('', 'Materia Eliminado!');//TODO
      },(error)  => {
        this._toast.error('', 'Materia NO Eliminado');//TODO
      }
  );
  }
  onEditSubject(element: any){
    console.log(element);
    this._router.navigate([`/main/edit-subject/${element.id}/${element.name}/${element.schedule}/${element.subjectType}/${element.credits}/${element.semester}`]);

  } 


}
