import { map } from 'rxjs/operators';
import { Member } from './../models/member';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

const user = JSON.parse(localStorage.getItem("user"));

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl = environment.apiUrl;
  members: Member[] = []

  constructor(private http: HttpClient) {
}

  getMembers() {
    if(this.members.length > 0) return of(this.members)
    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
      map(members => {
        this.members = members
        return members
      })
    )
  }

  getMemberByUserName(username: string) {
    const member = this.members.find(x => x.username = username)
    if(member !== undefined) return of(member)
    return this.http.get<Member>(this.baseUrl + `users/${username}`)
  }

  updateMember(member : Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member)
        this.members[index] = member;
      })
    )
  }
}
