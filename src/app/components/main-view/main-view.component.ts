import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ValidationComponent } from '../validation/validation.component';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  @ViewChild('mainDiv',{static: true}) mainDiv: ElementRef;
  constructor() { }

  innerRoutes = [
    //{ path: "/main/home", icon: "home", name: "Inicio" },
    { path: '/main/professor', icon: "perm_identity", name: "Profesor", },
    { path: '/main/subject', icon: "subject", name: "Materia", },
    { path: '/main/classroom', icon: "meeting_room", name: "Aula", },
    { path: '/main/info', icon: 'info', name:"Info" },
    { path: '/main/consult', icon: 'view_week', name:"Consulta#1"}
  ];
  ngOnInit() {
    let scriptAdim: HTMLScriptElement = document.createElement("script");
    scriptAdim.setAttribute("type", "text/javascript");
    scriptAdim.setAttribute("src", "../../assets/js/admin.js");
    scriptAdim.setAttribute("id", "adminjs");
    this.mainDiv.nativeElement.appendChild(scriptAdim);
  }

}
