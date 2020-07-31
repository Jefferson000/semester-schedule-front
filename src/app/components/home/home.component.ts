import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private notification: ToastrService) { }

  ngOnInit() {
  }

  test(){
    this.showSuccess("hola mundo", "saludo");
    this.showError("hola mundo", "saludo");
  }

  showSuccess(message:string, expresion:string) {
    this.notification.success(message, expresion);
  }

  showError(message:string, expresion:string) {
    this.notification.error(message, expresion);
  }

}
