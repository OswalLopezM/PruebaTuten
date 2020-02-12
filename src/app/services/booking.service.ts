import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class BookingService {

  headers: any;
  options: any;

  constructor(private http: HttpClient) {
    
  }

  getList(email:string, currentUser) {
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Accept', 'application/json');
      headers = headers.append('app', 'APP_BCK');
      headers = headers.append('token', currentUser.sessionTokenBck);
      headers = headers.append('adminemail', currentUser.email);
      let options = { headers: headers };
    
    return this.http.get<any>('https://dev.tuten.cl/TutenREST/rest/user/'+email+'/bookings/?current=true', options)
            .pipe(map(response => {
                return response;
            }));
  }

}