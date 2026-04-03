import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supportmessage } from './supportmessage';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LibNetworkService {

  constructor(private http: HttpClient) {

  }

  submitSupportMessage(formvalue: Supportmessage): Observable<any> {
    return this.http.post('/9go_interstate_service/api/v1/tripbooking/reportpassengerforatrip',
      formvalue, { withCredentials: true, observe: "response" });
  }

}
