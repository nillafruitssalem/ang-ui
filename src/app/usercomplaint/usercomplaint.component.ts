import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usercomplaint',
  templateUrl: './usercomplaint.component.html',
  styleUrls: ['./usercomplaint.component.css']
})
export class UsercomplaintComponent implements OnInit {
  firstFormGroup: FormGroup;
  constructor(public api: ApiService, public loader: NgxSpinnerService, public toster: ToastrService, public _formBuilder: FormBuilder, public router: Router) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }


  sendcomplaint() {
    this.loader.show();
    if(this.firstFormGroup.value.fromid == null || this.firstFormGroup.value.toid == null){
      this.toster.error("Type to send complaint mail","Status")
      this.loader.hide();
      return;
    }
    this.firstFormGroup.value.fromid = sessionStorage.getItem("emailid");
    this.firstFormGroup.value.toid = "nillafruitssalem@gmail.com";
    this.api.complaintmail(this.firstFormGroup.value).then(result => {
      if(result["status"] == true){
        this.loader.hide();
        this.toster.success(result["msg"],"Mail send");
        this.clear();
      }
    }).catch(e => {
      console.log(e)
      this.loader.hide();
      this.toster.error(e["Error"],"Mail Was Not Sent");
    })
  }
  clear() {
    this.firstFormGroup.reset();
    this.firstFormGroup.value.subject = "";
    this.firstFormGroup.value.message = "";
    this.firstFormGroup.value.fromid = ""
    this.firstFormGroup.value.toid = ""
  }
}
