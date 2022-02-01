import { ToastrService } from 'ngx-toastr';
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

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  Register() {
    this.accountService.Register(this.model).subscribe(response => {
      this.cancel();
    }, error => {
      console.log(error)
      this.toastr.error(error.errors)
    })
  }

  cancel() {
    this.cancelRegister.emit()
  }

}
