import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StringConstants } from './string-constants';
import { Authorities } from './authorities';
import { HostAccount } from './host-account';
import { User } from './user';
import { Otpobject } from './otpobject';
// import { LIBRARY_CONFIG } from './library-config';



@Injectable({
  providedIn: 'root',
})
export class LibAuthService {

  // private readonly app_config = inject(LIBRARY_CONFIG);
  private readonly app_config = {
    apiUrl: "apiUrl",

  };


  authenticated!: string;

  user: any = {};

  constructor(private http: HttpClient, private router: Router,
    //  private loginComponent: LogindialogComponent
  ) {
    // this.app_config = inject(LIBRARY_CONFIG);
  }

  showLoginModal() {
    // this.loginComponent.openDialog();
  }

  saveOfficerToLocalStorage(officer: HostAccount) {
    localStorage.setItem(StringConstants.OFFICER_DATA, JSON.stringify(officer));
  }

  getOfficerFromLocalStorage(): HostAccount {
    const officerString = localStorage.getItem(StringConstants.OFFICER_DATA);
    if (officerString != null) {
      // console.log("OfficerString:: "+officerString);
      const officer: HostAccount = JSON.parse(officerString);
      // console.log("Officer Avatar:: "+officer.avatar);
      return officer;
    }
    return new HostAccount(-1);
  }

  isAdmin(): boolean {
    const userObject = localStorage.getItem(StringConstants.OFFICER_DATA);
    if (userObject == null) {
      return false;
    }
    const officer = JSON.parse(userObject) as HostAccount;
    // console.log("The Officer::>>>> "+userObject);
    return this.getRoleFromAuthorities(officer.authorities, "ADMIN");
  }

  getRoleFromAuthorities(authorities: Authorities[], role: String): boolean {
    for (var a = 0; a < authorities.length; a++) {
      const auth = authorities[a];
      if (auth.authority == role) {
        return true;
      }
    }
    return false;
  }

  clearStorage() {
    this.deleteAllCookies();
    localStorage.clear();

  }

  /**
 * Deletes all cookies by setting their expiration date to a past date.
 */
  deleteAllCookies(): void {
    const cookies = document.cookie.split(';');

    for (const cookie of cookies) {
      const cookieName = cookie.split('=')[0].trim();
      if (cookieName) {
        // Set the cookie's expiration to a past date to delete it
        document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      }
    }
  }


  setAuthenticated() {
    localStorage.setItem(StringConstants.AUTHENTICATED, "YES");
  }

  setUserid(username: string) {
    localStorage.setItem(StringConstants.USERID, username);
  }

  getUserid() {
    return localStorage.getItem(StringConstants.USERID);
  }

  setUsername(username: string) {
    localStorage.setItem(StringConstants.USERNAME, username);
  }

  getUsername() {
    return localStorage.getItem(StringConstants.USERNAME);
  }

  removeAuthenticated() {
    localStorage.removeItem(StringConstants.AUTHENTICATED);
  }


  isAuthenticated(): boolean {
    if (localStorage.getItem(StringConstants.AUTHENTICATED) == null) {
      return false;
    }
    return true;
  }

  authenticate() {
    this.http.get('/user').subscribe(response => {
      this.user = response;
      if (this.user.name) {
        this.setAuthenticated();
      } else {
        this.removeAuthenticated();
      }
      return () => { };
    });

  }

  //http://localhost:8080
  // readFFs(): Observable<any> {
  //   return this.http.get(environment.apiUrl + '/auth/ffs', { withCredentials: true });
  // }

  // readGuardedFFs(): Observable<any> {
  //   return this.http.get(environment.apiUrl + '/api/ffs', { withCredentials: true, params: {} });
  // }

  // login(user: User): Observable<any> {
  requestPhoneCode(phone: any) {

    const headers = new HttpHeaders(
      {
        // "Authorization": 'Basic ' + btoa(user.username + ':' + user.password),
        // "Access-Control-Allow-Origin": '*',
        // 'Content-Type': 'application/json',
        // 'Access-Control-Allow-Credentials': 'true',
        //         'Access-Control-Allow-Headers': 'Content-Type',
        // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        // "X-Requested-With" : 'XMLHttpRequest',
      }
    );

    return this.http.post(this.app_config.apiUrl + '/signup/requestPhoneCode',
      // {"username":"Admin1", "password":"password"},
      phone,
      { headers: headers, withCredentials: false, observe: "response" });

  }

