import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.scss']
})
export class TestErrorsComponent implements OnInit {

  baseUrl = 'https://localhost:44398/api/';
  validationErrors: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get404Errors() {
    this.http.get(this.baseUrl + 'Buggy/Not-Found').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }
  get500Errors() {
    this.http.get(this.baseUrl + 'Buggy/Server-Error').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }
  get401Errors() {
    this.http.get(this.baseUrl + 'Buggy/auth').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }
  get400Errors() {
    this.http.get(this.baseUrl + 'Buggy/Bad-Request').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }
  getValidationErrors() {
    this.http.post(this.baseUrl + 'Account/Register', {}).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
      this.validationErrors = error
    })
  }

}
