import { Component, OnInit, ViewChild ,OnDestroy} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ToastrService } from 'ngx-toastr';
var ELEMENT_DATA: any = [];

@Component({
  selector: 'app-sendmailadminoffermail',
  templateUrl: './sendmailadminoffermail.component.html',
  styleUrls: ['./sendmailadminoffermail.component.css']
})
export class SendmailadminoffermailComponent implements OnInit {
  form: FormGroup;

  displayedColumns: string[] = ['select', 'position', 'Username', 'Location', 'PhoneNumber', 'EmailId', 'Address', 'createdon'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  pageEvent: any;
  userlist: any = [];
  arr2: any = [];
  userarray: any = [];
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor( public _formBuilder: FormBuilder,public loader: NgxSpinnerService, public api: ApiService, public toster: ToastrService, public dialog: MatDialog) { }
  events: string[] = [];
  firstFormGroup:any;
  arraymail:any=[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
    this.getalluser();
  }
  ngOnDestroy(){
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

  getalluser() {
    this.userarray.length = 0;
    this.loader.show();

    console.log("calling all user")
    this.api.allusers().then(res => {
      this.loader.hide();
      if (res['status'] == true) {
        if (res["Data"].length != this.userarray.length) {
          // console.log(res['Data'])
          res["Data"].forEach(element => {
            // console.log(element)
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
  sendmail(){
    this.loader.show();
    this.arraymail.length =0;
    this.arr2.forEach(async (element) => {      
      this.arraymail.push(element.emailid)
    });
    // console.log(this.firstFormGroup.value.subject)
    // console.log(this.firstFormGroup.value.message)
    // console.log(this.arraymail)
    let payload = {
      subject:this.firstFormGroup.value.subject,
      message:this.firstFormGroup.value.message,
      toarraymail:this.arraymail
    }
    if(this.firstFormGroup.value.subject == "" || this.firstFormGroup.value.message == "" || this.arraymail.length == 0){
      this.toster.error("Plz check the message or subject else select user","Status");
      this.loader.hide();
      return;
    }else{
      // console.log(payload)
      this.api.offermailtocustomer(payload).then(res =>{
        this.loader.hide();
        // console.log(res);
        if(res["status"] == true){

          this.toster.success(res["msg"],"Status");
          this.firstFormGroup.reset();
        }
      }).catch(e =>{
        this.loader.hide();
        console.log(e);
      })
    }
  }
}
