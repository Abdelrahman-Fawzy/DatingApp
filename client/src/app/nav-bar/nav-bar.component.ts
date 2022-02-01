import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { User } from './../models/User';
import { AccountService } from '../services/account.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  model: any = {}
  user: any;

  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"))
  }

  Login() {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/members')
    }, error => {
      console.log(error)
      this.toastr.error(error.error)
    })
  }

  Logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }

}
