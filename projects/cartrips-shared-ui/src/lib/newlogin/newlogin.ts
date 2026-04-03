import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HostAccount } from '../host-account';
import { User } from '../user';
import { LibAuthService } from '../auth-service';
import { Otpobject } from '../otpobject';
import { LoaderService } from '../services/loader-service';
import { AppToastService } from '../services/app-toast.service';

@Component({
  selector: 'app-newlogin',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './newlogin.html',
  styleUrl: './newlogin.css',
})
export class Newlogin implements OnInit {


  loginForm!: FormGroup;
  otpForm!: FormGroup;

  submitted: boolean = false;
  // loading: boolean = false;
  ffsResponse!: {};
  resultyy: string = "";
  resultPP: string = "";

  LOGIN_STAGE: boolean = true;
  OTP_STAGE: boolean = false;



  returnUrl: string = "/";
  errorMessage: string = "";

  externalQueryParams = {};// used for holding the return url


  constructor(
      public loaderService: LoaderService,
    private authService: LibAuthService, private toastService: AppToastService,
    private router: Router, private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef) {

    // authService.readFFs().subscribe(response => {
    //   this.ffsResponse = response;
    //   this.resultyy = response["result"];
    //   // return ()=>{};
    // })
  }

  ngOnInit() {

    // get param
    this.returnUrl = this.activatedRoute.snapshot.queryParams["returnUrl"];

    this.externalQueryParams = { returnUrl: this.returnUrl };

    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.otpForm = new FormGroup({
      otp: new FormControl('', [Validators.required]),
      otp_2fatoken: new FormControl('', [Validators.required]),
      channel: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

  }

  get f() {
    return this.loginForm.controls;
  }

  get f2() {
    return this.otpForm.controls;
  }


  // onReadGuarded() {
  //   this.authService.readGuardedFFs().subscribe(response => {
  //     this.resultPP = response["result"];
  //   })
  // }



  onSubmit() {

    this.submitted = true;
    this.errorMessage = "";

    if (this.loginForm.invalid) {
      return;
    }

    // this.loading = true;

    const currentUser: User = (this.loginForm.value as User);
    const username: string = currentUser.username;

    this.authService.login_new(this.loginForm.value as User).subscribe({
      next: (response) => {

        // console.log("login nexty..."+(response as unknown as Map<string, string>));
        // console.log((response.body as  Map<string, string>));
        const otp2fa: Otpobject = response.body as Otpobject;
        this.otpForm.patchValue({otp_2fatoken: otp2fa.otp_2fatoken});
        this.otpForm.patchValue({channel: otp2fa.channel});
        this.otpForm.patchValue({username: username});
        this.otpForm.patchValue({password: currentUser.password});
        this.cdr.markForCheck();

      },
      error: (e) => {
        // alert(e.status)
        // console.log("login errors..."+e);
        // this.loading = false;
        if (e.status == 403) {
          this.errorMessage = "Invalid username or password";
        } else if (e.status == 412) {
          this.errorMessage = "This account has requested too many logins recently. please wait 30 mins and try again";
        }else if (e.status == 500) {
          this.errorMessage = "A Server error occurred";
        } else {
          this.errorMessage = "Server not found";
        }
        this.toastService.show("Error", this.errorMessage);
        console.error(e);

        this.cdr.markForCheck();

      },
      complete: () => {
        // this.loading = false;
        this.LOGIN_STAGE = false;
        this.OTP_STAGE = true;
        this.cdr.markForCheck();


      }
    });

  }

  onSubmitOTP() {

    if (this.otpForm.invalid) {
      return;
    }

    // this.loading = true;

    const username: string = (this.otpForm.value as User).username;

    this.authService.validateOTP(this.otpForm.value as Otpobject).subscribe({
      next: (response) => {
        
        const officer: HostAccount = response.body as HostAccount;
        this.authService.saveOfficerToLocalStorage(officer);
        this.cdr.markForCheck();

      },
      error: (e) => {

        // alert(e.status)
        // console.log("login errors..."+e);

        // this.loading = false;
        if (e.status == 400) {
          this.errorMessage = "Invalid OTP";
        }else if (e.status == 429) {
          this.errorMessage = "Too many wrong trials. this account is now under restriction. try again in 30 minutes";
        } else if (e.status == 500) {
          this.errorMessage = "A Server error occurred";
        } else {
          this.errorMessage = "Server not found";
        }
        console.error(e);
        this.toastService.show("Error", this.errorMessage);
        
        this.cdr.markForCheck();


      },
      complete: () => {
        this.authService.setAuthenticated();
        this.authService.setUsername(username);
        // this.loading = false;

        let nextPage = "";
        if (this.returnUrl) {
          nextPage = this.returnUrl;
        } else {
          nextPage = "/";
        }

        this.router.navigateByUrl(nextPage);
      }
    });
  }


}
