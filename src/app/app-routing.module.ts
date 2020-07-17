import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AdminuserinfoComponent } from './adminuserinfo/adminuserinfo.component';
import { AdminproductinfoComponent } from './adminproductinfo/adminproductinfo.component';
import { AdminmeasureinfoComponent } from './adminmeasureinfo/adminmeasureinfo.component';
import { UserorderComponent } from './userorder/userorder.component';
import { UserhistoryComponent } from './userhistory/userhistory.component';
import { UsercomplaintComponent } from './usercomplaint/usercomplaint.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AdmintodayordersComponent } from './admintodayorders/admintodayorders.component';
import { LandinpageComponent } from './landinpage/landinpage.component';
import { SendmailadminoffermailComponent } from './sendmailadminoffermail/sendmailadminoffermail.component';


const routes: Routes = [
  {
    path: '',
    component: LandinpageComponent
  },
  {
    path: 'landing',
    component: LandinpageComponent
  },
  {
    path: 'login',
    component: LoginComponent,    
  },
  {
    path: 'adminsendoffermail',
    component: SendmailadminoffermailComponent,    
  },
  {
    path: 'admindashboard',
    component: AdmindashboardComponent,
    canActivate:[AuthGuard],
  },
  {
    path: 'adminuserinfo',
    component: AdminuserinfoComponent,
    canActivate:[AuthGuard],
  },
  {
    path: 'adminproductinfo',
    component:AdminproductinfoComponent,
    canActivate:[AuthGuard],
  },
  {
    path: 'adminmeasureinfo',
    component:AdminmeasureinfoComponent,
    canActivate:[AuthGuard],
  },
  {
    path: 'admintodayorder',
    component:AdmintodayordersComponent,
    canActivate:[AuthGuard],
  },
  {
    path: 'adminhome',
    component: AdminhomeComponent,
    canActivate:[AuthGuard],
  },
  {
    path: 'userhome',
    component: UserhomeComponent,
    canActivate:[AuthGuard],
  },
  {
    path: 'userdashboard',
    component: UserdashboardComponent,
    canActivate:[AuthGuard],
  },
  {
    path: 'userorder',
    component:UserorderComponent,
    canActivate:[AuthGuard],
  },
  {
    path: 'userhistory',
    component:UserhistoryComponent,
    canActivate:[AuthGuard],
  },
  {
    path: 'usercomplaint',
    component:UsercomplaintComponent,
    canActivate:[AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
