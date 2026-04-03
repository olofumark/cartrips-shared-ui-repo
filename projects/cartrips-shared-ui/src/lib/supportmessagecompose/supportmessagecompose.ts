import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Supportmessage } from '../supportmessage';
import { LibNetworkService } from '../lib-network-service';

@Component({
  selector: 'csui-supportmessagecompose',
  imports: [ReactiveFormsModule],
  templateUrl: './supportmessagecompose.html',
  styleUrl: './supportmessagecompose.css',
})
export class Supportmessagecompose implements OnInit {

  supportmessage: Supportmessage = new Supportmessage();
  supportmessagecomposeForm!: FormGroup;

  @Output()
  alerts = new EventEmitter<string>();

  constructor(private formbuilder: FormBuilder, private libNetworkService: LibNetworkService) {

  }

  ngOnInit(): void {
    this.supportmessagecomposeForm = this.formbuilder.group<Supportmessage>(this.supportmessage!);
  }

  get f() {
    return this.supportmessagecomposeForm.controls;
  }


  onSubmitReport() {

    this.supportmessagecomposeForm.markAllAsTouched();

    if (this.supportmessagecomposeForm.invalid) {
      this.alerts.emit("Invalid form");
      // this.toastService.show("Invalid response", "Select the specific policy violation and write a brief incident report");
      return;
    }

    //We simply
    const formvalue: Supportmessage = (this.supportmessagecomposeForm.getRawValue() as Supportmessage);

    // console.log("console.log============>>> "+this.newTripOperatorForm.value);
    console.log("console.log============>>> " + formvalue.customertype);
    console.log("console.log============>>> " + formvalue.message);
    console.log("console.log============>>> " + formvalue.operatorid);
    console.log("console.log============>>> " + formvalue.subject);
    console.log("console.log============>>> " + formvalue.userid);

    this.libNetworkService.submitSupportMessage(formvalue).subscribe({
      next: (response) => {
        // this.toastService.show("Thank you!", "Your report has been submitted and is being treated");
      },
      error: (e) => {
        // alert(e.status)
        // console.log("login errors..."+e);
        /*if (e.status == 403) {
          this.errorMessage = "Unauthorized user!";
          this.router.navigate(['/login'], { queryParams: { returnUrl: this.returnUrl } });
        } else if (e.status == 500) {
          this.errorMessage = "Problem connecting to server";
        } else {
          this.errorMessage = "Something went wrong with your request";
        }

        this.toastService.show("Error", this.errorMessage);*/
        console.error(e);

      },
      complete: () => {
        
        // setTimeout(()=> {
        //   let nextPage = "";
        //   if (this.returnUrl) {
        //     nextPage = this.returnUrl;
        //   } else {
        //     nextPage = "/app/tripoperator/bookings";
        //   }
  
        //   this.router.navigate([nextPage],
        //     { queryParams: {} }).then(result => {
  
        //     });
        // }, 5000)

      }
    });



  }


}
