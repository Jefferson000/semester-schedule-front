import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { HomeComponent } from './components/home/home.component';

import { HttpClientModule } from '@angular/common/http';

import {RouterModule} from '@angular/router';
import {ROUTES} from './app.routing';
import { ProfessorComponent } from './components/professor/professor.component';
import { ClassroomComponent } from './components/classroom/classroom.component';
import { SubjectComponent } from './components/subject/subject.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
//import {MatAutocompleteModule } from '@angular/material/autocomplete';
// import {MatTooltipModule } from '@angular/material/tooltip';
// import {MatPaginatorModule } from '@angular/material/paginator';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule, MatTooltipModule, MatChipsModule, MatPaginatorModule, MatNativeDateModule, MatAutocompleteModule, MatTableModule, MatStepperModule, MatInputModule, MatSelectModule } from '@angular/material';
import { ActionProfessorComponent } from './components/professor/action-professor/action-professor.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProfessorComponent } from './components/professor/edit-professor/edit-professor.component';
import { SeeProfessorComponent } from './components/professor/see-professor/see-professor.component';
import { ValidationComponent } from './components/validation/validation.component';
import { CreateClassroomComponent } from './components/classroom/create-classroom/create-classroom.component';
import { EditClassroomComponent } from './components/classroom/edit-classroom/edit-classroom.component';
import { CreateSubjectComponent } from './components/subject/create-subject/create-subject.component';
import { EditSubjectComponent } from './components/subject/edit-subject/edit-subject.component';
import { ConsultComponent } from './components/consult/consult.component';

@NgModule({
  declarations: [
    AppComponent, 
    MainViewComponent,
    HomeComponent,
    ProfessorComponent,
    ClassroomComponent,
    SubjectComponent,
    ScheduleComponent,
    ActionProfessorComponent,
    EditProfessorComponent,
    SeeProfessorComponent,
    ValidationComponent,
    CreateClassroomComponent,
    EditClassroomComponent,
    CreateSubjectComponent,
    EditSubjectComponent,
    ConsultComponent
    ], 
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    // ButtonModule,
    //MatPaginatorModule,
    // MatTooltipModule,
    //MatAutocompleteModule, 
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatChipsModule,
    MatNativeDateModule,
    MatAutocompleteModule, 
    MatTableModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false
    }),
    RouterModule.forRoot(ROUTES),
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
