import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from '../../../services/subject/subject.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.css']
})
export class EditSubjectComponent implements OnInit {
  id: any;
  name: any;
  credits: any;
  semester: any;
  schedule: any;
  subjectType: any;
  types = [1,2]

   //Forms
   generalForm: FormGroup;
   scheduleForm: FormGroup;
   //Schedule
   @ViewChild('stepper',{static: false}) stepper: MatStepper;
  constructor(
    private _Activatedroute:ActivatedRoute, 
    private _subjectService: SubjectService, 
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _toast: ToastrService
    ) { }


    ngOnInit() {
      console.log('En edit professor');
      this.id = this._Activatedroute.snapshot.paramMap.get("id");
      console.log(this.id);
      this.name = this._Activatedroute.snapshot.paramMap.get("name");
      console.log(this.name);
      this.credits = this._Activatedroute.snapshot.paramMap.get("credits");
      console.log(this.credits);
      this.schedule = this._Activatedroute.snapshot.paramMap.get("schedule");
      console.log(this.schedule);
      this.semester = this._Activatedroute.snapshot.paramMap.get("semester");
      console.log(this.semester);
      this.subjectType = this._Activatedroute.snapshot.paramMap.get("subjectType");
      console.log(this.subjectType);
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
      this.setValues();
    }
  
    setValues(){
      this.generalForm.setValue({
        name: this.name,
        credits: this.credits,
        semester: this.semester,
        subjectType: this.subjectType
      });
      this.scheduleForm.setValue({
        schedule: this.schedule
      });
  
    }
  
    editSubject(){
      let scheduleList = [];
      this.schedule = this.schedule.substring(0,this.schedule.length);
  
      scheduleList = this.schedule.split(',');
      console.log(scheduleList);
      scheduleList.reverse();
      scheduleList.sort();
      this.schedule ='';
      for(let i of scheduleList){
        if(!(i==='')){
          this.schedule =`${i},${this.schedule}`
        }
      }
      this.schedule = this.schedule.substring(0,this.schedule.length-1);
      console.log(this.schedule);
      this._subjectService.UpdateSubject(
        {
          subject_id: this.id,
          name: this.generalForm.get('name').value,
          schedule: this.schedule,
          credits: this.generalForm.get('credits').value,
          semester: this.generalForm.get('semester').value,
          subject_type: this.generalForm.get('subjectType').value
        }
      ).subscribe(
        response => {
            this._toast.success('', 'Materia Editado!');
            this._router.navigate(['/main/subject']);
        },error => {
          this._toast.error('', 'Materia NO Editado :(');
          this._router.navigate(['/main/subject']);
        });
    }
  
    nextStep(){
      console.log('NEXT STEP');
      this.stepper.next();
      let blocks = this.schedule.split(',');
      console.log(blocks);
      for(let i of blocks){
        let id1 = `${i}1`;
        let id2 = `${i}2`;
        document.getElementById(id2).hidden = true;
        document.getElementById(id1).hidden = false;
      }
      this.schedule = `${this.schedule},`
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
    
}
