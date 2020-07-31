import { Component, OnInit, ViewChild} from '@angular/core';
import { ClassroomService } from '../../services/classroom/classroom.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Classroom } from '../../classes/classroom';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {

  // displayedColumns: string[] = ['name', 'creation', 'rating', 'pricing','option'];
  // dataSource = new MatTableDataSource<Restaurant>(this.ELEMENT_DATA);
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  ELEMENT_DATA: Classroom[] = [];

  //Pagination
  displayedColumns: string[] = ['number', 'classroomType','capacity','option'];
  dataSource = new MatTableDataSource<Classroom>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  
  constructor(
    private _classroomService: ClassroomService,
    private _router: Router,
    private _toast: ToastrService
    ) { }

  ngOnInit() {
    console.log('Estoy en classroom')
    this.getClassrooms()
  }

  getClassrooms(){
    this.ELEMENT_DATA = [];
    this._classroomService.GetClassrooms().subscribe(
        (response) => {
        console.log(response.body);
        for(let i of response.body.data){
          let profesor = new Classroom(i.classroom_id,i.number,i.capacity,i.classroomType);
          this.ELEMENT_DATA.push(profesor);
        }
        this.dataSource.data = this.ELEMENT_DATA;
        this.dataSource.paginator = this.paginator;
        console.log(this.ELEMENT_DATA);
        },(error)  => {
          this._toast.error('', 'Muchas peticiones al mismo tiempo');//TODO
        }
    );
  }
  onAddClassroom(){
    this._router.navigate(['/main/create-classroom']);
  }

  onDeleteClassroom(classroom_id: any){
    console.log(classroom_id);
    this._classroomService.DeleteClassroom({
      classroom_id
    }
    ).subscribe(
      (response) => {
        console.log(response);
        this.getClassrooms();
        this._toast.success('', 'Aula Eliminado!');//TODO
      },(error)  => {
        this._toast.error('', 'Aula NO Eliminado');//TODO
      }
  );
    }
    onEditClassroom(element: any){
      console.log(element);
      //0
      
      this._router.navigate([`/main/edit-classroom/${element.id}/${element.number}/${element.classroomType}/${element.capacity}`]);
  
    } 
}
