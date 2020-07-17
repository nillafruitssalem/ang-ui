import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
  username:any
  constructor(public api:ApiService) { }

  ngOnInit(): void {
    setInterval(()=>{
      this.username  = sessionStorage.getItem("username")
    },3000)
  }
  logout(){
    this.api.logout();
  }

}
