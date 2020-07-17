import { Component, OnInit,OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatTableDataSource } from '@angular/material/table';
var ELEMENT_DATA = [];
@Component({
  selector: 'app-landinpage',
  templateUrl: './landinpage.component.html',
  styleUrls: ['./landinpage.component.css']
})
export class LandinpageComponent implements OnInit {
  public myarray: any = [];
  public myclearinterval:any;
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor(public api: ApiService, public loader: NgxSpinnerService) { }

  ngOnInit(): void {
    this.nojwtallproduct();
  }
ngOnDestroy(){
  window.location.reload();
clearInterval(this.myclearinterval)
}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  nojwtallproduct() {
    this.myarray.length = 0;
    this.loader.show();
    // this.myclearinterval= setInterval(() => {
      this.api.allproducts_withoutjwt().then(res => {
        // console.log(res)
        this.loader.hide();
        if (res["status"] == true) {
          if(res["Data"].length != this.myarray.length){
            res["Data"].forEach(element => {
              if (element.productqty != 0) {
                this.myarray.push(element)
              }
            });
            this.dataSource = new MatTableDataSource(this.myarray);
          }          
        }
      }).catch(e => {
        this.loader.hide();
        console.log(e)
      });      
    // }, 10000);
  }
}
