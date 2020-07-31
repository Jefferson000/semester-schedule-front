import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessorService } from '../../../services/professor/professor.service';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatStepper, MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { SubjectService } from '../../../services/subject/subject.service';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-professor',
  templateUrl: './edit-professor.component.html',
  styleUrls: ['./edit-professor.component.css']
})
export class EditProfessorComponent implements OnInit {

  id: any;
  name: any;
  schedule: any;
  subject: any;
  isOptional = false;

  subjectCtrl = new FormControl();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredSubjects: Observable<string[]>;
  //MATCHIPS :V
  visible = true;
  selectable = true;
  removable = true;
   //Forms
  generalForm: FormGroup;
  scheduleForm: FormGroup;

  subjects = [];
  newSubjects = [];
  @ViewChild('subjectInput',{static: false}) subjectInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto',{static: false}) matAutocomplete: MatAutocomplete;
  @ViewChild('stepper',{static: false}) stepper: MatStepper;
  constructor(
    private _subjectService: SubjectService,
    private _Activatedroute:ActivatedRoute, 
    private _professorService: ProfessorService, 
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
    this.subject = this._Activatedroute.snapshot.paramMap.get("subject");
    console.log(this.subject);
    this.schedule = this._Activatedroute.snapshot.paramMap.get("schedule");
    console.log(this.schedule);
    this.generalForm = this._formBuilder.group({
      name: ['', Validators.required],
      subject: ['', Validators.required]
      //tags: ['', Validators.required]
    });
    this.scheduleForm = this._formBuilder.group({
      schedule: ['', Validators.required]      //tags: ['', Validators.required]
    });
    this.setValues();
    this.setNewSubjetcs();
  }

  setValues(){
    this.generalForm.setValue({
      name: this.name, 
      subject: this.subject
    });
    this.scheduleForm.setValue({
      schedule: this.schedule
    });

  }
  setNewSubjetcs(){
    this.newSubjects = this.subject.split(',');
  }

  editProfessor(){
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
    this.finalSubjects = '';
    for(let i of this.newSubjects){
      this.finalSubjects += `${i},`
    }
    this.finalSubjects = this.finalSubjects.substring(0,this.finalSubjects.length-1);
    this.schedule = this.schedule.substring(0,this.schedule.length-1);
    console.log(this.schedule);
    this._professorService.UpdateProfessor(
      {
        professor_id: this.id,
        name: this.generalForm.get('name').value,
        schedule: this.schedule,
        subject_name: this.finalSubjects
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
  getSubject(){
    this.subjects = [];
    this._subjectService.GetSubjects().subscribe(
        (response) => {
        
        for(let i of response.body.data){
          this.subjects.push(i.name)
        }
        this.setsubjectToSelect();
        console.log(this.subjects);
        },(error)  => {
          this._toast.error('', 'Muchas peticiones al mismo tiempo');//TODO
        }
    );
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // if ((value || '').trim()) {
    //   this.subjects.push(value.trim());
    // }
    
    // Reset the input value
    if (input) {
      input.value = '';
    }
    console.log(this.subjects);
    this.subjectCtrl.setValue(null);
  }

  remove(subject: string): void {
    const index = this.newSubjects.indexOf(subject);
    if (index >= 0) {
      this.newSubjects.splice(index, 1);
    }
  }

  finalSubjects = ''
  selected(event: MatAutocompleteSelectedEvent): void {

    this.newSubjects.push(event.option.viewValue);
    this.subjectInput.nativeElement.value = '';
    this.subjectCtrl.setValue(null);
    this.finalSubjects += `${event.option.viewValue},`
    this.generalForm.controls.subject.setValue(this.finalSubjects)
    console.log('GENERAL FORM',this.generalForm.controls.subject.value);
  }

  setsubjectToSelect(){
    console.log('setsubjectToSelect');
    this.filteredSubjects = this.subjectCtrl.valueChanges.pipe(
      startWith(null),
      map((subject: string | null) => subject ? this._filter(subject) : this.subjects.slice()));
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.subjects.filter(subject => subject.toLowerCase().indexOf(filterValue) === 0);
  }

}
