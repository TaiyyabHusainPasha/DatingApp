import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user') || '{}').token
//   })
// }


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getMemmbers() {
    //return this.http.get<Member[]>(this.baseUrl + 'users',httpOptions)
    return this.http.get<Member[]>(this.baseUrl + 'users')

  }

  getMember(username:string){
    debugger
   // return this.http.get<Member>(this.baseUrl + 'users/' + username, httpOptions)
   var ch = this.http.get<Member>(this.baseUrl + 'users/' + username);
    return this.http.get<Member>(this.baseUrl + 'users/' + username)

  }
}


