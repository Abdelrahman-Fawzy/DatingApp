import { Member } from './../models/member';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

const user = JSON.parse(localStorage.getItem("user"));

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
}

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'users')
  }

  getMemberByUserName(username: string) {
    return this.http.get<Member>(this.baseUrl + `users/${username}`)
  }

  getMemberByID(id: number) {
    return this.http.get<Member>(this.baseUrl + `users/userById/${id}`)
  }
}
