import { Component, OnInit, ViewChild } from '@angular/core';
import { SubjectService } from '../../../services/subject/subject.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatStepper } from '@angular/material';
import { Schedule } from '../../../classes/schedule';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css']
})
export class CreateSubjectComponent implements OnInit {
   //Forms
   generalForm: FormGroup;
   scheduleForm: FormGroup;
   isOptional = false;

   //Schedule
   schedule: string = "";
   types = [1,2]
   @ViewChild('stepper',{static: false}) stepper: MatStepper;

  constructor(
    private _subjectService: SubjectService, 
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _toast: ToastrService
    ) { }
 
  ngOnInit() {
    this.generalForm = this._formBuilder.group({
      name: ['', Validators.required],
      subjectType: ['', Validators.required],
      semester: ['', Validators.required],
      credits: ['', Validators.required]
      //tags: ['', Validators.required]
    });
    this.scheduleForm = this._formBuilder.group({
      schedule: ['', Validators.required]      //tags: ['', Validators.required]
    });
  }

  
  nextStep(){
    this.stepper.next();
  }

  prevStep(){
    this.stepper.previous();
  }

  addBlock(block: string){
    this.schedule =`${block},${this.schedule}`
  }

  rmBlock(block: string){
    let scheduleList = [];
    console.log('ANTES',this.schedule);

    this.schedule = this.schedule.substring(0,this.schedule.length-1);
    console.log('DESPUES',this.schedule);
    scheduleList = this.schedule.split(',');

    const index = scheduleList.indexOf(block);
    if (index >= 0) {
      scheduleList.splice(index, 1);
    }
    this.schedule ='';
    for(let i of scheduleList){
      this.schedule =`${i},${this.schedule}`
    }
  }

  hide(id: string, id2: string){
    console.log(id.substring(0,2));
    console.log(id2);
    var value = document.getElementById(id).style.visibility;
    let block = id.substring(0,2);
    console.log(value);
    console.log('TO HIDDEN');
    document.getElementById(id).hidden = true;
    document.getElementById(id2).hidden = false;
    let ho = id.substring(2);
    if(ho==='2'){
      this.addBlock(block);
    } else{
      this.rmBlock(block);
    }
    console.log(this.schedule);
  
  }

  createSubject(){
    if(this.generalForm.valid){
      this._subjectService.CreateSubject(
        {
          name: this.generalForm.get('name').value,
          schedule: this.schedule.substring(0,this.schedule.length-1),
          subject_type: this.generalForm.get('subjectType').value,
          credits: this.generalForm.get('credits').value,
          semester:  this.generalForm.get('semester').value
        }
      ).subscribe(
        response => {
          console.log(response)
            this._toast.success('', 'Materia Agreada!');
            this._router.navigate(['/main/subject']);
        },error => {
          console.log(error)
          this._toast.error('', 'Materia NO Agreada :(');
          this._router.navigate(['/main/subject']);
        });
    }else{
      this._toast.error('', 'Verifique los datos');
    }
  }
}
