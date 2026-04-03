import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { LibAuthService } from '../auth-service';
import { HostAccount } from '../host-account';
import { User } from '../user';

@Component({
  selector: 'csui-unifiedlogin',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './unifiedlogin.html',
  styleUrl: './unifiedlogin.css',
})
export class Unifiedlogin implements OnInit {

  // whatsup: string = "";

  // readWhatsup(emmited: string){
  //   this.whatsup = emmited;
  // }
  loginForm!: FormGroup;
  submitted: boolean = false;
  loading: boolean = false; 
  ffsResponse!: {};
  resultyy: string = "";
  resultPP: string = "";



  returnUrl: string = "";
  errorMessage: string = "";

  externalQueryParams = {};// used for holding the return url


  constructor(
    private authService: LibAuthService,
    private router: Router, private activatedRoute: ActivatedRoute) {

    // authService.readFFs().subscribe(response => {
    //   this.ffsResponse = response;
    //   this.resultyy = response["result"];
    //   // return ()=>{};
    // })
  }

  ngOnInit() {

    // get param
    this.returnUrl = this.activatedRoute.snapshot.queryParams["returnUrl"];
    // alert(this.returnUrl)
    this.externalQueryParams = {returnUrl: this.returnUrl};


    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.loginForm.controls;
  }
 

  onSubmit() {

    this.submitted = true;
    this.errorMessage = "";

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    const username: string = (this.loginForm.value as User).username;

    this.authService.login(this.loginForm.value as User).subscribe({
      next: (response) => {
        // console.log("login nexty..."+(response as unknown as Map<string, string>));
        // console.log((response.body as  Map<string, string>));

        const officer: HostAccount = response.body as HostAccount;
        // console.log(officer);
        this.authService.saveOfficerToLocalStorage(officer);

      },
      error: (e) => {
        // alert(e.status)
        // console.log("login errors..."+e);
        this.loading = false;
        if (e.status == 403) {
          this.errorMessage = "Invalid username or password";
        } else if (e.status == 500) {
          this.errorMessage = "Problem connecting to server";
        } else {
          this.errorMessage = "Server not found";
        }
        console.error(e);

      },
      complete: () => {
        this.authService.setAuthenticated();
        this.authService.setUsername(username);
        this.loading = false;
        
        let nextPage = "";
        if(this.returnUrl){
          nextPage = this.returnUrl;
        }else{
          nextPage = "/app/tripoperator/dashboard";
        }

        this.router.navigate([nextPage], 
        { queryParams: { } }).then(result => {
          
        });


      }
    });



  }


}
