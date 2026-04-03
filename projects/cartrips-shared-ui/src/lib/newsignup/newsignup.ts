import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, ValidatorFn, AbstractControl, ValidationErrors, FormControl, Validators } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Phonecodeobject } from '../../../authentication/phonecodeobject';
import { AuthService } from '../../../service/auth.service';
import { SetupService } from '../../../service/setup.service';
import { GlobalfooterComponent } from '../../globalfooter/globalfooter.component';
import { LoaderService } from '../../../service/loader-service';
import { HostAccount } from '../../../entities/host';

@Component({
  selector: 'app-newsignup',
  imports: [ReactiveFormsModule, RouterLink, GlobalfooterComponent],
  templateUrl: './newsignup.html',
  styleUrl: './newsignup.css',
})
export class Newsignup implements OnInit {

  requestPhoneForm!: FormGroup;
  verifyPhoneForm!: FormGroup;
  signupForm!: FormGroup;

  submitted: boolean = false;
  // loading: boolean = false;

  ffsResponse!: {};
  resultyy: string = "";
  resultPP: string = "";



  returnUrl: string = "";
  errorMessage: string = "";
  externalQueryParams = {};// used for holding the return url


  WARNING_STAGE: boolean = true;
  REQUESTPHONEVERIFICATION_STAGE: boolean = false;
  VERIFYPHONE_STAGE: boolean = false;
  CREATEACCOUNT_STAGE: boolean = false;

  phoneCodeOBJ!: Phonecodeobject;


  constructor(
    public loaderService: LoaderService,
    private setupService: SetupService,
    private authService: AuthService,
    private router: Router, private activatedRoute: ActivatedRoute) {


  }


  nigerianMobileValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      // Matches numbers starting with 7, 8, or 9 followed by 9 digits (Total 10)
      // Note: Use ^[789]\d{9}$ if the leading '0' is also omitted.
      const regex = /^[789]\d{9}$/;
      const isValid = regex.test(value);

      return isValid ? null : { invalidNaijaPhone: true };
    };
  }

  ngOnInit() {

    // get param
    this.returnUrl = this.activatedRoute.snapshot.queryParams["returnUrl"];
    this.externalQueryParams = { returnUrl: this.returnUrl };

    this.requestPhoneForm = new FormGroup({
      countrycode: new FormControl('+234', [Validators.required]),
      phone: new FormControl('', [Validators.required, this.nigerianMobileValidator()]),
    });

    this.verifyPhoneForm = new FormGroup({
      phonecode: new FormControl('', [Validators.required]),
      token: new FormControl('',),
      phone: new FormControl('',),
    });

    this.signupForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('',),
      password: new FormControl('', [Validators.required]),
      acceptterms: new FormControl(false,),
    });

  }

  get f() {
    return this.requestPhoneForm.controls;
  }

  get f2() {
    return this.verifyPhoneForm.controls;
  }

  get f3() {
    return this.signupForm.controls;
  }

  onSubmit() {

    this.submitted = true;
    this.errorMessage = "";

    if (this.requestPhoneForm.invalid) {
      return;
    }

    this.authService.requestPhoneCode(this.requestPhoneForm.value).subscribe({
      next: (response) => {
        // console.log("login nexty..."+(response as unknown as Map<string, string>));
        // console.log((response.body as  Map<string, string>));
        // const returnedValue: Map<string, string> = response as unknown as Map<string, string>;
        // let token = returnedValue.get("token");
        // let phone = returnedValue.get("phone");

        this.phoneCodeOBJ = response.body as Phonecodeobject;

        this.WARNING_STAGE = false;
        this.REQUESTPHONEVERIFICATION_STAGE = false;
        this.VERIFYPHONE_STAGE = true;
        this.CREATEACCOUNT_STAGE = false;

      },
      error: (e) => {
        // alert(e.status)
        // console.log("login errors..."+e);
        // this.loading = false;
        if (e.status == 409) {
          this.errorMessage = "An active account with this phone number alreaady exists";
        } else if (e.status == 500) {
          this.errorMessage = "A Server error occurred";
        } else {
          this.errorMessage = "Server not found";
        }
        console.error(e);

      },
      complete: () => {

      }
    });



  }

  onSubmitPhoneVerification() {

    this.submitted = true;
    this.errorMessage = "";

    if (this.verifyPhoneForm.invalid) {
      return;
    }

    // this.loading = true;

    // alert('a');
    // const username: string = (this.verifyPhoneForm.value as User).username;

    this.verifyPhoneForm.patchValue({ phone: this.phoneCodeOBJ.phone });
    this.verifyPhoneForm.patchValue({ token: this.phoneCodeOBJ.token });

    this.authService.verifyPhoneCode(this.verifyPhoneForm.value).subscribe({
      next: (response) => {
        console.log("verifyPhoneCode nexty..." + response);
        // console.log((response.body as  Map<string, string>));
        // const pco: Phonecodeobject = response.body as Phonecodeobject;
        // let token = pco.token;
        // let phone = pco.phone;



      },
      error: (e) => {
        // alert(e.status)
        // console.log("login errors..."+e);
        // this.loading = false;
        if (e.status == 404) {
          this.errorMessage = "The code is invalid";
        } else if (e.status == 500) {
          this.errorMessage = "A Server error occurred";
        } else {
          this.errorMessage = "Server not found";
        }
        console.error(e);

      },
      complete: () => {

        this.WARNING_STAGE = false;
        this.REQUESTPHONEVERIFICATION_STAGE = false;
        this.VERIFYPHONE_STAGE = false;
        this.CREATEACCOUNT_STAGE = true;

      }
    });

  }



  onSubmitCreateAccountForm() {

    this.signupForm.markAllAsTouched();

    this.submitted = true;
    this.errorMessage = "";

    if (this.signupForm.invalid) {
      return;
    }

    // this.loading = true;

    // alert('a');
    // const username: string = (this.verifyPhoneForm.value as User).username;

    this.signupForm.patchValue({ phone: this.phoneCodeOBJ.phone });
    this.signupForm.patchValue({ token: this.phoneCodeOBJ.token });

    this.authService.signupAfterPhoneVerification(this.signupForm.value).subscribe({
      next: (response) => {
        console.log("signupAfterPhoneVerification nexty..." + response);
        // console.log((response.body as  Map<string, string>));

        const officer: HostAccount = response.body as HostAccount;
        // console.log(officer);
        this.setupService.saveOfficerToLocalStorage(officer);
        // const pco = response.body as any;
        // let username = pco["username"];
        //persist the newly created username. the session has alreay been created on the server
        this.authService.setAuthenticated();
        this.authService.setUsername(officer.username);

      },
      error: (e) => {
        // alert(e.status)
        // console.log("login errors..."+e);
        // this.loading = false;
        if (e.status == 404) {
          this.errorMessage = "The code is invalid";
        } else if (e.status == 500) {
          this.errorMessage = "A Server error occurred";
        } else {
          this.errorMessage = "Server not found";
        }
        console.error(e);

      },
      complete: () => {
        // this.loading = false;

        //Log the user in with the just created account

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