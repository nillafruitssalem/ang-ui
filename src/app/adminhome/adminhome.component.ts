import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {
  public total_user_length: any;
  public total_products_length: any;
  public total_order_length: any;
  public total_units_length: any;

  constructor(public api: ApiService, public loader: NgxSpinnerService) { }
  

  ngOnInit(): void {
    this.totaltodayorders();
    this.totalusers();
    this.totalproducts();
    this.totalmeasureunits();
  }
  async totalusers() {
    this.total_user_length = 0;
    this.api.allusers().then(async result => {
      // console.log(result["Data"]);
      if (result["Data"] != undefined) {
        this.total_user_length = await result["Data"].length - 1;
      }
    }).catch(e => {
      console.log(e);
    })
  }
  async totalproducts() {
    this.api.allproducts().then(async result => {
      // console.log(result["Data"]);
      if (result["Data"] != undefined) {
        this.total_products_length = await result["Data"].length

      }
    }).catch(e => {
      console.log(e);
    })
  }
  async totaltodayorders() {
    let fd = new Date();
    let s = fd.getDate() + "-" + (fd.getMonth() + 1) + "-" + fd.getFullYear()
    this.api.getallorderforadmin(s).then(async result => {
      // console.log(result)
      if (result["Data"] != undefined) {
        this.total_order_length = await result["Data"].length

      }
    }).catch(e => {
      console.log(e)
    })
  }
  async totalmeasureunits(){
    this.api.allunits().then(async result =>{
      // console.log(result)
      if(result["Data"] != undefined){
        this.total_units_length = await result["Data"].length;
      }
    }).catch(e =>{
      console.log(e);
    })
  }
  ngOnDestroy() {
    window.location.reload();
  }
}
