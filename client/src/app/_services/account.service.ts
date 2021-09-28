import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) { }

  // login(model: any) {
  //  return this.http.post(this.baseUrl + 'account/login', model)
  // }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: any) => {
        debugger
        const user = response;
        if (user) {
          this.setCurrentUser(user);
          // localStorage.setItem('user', JSON.stringify(user));
          // this.currentUserSource.next(user);
          // user.username = 'lisa';
          //console.log(this.currentUserSource.next(user));
        }
        debugger
      })
    )
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: any) => {
        debugger
        if (user) {
          this.setCurrentUser(user);
          this.currentUserSource.next(user);

        }

        //return  user;
      })
    )
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));

    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next();

  }

}
