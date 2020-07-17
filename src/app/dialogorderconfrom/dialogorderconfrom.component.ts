
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialogorderconfrom',
  templateUrl: './dialogorderconfrom.component.html',
  styleUrls: ['./dialogorderconfrom.component.css']
})
export class DialogorderconfromComponent implements OnInit {
 ordervalue:any=0;
  selecteddata: any;
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dat: any, public dialogRef: MatDialogRef<DialogorderconfromComponent>) {
    this.selecteddata = dat;
    // console.log(this.selecteddata, "selected one")
    // this.dialog.close('conform');
  }

  ngOnInit(): void {

  }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'qty';
    }

    return value;
  }

  closeDialog(i) {
    this.dialogRef.close({ requriedqty:this.ordervalue ,orderdetails:i });
  }
cancel(){
  this.ordervalue = 0;
  this.dialog.closeAll();
}
}
