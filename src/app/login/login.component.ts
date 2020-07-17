import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  resetFormGroup: FormGroup;
  emailFormControl: any;
  // test: any = [];
  constructor(public api: ApiService, public loader: NgxSpinnerService, public toster: ToastrService, public _formBuilder: FormBuilder, public router: Router) { }

  ngOnInit(): void {

    // this.test = [{
    //   "name": "sriram",
    //   "description": "how are you guys"
    // },
    // {
    //   "name": "lakshmi raja",
    //   "description": "NO ONE IS HERE"
    // },
    // {
    //   "name": "srinath",
    //   "description": "india is my country all indian are my bother and sister i love my country and iam "
    // },
    // {
    //   "name": "govind",
    //   "description": "next i will come for my day"
    // }]
    // console.log(this.test)

    // var sentance = "the quick brown fox  jumped over the lazy dog";

    // var captilizationsentance = sentance[0].toUpperCase() + sentance.slice(1).toLowerCase();


    // console.log(captilizationsentance2(sentance),"arg")

    this.firstFormGroup = this._formBuilder.group({
      emailid: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.resetFormGroup = this._formBuilder.group({
      resetemailid: ['', Validators.required],
      resetpassword: ['', Validators.required],
      resetphonenumber: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      contactno: ['', Validators.required],
      location: ['', Validators.required],
      address: ['', Validators.required],

    });
  }

  captilizationsentance2 = (str) => {
    console.log(str[0].toUpperCase() + str.slice(1).toLowerCase())
    return str[0].toUpperCase() + str.slice(1).toLowerCase()
  }
  get f() { return this.firstFormGroup.controls; }
  ngOnDestroy() {
    window.location.reload();
  }

  clear() {
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
  }

  passwordreset() {
    this.loader.show();
    // console.log(this.resetFormGroup.value)
    let payload = {
      "emailid": this.resetFormGroup.value.resetemailid,
      "resetpassword": this.resetFormGroup.value.resetpassword,
      "phonenumber": this.resetFormGroup.value.resetphonenumber
    }
    this.api.allusersresetpassword(payload).then(result => {
      if (result != null) {
        // console.log(result)
        if (result["status"] == false) {
          this.loader.hide();
          this.toster.error("Password Reset UnSuccessfull", "Status")
        } else {

          this.loader.hide();
          this.toster.success("Password Reset Successfull", "Status")
        }
        this.resetFormGroup.reset();
      }
    }).catch(e => {
      console.log(e);
      // this.loader.hide();

    })
  }
  mytabselection(i) {
    // console.log(i, "data");
    if (i.index == 0) {
      this.firstFormGroup.reset();
      // console.log("cleaar1  ")
    }
    if (i.index == 1) {
      this.secondFormGroup.reset();
      // console.log("cleaar2  ")
    }

  }

  login() {
    this.loader.show();
    if (this.firstFormGroup.value.emailid == null || this.firstFormGroup.value.password == null) {
      this.toster.error("Check your credencials", "Error")
      this.loader.hide();
      return;
    }

    let payload = {
      emailid: this.firstFormGroup.value.emailid,
      password: this.firstFormGroup.value.password
    }
    this.api.login(payload).then(res => {
      console.log("res", res)
      if (res["status"] == false) {
        this.toster.error(res["msg"], "Error")
        this.loader.hide();
        this.clear();
        return;
      }

      if (res["status"] == true) {
        this.loader.hide();
        this.toster.success("login Successfull", "Status")
        this.clear();
        sessionStorage.setItem("token", res["token"]);
        sessionStorage.setItem("userid", res["Data"]["userid"]);
        sessionStorage.setItem("username", res["Data"]["username"]);
        sessionStorage.setItem("userrole", res["Data"]["userrole"]);
        sessionStorage.setItem("emailid", res["Data"]["emailid"]);
        if (res["Data"].userrole == "user") {
          this.router.navigate(['userhome'])
        }
        if (res["Data"].userrole == "admin") {
          this.router.navigate(['adminhome'])
        }
      }
    }).catch(e => {
      this.loader.hide();
      console.log("err", e)
    })
  }

  signup() {
    this.loader.show();

    if (this.secondFormGroup.value.username == null ||
      this.secondFormGroup.value.password == null ||
      this.secondFormGroup.value.email == null ||
      this.secondFormGroup.value.address == null ||
      this.secondFormGroup.value.contactno == null ||
      this.secondFormGroup.value.location == null) {
      this.toster.error("Make Sure Your Details", "Error")
      this.loader.hide();
      return;
    } else {


      let payload = {
        username: this.secondFormGroup.value.username,
        password: this.secondFormGroup.value.password,
        emailid: this.secondFormGroup.value.email,
        address: this.secondFormGroup.value.address,
        phonenumber: this.secondFormGroup.value.contactno,
        location: this.secondFormGroup.value.location
      }
      this.api.signup(payload).then(res => {
        console.log(res)
        if (res["status"] == true) {
          this.toster.success(res["msg"], "Status");
          this.loader.hide();
          this.clear();
        }
      }).catch(e => {
        this.loader.hide();
        console.log(e)
        // this.toster.success(res["msg"],"Status");
      })

    }

  }


}
