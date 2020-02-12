import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class LoginService {

  
  headers: any;
  options: any;

  constructor(private http: HttpClient) {
    
  }

  login(username:string, password:string) {
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Accept', 'application/json');
      headers = headers.append('app', 'APP_BCK');
      headers = headers.append('password', password);
      let options = { headers: headers };
    //return this.http.put('https://dev.tuten.cl/TutenREST/rest/user/' + username, {},options); 
    
    return this.http.put<any>('https://dev.tuten.cl/TutenREST/rest/user/' + username, {}, options)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                console.log(user)
                if (user && user.sessionTokenBck) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}