import { Component, OnInit, ViewChild ,OnDestroy} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'; import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

var ELEMENT_DATA: any = [];

@Component({
  selector: 'app-adminmeasureinfo',
  templateUrl: './adminmeasureinfo.component.html',
  styleUrls: ['./adminmeasureinfo.component.css']
})
export class AdminmeasureinfoComponent implements OnInit {
  displayedColumns: string[] = ['position', 'units', 'createdon', 'delete'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  pageEvent: any;
  firstFormGroup: FormGroup;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(public loader:NgxSpinnerService,public toster:ToastrService,public api: ApiService, public _formBuilder: FormBuilder) { }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit(): void {
    this.allunits();
    this.firstFormGroup = this._formBuilder.group({
      punits: ['', Validators.required]
    });
  }
  ngOnDestroy(){
    window.location.reload();
  }
  addunits() {        
    this.loader.show();
    if(this.firstFormGroup.value.punits == ""){
      this.toster.error("Enter the Measures","Status");
      this.loader.hide();
      return;
    }
    this.api.addunits(this.firstFormGroup.value.punits).then(res => {
      // console.log(res)
      this.loader.hide();
      if (res["status"] == true) {
        this.toster.success(res["msg"],"Status");
        this.allunits();
        this.firstFormGroup.reset();
      }
    }).catch(e => {
      this.loader.hide();
      console.log(e)
    })
  }
  delete(i) {  
    this.loader.show();  
    this.api.deleteunits(i.unitsid).then(res => {
      // console.log(res)
      this.loader.hide();
      if (res["status"] == true) {
        this.toster.success(res["msg"],"Status");
        this.allunits();
      }
    }).catch(e => {
      this.loader.hide();
      console.log(e);

    })
  }
  allunits() {
    this.loader.show();
    this.api.allunits().then(res => {
      this.loader.hide();      
      this.dataSource = new MatTableDataSource(res["Data"]);
    }).catch(e => {
      this.loader.hide();
      console.log(e)
    })
  }
}
