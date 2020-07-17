import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from 'src/app.material';
import { LandinpageComponent } from './landinpage/landinpage.component';
import { AdminuserinfoComponent } from './adminuserinfo/adminuserinfo.component';
import { AdminproductinfoComponent } from './adminproductinfo/adminproductinfo.component';
import { AdminmeasureinfoComponent } from './adminmeasureinfo/adminmeasureinfo.component';
import { UserorderComponent } from './userorder/userorder.component';
import { UserhistoryComponent } from './userhistory/userhistory.component';
import { UsercomplaintComponent } from './usercomplaint/usercomplaint.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { DialogorderconfromComponent } from './dialogorderconfrom/dialogorderconfrom.component';
import { AdmintodayordersComponent } from './admintodayorders/admintodayorders.component';
import { SendmailadminoffermailComponent } from './sendmailadminoffermail/sendmailadminoffermail.component';
import { SentenceCapitializePipe } from './login/capitalizesentencepipe';

@NgModule({
  declarations: [
    AppComponent,
    UserdashboardComponent,
    AdmindashboardComponent,
    LoginComponent,
    LandinpageComponent,
    AdminuserinfoComponent,
    AdminproductinfoComponent,
    AdminmeasureinfoComponent,
    UserorderComponent,
    UserhistoryComponent,
    UsercomplaintComponent,
    UserhomeComponent,
    AdminhomeComponent,
    DialogorderconfromComponent,
    AdmintodayordersComponent,
    SendmailadminoffermailComponent,
    SentenceCapitializePipe
  ],
  exports:[
    SentenceCapitializePipe 
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      progressBar:true,
      tapToDismiss:true,
      progressAnimation:"increasing",
      disableTimeOut:false,      
    }),
    BrowserAnimationsModule,

  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogorderconfromComponent
  ],
  providers: [
    ApiService,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
