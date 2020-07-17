import { Component, OnInit, ViewChild ,OnDestroy} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
var ELEMENT_DATA: any = [];
var ELEMENT_DATA2: any = [];
var filesToUpload = "";
@Component({
  selector: 'app-adminproductinfo',
  templateUrl: './adminproductinfo.component.html',
  styleUrls: ['./adminproductinfo.component.css']
})
export class AdminproductinfoComponent implements OnInit {
  displayedColumns: string[] = ['position', 'productimage', 'productname', 'productqty', 'productunits', 'productrate', 'action', 'createdon'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource2 = new MatTableDataSource(ELEMENT_DATA2);
  pageEvent: any;
  firstFormGroup: FormGroup;
  public btnupdatecancel: Boolean;
  public btnadd: Boolean = true;
  public btnaddis: Boolean;
  public pname: any;
  public prate: any;
  public pqty: any;
  public units: any;
  public allunitsarray: any = [];
  public updatedata: any;
  public previewimage: any = "";

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;    
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }
  applyFilter2(event: Event) {    
    const filterValue2 = (event.target as HTMLInputElement).value;    
    this.dataSource2.filter = filterValue2.trim().toLowerCase();
  }
  constructor(public loader: NgxSpinnerService, public toster:ToastrService,public api: ApiService, public _formBuilder: FormBuilder, public dialog: MatDialog) { }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;paginator2: MatPaginator;
  

  ngOnInit() {
    this.getallproducts();
    this.allunits();
    this.firstFormGroup = this._formBuilder.group({
      pname: ['', Validators.required],
      prate: ['', Validators.required],
      pqty: ['', Validators.required],
      units: ['', Validators.required],
      fileupload: ['', Validators.required]
    });

  }
  ngOnDestroy(){
    window.location.reload();
  }
  choose(event) {
    filesToUpload = event.target.files[0];
  }
  getallproducts() {
    var lowstock = [];
    var array = [];
    this.loader.show();
    this.api.allproducts().then(res => {
      this.loader.hide();
      if (res['status'] == true) {
        // console.log(res['Data'])
        res['Data'].forEach(element => {
          if (element.productqty == 0) {
            lowstock.push(element);
          }
          if (element.productqty != 0) {
            array.push(element);
          }
        });
      }
    }).then(() => {
      // console.log(array)
      this.dataSource = new MatTableDataSource(array);
      this.dataSource2 = new MatTableDataSource(lowstock);
      // console.log(lowstock)
    }).catch(e => {
      this.loader.hide();
      console.log(e)
    })
  }
  deleteproduct(i) {
    this.loader.show();
    this.api.deleteproduct(i.productid).then(res => {
      console.log(res);
      this.loader.hide();
      if (res["status"] == true) {
        this.toster.success(res["msg"],"Status");
        this.getallproducts();
      }
    }).catch(e => {
      this.loader.hide();
      console.log(e);
    })
  }
  addproduct() {
    this.loader.show();
    this.btnaddis = true;
    if (this.firstFormGroup.value.pname == "" || this.firstFormGroup.value.pname == null &&
      this.firstFormGroup.value.prate == "" || this.firstFormGroup.value.prate == null &&
      this.firstFormGroup.value.units == "" || this.firstFormGroup.value.units == null &&
      this.firstFormGroup.value.pqty == "" || this.firstFormGroup.value.pqty == null &&
      filesToUpload == null || filesToUpload == "") {
      this.loader.hide();
      alert("Check all the controlls");
      this.btnaddis = false;
      // this.spinner.hide();
      return;
    } else {

      let payload = {
        productname: this.firstFormGroup.value.pname,
        productrate: this.firstFormGroup.value.prate,
        productqty: this.firstFormGroup.value.pqty,
        productunits: this.firstFormGroup.value.units
      }
      const formData = new FormData();
      formData.append('pdata', JSON.stringify(payload))
      formData.append('file', filesToUpload);
      this.api.addproduct(formData).then(res => {
        // console.log(res)
        this.loader.hide()
        if (res["status"] == true) {
          this.getallproducts();
          this.toster.success(res["msg"],"Status");
          this.btnaddis = false;
          this.cancel();
        }
      }).catch(e => {
        this.loader.hide();
        console.log(e)
        this.btnaddis = false;
      })
    }

  }
  updateproduct() {
    this.loader.show();
    let payload = {
      productname: this.firstFormGroup.value.pname,
      productrate: this.firstFormGroup.value.prate,
      productqty: this.firstFormGroup.value.pqty,
      productunits: this.firstFormGroup.value.units
    }
    const formData = new FormData();
    formData.append('pdata', JSON.stringify(payload))
    formData.append('file', filesToUpload);
    this.api.updateproduct(formData, this.updatedata.productid).then(res => {
      // console.log(res)
      this.loader.hide();
      if (res["status"] == true) {
        this.toster.success(res["msg"],"Status");
        this.getallproducts();
        this.cancel();
        this.btnaddis = false;
      }
    }).catch(e => {
      this.loader.hide();
      console.log(e)
      this.btnaddis = false;
    })
  }
  clickedit(e) {
    console.log(e);
    this.previewimage = e.productimage
    this.updatedata = e;
    this.btnadd = false;
    this.btnupdatecancel = true;
    this.pname = e.productname
    this.prate = e.productrate.$numberDecimal
    this.pqty = e.productqty
    this.units = e.productunits
  }
  allunits() {
    this.allunitsarray.length = 0;
    this.api.allunits().then(res => {
      // console.log(res)
      if (res["status"] == true) {
        this.allunitsarray = res["Data"]
      }
    }).catch(e => {
      console.log(e)
    })
  }
  cancel() {
    this.btnadd = true;
    this.btnupdatecancel = false;
    this.firstFormGroup.reset();
    filesToUpload = "";
    this.previewimage = "";
  }

}
