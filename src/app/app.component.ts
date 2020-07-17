import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ang9';
  public usermenuvar:boolean;
  public adminmenuvar:boolean;
  constructor(public api:ApiService){
    setInterval(()=>{
      this.checkmenustatus()
    },1000)
  }
  checkmenustatus(){
    let data = sessionStorage.getItem("userrole");
    if(data == "user"){
      this.api.usermenu = true;
      this.usermenuvar= this.api.usermenu;
    }
    if(data == "admin"){
      this.api.adminmenu= true;
      this.adminmenuvar= this.api.adminmenu;
    }
  }
}
