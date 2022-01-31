import { AccountService } from './../services/account.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter()

  model : any = {}

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  Register() {
    this.accountService.Register(this.model).subscribe(response => {

    }, error => console.log(error)
    )
    this.cancel();
  }

  cancel() {
    this.cancelRegister.emit()
  }

}
