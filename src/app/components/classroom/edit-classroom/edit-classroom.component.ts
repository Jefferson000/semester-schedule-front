import { Component, OnInit } from '@angular/core';
import { ClassroomService } from '../../../services/classroom/classroom.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-classroom',
  templateUrl: './edit-classroom.component.html',
  styleUrls: ['./edit-classroom.component.css']
})
export class EditClassroomComponent implements OnInit {
  id: any;
  number: any;
  capacity: any;
  classroomType: any;

  generalForm: FormGroup;

  types = [1,2]

  constructor(
    private _Activatedroute:ActivatedRoute, 
    private _classroomService: ClassroomService, 
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _toast: ToastrService
    ) { }

  ngOnInit() {
    console.log('En edit classroom');
    this.id = this._Activatedroute.snapshot.paramMap.get("id");
    console.log(this.id);
    this.number = this._Activatedroute.snapshot.paramMap.get("number");
    console.log(this.number);
    this.capacity = this._Activatedroute.snapshot.paramMap.get("capacity");
    console.log(this.capacity);
    this.classroomType = this._Activatedroute.snapshot.paramMap.get("classroomType");
    console.log(this.classroomType);
    this.generalForm = this._formBuilder.group({
      number: ['', Validators.required],
      capacity: ['', Validators.required],
      classroomType: ['', Validators.required]
      //tags: ['', Validators.required]
    });
    this.setValues();
  }

  setValues(){
    this.generalForm.setValue({
      number: this.number, 
      capacity: this.capacity,
      classroomType: this.classroomType
    });
  }

  editProfessor(){
    this._classroomService.UpdateClassroom(
      {
        classroom_id: this.id,
        number: this.generalForm.get('number').value,
        capacity: this.generalForm.get('capacity').value,
        classroomType: this.generalForm.get('classroomType').value
      }
    ).subscribe(
      response => {
          this._toast.success('', 'Professor Editado!');
          this._router.navigate(['/main/professor']);
      },error => {
        this._toast.error('', 'Professor NO Editado :(');
        this._router.navigate(['/main/professor']);
      });
  }

}
