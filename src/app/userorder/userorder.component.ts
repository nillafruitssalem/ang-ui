import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-userorder',
  templateUrl: './userorder.component.html',
  styleUrls: ['./userorder.component.css']
})
export class UserorderComponent implements OnInit {

  displayedColumns: string[] = ['position', 'productimage', 'productname', 'productqty', 'productrate', 'subtotal', 'remove', 'proceed', 'orderon'];
  dataSource: any;
  pageEvent: any;
  totalcost: any = 0;
  public order_array: any = [];
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(public loader: NgxSpinnerService, public toster: ToastrService, public api: ApiService, public _formBuilder: FormBuilder, public dialog: MatDialog) { }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.orderdet();

  }
  ngOnDestroy() {
    window.location.reload();
  }
  orderdet() {
    this.order_array.length = 0;
    this.loader.show();
    this.api.userorderdetails().then(res => {
      // console.log(res)
      if (res != null) {
        if (res["status"] == true) {
          this.loader.hide();
          this.dataSource = new MatTableDataSource(res["Data"]);
          res["Data"].forEach(element => {
            // console.log(element)
            this.order_array.push(parseFloat(element.orderproductrate.$numberDecimal) * parseFloat(element.orderproductqty))
          });
        }
      }
    }).then(async () => {
      var sum = this.order_array.reduce(function (a, b) {
        return a + b;
      }, 0);
      this.totalcost = sum;
      // console.log(sum); 
    }).catch(e => {
      this.loader.hide();
      console.log(e)
    })
  }
  conformorder(i) {
    // console.log(i)
    let payload = {
      "orderid": i.orderid
    }
    this.api.conformcart_details(payload).then(res => {
      // console.log(res);
      if (res["status"] == true && res != null) {
        this.toster.success(res["msg"], "Status");

        this.orderdet();
      }
    }).catch(e => {
      console.log(e)
    })
  }
  cancelorder(data) {
    this.loader.show();
    this.api.cancelorder(data.orderid).then(res => {
      this.loader.hide();
      this.orderdet();
      this.sumofgrandtotal();
      // console.log(res)
      this.toster.success(res["msg"], "Status");
    }).catch(e => {
      this.loader.hide();
      console.log(e)
    })
  }

  async sumofgrandtotal() {
    var sum = this.order_array.reduce(function (a, b) {
      return a + b;
    }, 0);
    this.totalcost = sum;
    // console.log(sum);    
  }

}
