import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogorderconfromComponent } from '../dialogorderconfrom/dialogorderconfrom.component';


@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  public myclearinterval: any;
  public myarray: any = [];
  constructor(public api: ApiService, public dialog: MatDialog, public loader: NgxSpinnerService, public toster: ToastrService) { }

  ngOnInit(): void {
    this.allproduct()
  }
  logout() {
    this.api.logout();
  }
  ngOnDestroy() {
    window.location.reload();
    clearInterval(this.myclearinterval)
  }

  order(d) {
    const dialogRef = this.dialog.open(DialogorderconfromComponent, {
      width: '350px',
      data: d
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result)      
      this.addorder(result.orderdetails.productid, result)
    })
  }
  addorder(pid, data) {
    this.loader.show();
    let payload = {
      "userid": sessionStorage.getItem("userid"),
      "orderqty": data.requriedqty
    }
    this.api.addorder(pid, payload).then(res => {
      this.loader.hide();
      this.allproduct();
      // console.log(res)
      if (res['status'] == true) {
        this.toster.success(res["msg"],"Status");
      }
    }).catch(e => {
      this.loader.hide();
      console.log(e)
      this.toster.error(e,"Status");
    })
  }
  allproduct() {
    this.loader.show();
    this.myarray.length = 0;
    // this.myclearinterval = setInterval(() => {
      this.api.allproducts().then(res => {
        this.loader.hide();
        // console.log(res)
        if (res["status"] == true) {
          if (res["Data"].length != this.myarray.length) {
            res["Data"].forEach(element => {
              // console.log(element)
              if (element.productqty != 0) {
                this.myarray.push(element)
              }
            });
          }
        }
      }).catch(e => {
        this.loader.hide();
        console.log(e)
      })
    // }, 5000)
  }

}
