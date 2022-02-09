import { User } from './../models/User';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable()

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'Account/Login', model).pipe(
      map((response: User) => {
        const user = response;
        if(user) {
          localStorage.setItem("user", JSON.stringify(user))
          this.currentUserSource.next(user)
          console.log("uers", this.currentUser$.pipe(take(1)).subscribe(res => console.log("res", res)
          ));
        }
      })
    )
  }

  Register(model: any) {
    return this.http.post(this.baseUrl + 'Account/Register', model).pipe(
      map((user:User) => {
        if(user) {
          localStorage.setItem("user", JSON.stringify(user))
          this.currentUserSource.next(user)
        }
      })
    )
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem("user")
    this.currentUserSource.next(null)
  }
}
