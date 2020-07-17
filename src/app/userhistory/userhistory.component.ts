import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-userhistory',
  templateUrl: './userhistory.component.html',
  styleUrls: ['./userhistory.component.css']
})
export class UserhistoryComponent implements OnInit {
  displayedColumns: string[] = ['position', 'productimage', 'productname', 'productqty', 'productrate', 'order status', 'orderid', 'orderon','sub total'];
  displayedColumns2: string[] = ['position', 'productimage', 'productname', 'productqty', 'productrate', 'order status', 'orderon' ,'sub total'];
  dataSource: any;
  dataSource2: any;
  pageEvent: any;
  totalcost: any = 0;
  public pending_order_array: any = [];
  public order_history_array: any = [];
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }
  constructor(public api: ApiService, public loader: NgxSpinnerService) { }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    this.orderhistory();
    this.pendingorder();
  }

  orderhistory() {
    this.loader.show();
    this.api.userorderhistory().then(res => {
      console.log("order history", res)
      this.loader.hide();
      if (res["status"] == true && res["Data"] != null) {
        res["Data"].forEach(element => {
          this.pending_order_array.push(parseFloat(element.orderproductrate.$numberDecimal))
        });
        this.dataSource2 = new MatTableDataSource(res["Data"]);
      }
    }).catch(e => {
      this.loader.hide();
      console.log(e)
    })
  }
  pendingorder() {
    this.loader.show();
    this.api.userpendingorder().then(res => {
      // console.log("pending", res)
      if (res["status"] == true && res["Data"] != null) {
        this.loader.hide();
        res["Data"].forEach(element => {
          // console.log(element)
          this.order_history_array.push(parseFloat(element.orderproductrate.$numberDecimal) * parseFloat(element.orderproductqty))
        });
        this.dataSource = new MatTableDataSource(res["Data"]);
      }
    }).then(() => {
      var sum = this.order_history_array.reduce(function (a, b) {
        return a + b;
      }, 0);
      this.totalcost = sum;
    }).catch(e => {
      this.loader.hide();

      console.log(e)
    })
  }


}
