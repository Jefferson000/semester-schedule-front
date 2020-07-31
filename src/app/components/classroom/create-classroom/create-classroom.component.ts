import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ClassroomService } from '../../../services/classroom/classroom.service';

@Component({
  selector: 'app-create-classroom',
  templateUrl: './create-classroom.component.html',
  styleUrls: ['./create-classroom.component.css']
})
export class CreateClassroomComponent implements OnInit {

  types = [1,2]
  constructor(
    private _classroomService: ClassroomService, 
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _toast: ToastrService
    ) { }
   //Forms
   generalForm: FormGroup;

  ngOnInit() {
    this.generalForm = this._formBuilder.group({
    number: ['', Validators.required],
    capacity: ['', Validators.required],
    classroomType: ['', Validators.required]
    //tags: ['', Validators.required]
  });
}

  onCreateClassroom(){
    console.log('Esta,ps');
    if(this.generalForm.valid){
      this._classroomService.CreateClassroom(
        {
          number: this.generalForm.get('number').value,
          capacity: this.generalForm.get('capacity').value,
          classroomType: this.generalForm.get('classroomType').value
        }
      ).subscribe(
        response => {
          console.log(response)
            this._toast.success('', 'Aula Agreada!');
            this._router.navigate(['/main/classroom']);
        },error => {
          console.log(error)
          this._toast.error('', 'Aula NO Agreada :(');
          this._router.navigate(['/main/classroom']);
        });
    }else{
      this._toast.error('', 'Verifique los datos');
    }
  }

}
