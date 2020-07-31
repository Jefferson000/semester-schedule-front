import {Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component"
import {MainViewComponent} from "./components/main-view/main-view.component"
import { ProfessorComponent } from './components/professor/professor.component';
import { SubjectComponent } from './components/subject/subject.component';
import { ClassroomComponent } from './components/classroom/classroom.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ActionProfessorComponent } from './components/professor/action-professor/action-professor.component';
import { EditProfessorComponent } from './components/professor/edit-professor/edit-professor.component';
import { Component } from '@angular/core';
import { CreateClassroomComponent } from './components/classroom/create-classroom/create-classroom.component';
import { EditClassroomComponent } from './components/classroom/edit-classroom/edit-classroom.component';
import { CreateSubjectComponent } from './components/subject/create-subject/create-subject.component';
import { EditSubjectComponent } from './components/subject/edit-subject/edit-subject.component';
import { ValidationComponent } from './components/validation/validation.component';
import { ConsultComponent } from './components/consult/consult.component';

export const ROUTES : Routes = [
    {
        path: '', redirectTo: 'main', pathMatch: 'full'
    },
    {
      path: 'main', component: MainViewComponent, children: [
     // {path: 'home', component: HomeComponent},
      {path: 'professor', component: ProfessorComponent},
      {path: 'subject', component: SubjectComponent},
      {path: 'classroom', component: ClassroomComponent},
      {path: 'schedule', component: ScheduleComponent},
      {path: 'action-professor', component: ActionProfessorComponent},
      {path: 'edit-professor/:id/:name/:schedule/:subject', component: EditProfessorComponent},
      {path: 'create-classroom', component: CreateClassroomComponent},
      {path: 'edit-classroom/:id/:number/:classroomType/:capacity', component: EditClassroomComponent},
      {path: 'create-subject', component: CreateSubjectComponent},
      {path: 'edit-subject/:id/:name/:schedule/:subjectType/:credits/:semester', component: EditSubjectComponent},
      {path: 'info', component: ValidationComponent},
      {path: 'consult', component: ConsultComponent}
    ]
  },
  {
    path: '**', redirectTo: 'main'
  }
];
