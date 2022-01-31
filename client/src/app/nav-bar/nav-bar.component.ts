import { User } from './../models/User';
import { AccountService } from '../services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  model: any = {}
  user: any;

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"))
  }

  Login() {
    this.accountService.login(this.model).subscribe(response => {
    }, error => console.log(error))
  }

  Logout() {
    this.accountService.logout();
  }

}
