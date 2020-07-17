import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
var ELEMENT_DATA: any = [];
@Component({
  selector: 'app-adminuserinfo',
  templateUrl: './adminuserinfo.component.html',
  styleUrls: ['./adminuserinfo.component.css']
})
export class AdminuserinfoComponent implements OnInit {
  displayedColumns: string[] = ['position', 'username', 'location','phonenumber', 'emailid', 'useron', 'address'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  userarray: any = [];
  public myclearinterval: any;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(public api: ApiService, public loader: NgxSpinnerService, public toster: ToastrService) { }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit() {
    
    this.getalluser();
    this.dataSource.paginator = this.paginator;
    // this.tempload();
  }
  ngOnDestroy() {
    window.location.reload();
    // clearInterval(this.myclearinterval)
  }

  tempload(){
    window.location.reload();
  }
  getalluser() {
    this.userarray.length = 0;
    this.loader.show();

    // console.log("calling all user")
    this.api.allusers().then(res => {
      this.loader.hide();
      if (res['status'] == true) {
        if (res["Data"].length != this.userarray.length) {
          // console.log(res['Data'])
          res["Data"].forEach(element => {
            console.log(element)
            if (element.userrole == "user") {
              this.userarray.push(element)
            }
          });
          // ELEMENT_DATA = res['Data']
          this.dataSource = new MatTableDataSource(this.userarray);

        }

      }
    }).catch(e => {
      this.loader.hide();
      console.log(e)
    })
  }
}
