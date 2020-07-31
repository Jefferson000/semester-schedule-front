import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { ProfessorService } from '../../../services/professor/professor.service';
import { MatStepper, MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { SubjectService } from '../../../services/subject/subject.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-action-professor',
  templateUrl: './action-professor.component.html',
  styleUrls: ['./action-professor.component.css']
})
export class ActionProfessorComponent implements OnInit {

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
  //Schedule
  schedule: string = "";

  subjects = [];
  newSubjects = [];
  @ViewChild('subjectInput',{static: false}) subjectInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto',{static: false}) matAutocomplete: MatAutocomplete;
  @ViewChild('stepper',{static: false}) stepper: MatStepper;
  constructor(
    private _professorService: ProfessorService, 
    private _subjectService: SubjectService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
      this.generalForm = this._formBuilder.group({
      name: ['', Validators.required],
      subject: ['', Validators.required]
      //subjects: ['', Validators.required]
    });
    this.scheduleForm = this._formBuilder.group({
      schedule: ['', Validators.required]      //subjects: ['', Validators.required]
    });
    this.getSubject();
  }

  createProfessor(){
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
    this._professorService.CreateProfessor(
      {
        name: this.generalForm.get('name').value,
        schedule: this.schedule,
        subject_name: this.finalSubjects
      }
    ).subscribe(
      response => {
          this._toast.success('', 'Professor Agreado!');
          this._router.navigate(['/main/professor']);
      },error => {
        this._toast.error('', 'Professor NO Agreado :(');
        this._router.navigate(['/main/professor']);
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
