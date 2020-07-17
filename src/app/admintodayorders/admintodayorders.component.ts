import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api.service';
// import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

import { NgxSpinnerService } from 'ngx-spinner';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ToastrService } from 'ngx-toastr';
var ELEMENT_DATA: any = [];
var ELEMENT_DATA2: any = [];

@Component({
  selector: 'app-admintodayorders',
  templateUrl: './admintodayorders.component.html',
  styleUrls: ['./admintodayorders.component.css']
})
export class AdmintodayordersComponent implements OnInit {
  form: FormGroup;
  public userlist: any = [];
  displayedColumns: string[] = ['select', 'position', 'productimage', 'productname', 'productqty', 'productunits', 'productrate', 'action', 'createdon'];
  displayedColumns2: string[] = ['position', 'UserId', 'View', 'UserName', 'Email', 'Contact', 'Onwards'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource2 = new MatTableDataSource(ELEMENT_DATA2);
  pageEvent: any;
  orderdetails: any = [];
  vieworderbyuser: any = [];
  public stopinterveal: any;
  public element;
  arr2: any = [];
  lastAction: string;
  dynamicemailid: any;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }
  constructor(public loader: NgxSpinnerService, public api: ApiService, public toster: ToastrService, public dialog: MatDialog) { }
  events: string[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    // getDate().toString().padStart(2, "0")
    let fd = new Date();
    let s = fd.getDate().toString().padStart(2, "0") + "-" + (fd.getMonth() + 1).toString().padStart(2, "0") + "-" + fd.getFullYear()
    // console.log(s,"date")
    this.getallorderforadminfun(s)
  }
  ngOnDestory() {
    window.location.reload();
  }
  onCheckboxChecked(event, element) {
    if (event.checked) {
      this.arr2.push(element);
    } else {
      let index = this.arr2.indexOf(element);
      if (index > -1) {
        this.arr2.splice(index, 1);
      }
    }
    // console.log(JSON.stringify(this.arr2));
  }

  prceedorder() {
    this.loader.show();
    let fd = new Date();
    let s = fd.getDate() + "-" + (fd.getMonth() + 1) + "-" + fd.getFullYear()
    let payload = {
      "order": this.arr2,
      "orderconformdate": s,
      "receivermailid": this.dynamicemailid

    }
    if (this.arr2.length == 0) {
      this.toster.error("need to select atleast one", "Status")
      this.loader.hide();
      return;
    }
    this.api.conformorder(payload).then(res => {
      // console.log("order confromirng", res);
      if (res["status"] == true) {
        // this.loader.hide();
        this.toster.success(res["msg"], 'Conformation Status')
        this.api.sendmail(payload).then(res => {
          // console.log("sendmail", res)
          if (res["status"] == true) {
            this.toster.info(res["msg"], 'Mail Status')
            this.arr2.length = 0;
            this.vieworderbyuser.length = 0;
            this.loader.hide();
            let fd = new Date();
            let s = fd.getDate() + "-" + (fd.getMonth() + 1) + "-" + fd.getFullYear()
            this.getallorderforadminfun(s)
          }
        }).catch(e => {
          this.loader.hide();
          console.log(e)
          this.toster.error(JSON.stringify(e), 'Error');
        })
      }
    }).catch(e => {
      this.loader.hide();
      console.log(e);
      this.toster.error(JSON.stringify(e), 'Error');
    })
  }
  starttoday() {
    this.toster.info("Looking for new Update","Status");
    this.orderdetails.length = 0;
    this.userlist.length = 0;
    let fd = new Date();
    let s = fd.getDate() + "-" + (fd.getMonth() + 1) + "-" + fd.getFullYear()
    this.stopinterveal = setInterval(() => {
      console.log("calling start")
      this.getallorderforadminfun(s)
    }, 10000)
  }
  stoptoday() {
    this.toster.success("Thank you, you have stop deal today","Status");
    console.log("calling stop ***")
    clearInterval(this.stopinterveal)
  }
  async getallorderforadminfun(orderdate) {
    this.toster.info("Getting records by date of "+orderdate,"Status");
    var temp;
    this.orderdetails.length = 0;
    this.userlist.length = 0;
    await this.api.getallorderforadmin(orderdate)
      .then(async res => {        
        let restemp1 = res;
        console.log(restemp1,"data from date")
        if (restemp1['status'] == true && restemp1["Data"].length != 0) {

          this.orderdetails = await restemp1["Data"]
          this.dataSource.paginator = this.paginator;
        }
      })
      .then(async () => {
        let arraywithDupilcateusers = [];
        this.orderdetails.map(element => {
          arraywithDupilcateusers.push(element.userid);
        })
        const distinctArray = arraywithDupilcateusers.filter((n, i) => arraywithDupilcateusers.indexOf(n) === i);

        // console.dir(distinctArray);
        distinctArray.map(async usersid => {

          // console.log(usersid)
           this.api.oneusers(await usersid)
            .then(async userdetails => {              
              // console.log(userdetails["Data"])
              this.userlist.push(await userdetails["Data"]);
              // console.log("userlist",this.userlist)
            })
            .catch(e => {
              console.log(e);
            })
        })
        // console.log(this.userlist)
        // this.dataSource2 = new MatTableDataSource(this.userlist);
      })
      .then(() => {
        // console.log(this.userlist)
        setTimeout(() => {
          this.dataSource2 = new MatTableDataSource(this.userlist);
          // console.log(this.dataSource2)
        }, 3000)
      })
      .catch(e => {
        console.log(e)
      })
  }

  vieworder(e) {
    // console.log(e)
    this.dynamicemailid = e.emailid;
    this.vieworderbyuser.length = 0;
    // console.log(e);
    this.orderdetails.forEach(element => {
      // console.log(element)
      if (element.userid == e.userid) {
        this.vieworderbyuser.push(element)
      }
    });
    // e.userid
    this.dataSource = new MatTableDataSource(this.vieworderbyuser);

  }

  convert(str) {    
    var date = new Date(str),
      mnth = (date.getMonth() + 1).toString().padStart(2, "0"),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }


  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    let a = this.convert(event.value)
    // let s = fd.getDate().toString().padStart(2, "0") + "-" + (fd.getMonth() + 1).toString().padStart(2, "0")
    // console.log(a,"seleted")
    this.getallorderforadminfun(a);

  }
}




// example
        // const arrayWithDuplicates = [1, 1, 2, 3, 4, 4, 4, 5, 1];
        // const distinctArray = arrayWithDuplicates.filter((n, i) => arrayWithDuplicates.indexOf(n) === i);
        // console.dir(distinctArray);