  verifyPhoneCode(token: any) {

    const headers = new HttpHeaders(
      {
        // "Authorization": 'Basic ' + btoa(user.username + ':' + user.password),
        // "Access-Control-Allow-Origin": '*',
        // 'Content-Type': 'application/json',
        // 'Access-Control-Allow-Credentials': 'true',
        //         'Access-Control-Allow-Headers': 'Content-Type',
        // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        // "X-Requested-With" : 'XMLHttpRequest',
      }
    );

    return this.http.post(this.app_config.apiUrl + '/signup/verifyPhoneCode',
      // {"username":"Admin1", "password":"password"},
      token,
      { headers: headers, withCredentials: false, observe: "response" });

  }

  signupAfterPhoneVerification(user: User) {
    const headers = new HttpHeaders(
      {
        // "Authorization": 'Basic ' + btoa(user.username + ':' + user.password),
        // "Access-Control-Allow-Origin": '*',
        // 'Content-Type': 'application/json',
        // 'Access-Control-Allow-Credentials': 'true',
        //         'Access-Control-Allow-Headers': 'Content-Type',
        // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        // "X-Requested-With" : 'XMLHttpRequest',
      }
    );

    // user.username = "Olofua";

    return this.http.post(this.app_config.apiUrl + '/signup/createNewAccount',
      user,
      { headers: headers, withCredentials: false, observe: "response" });
  }


  // login(user: User): Observable<any> {
  login(user: User) {

    const headers = new HttpHeaders(
      {
        // "Authorization": 'Basic ' + btoa(user.username + ':' + user.password),
        // "Access-Control-Allow-Origin": '*',
        // 'Content-Type': 'application/json',
        // 'Access-Control-Allow-Credentials': 'true',
        //         'Access-Control-Allow-Headers': 'Content-Type',
        // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        // "X-Requested-With" : 'XMLHttpRequest',
      }
    );

    return this.http.post(this.app_config.apiUrl + '/auth/login',
      // {"username":"Admin1", "password":"password"},
      user,
      { headers: headers, withCredentials: false, observe: "response" });

  }

  login_new(user: User) {
    const headers = new HttpHeaders(
      {
        // "Authorization": 'Basic ' + btoa(user.username + ':' + user.password),
        // "Access-Control-Allow-Origin": '*',
        // 'Content-Type': 'application/json',
        // 'Access-Control-Allow-Credentials': 'true',
        //         'Access-Control-Allow-Headers': 'Content-Type',
        // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        // "X-Requested-With" : 'XMLHttpRequest',
      }
    );

    return this.http.post(this.app_config.apiUrl + '/auth/login_new',
      // {"username":"Admin1", "password":"password"},
      user,
      { headers: headers, withCredentials: false, observe: "response" });

  }


  validateOTP(otp: Otpobject) {

    const headers = new HttpHeaders(
      {
        // "Authorization": 'Basic ' + btoa(user.username + ':' + user.password),
        // "Access-Control-Allow-Origin": '*',
        // 'Content-Type': 'application/json',
        // 'Access-Control-Allow-Credentials': 'true',
        // 'Access-Control-Allow-Headers': 'Content-Type',
        // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        // "X-Requested-With" : 'XMLHttpRequest',
      }
    );

    return this.http.post(this.app_config.apiUrl + '/auth/validateotp',
      otp, { headers: headers, withCredentials: false, observe: "response" }
    );

  }

  logOut() {
    // this.http.post('logout', {}).finally(() => {
    //     this.authService.userIsLoggedIn = false;
    //     this.router.navigateByUrl('/');
    // }).subscribe();

    //finally was replaced with finalize in rxjs 6+
    /*this.http.post(environment.apiUrl + '/auth/logout', {}).pipe(
      finalize(() => {
        this.clearStorage();
        this.router.navigateByUrl('/');
      })).subscribe();*/

    const headers = new HttpHeaders(
      {
        // "Authorization": 'Basic ' + btoa(user.username + ':' + user.password),
        // "Access-Control-Allow-Origin": '*',
        // 'Content-Type': 'application/json',
        // 'Access-Control-Allow-Credentials': 'true',
        //         'Access-Control-Allow-Headers': 'Content-Type',
        // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        // "X-Requested-With" : 'XMLHttpRequest',
      }
    );

    return this.http.post(this.app_config.apiUrl + '/auth/logout', {},
      { headers: headers, withCredentials: false, observe: "response" });

  }
}
