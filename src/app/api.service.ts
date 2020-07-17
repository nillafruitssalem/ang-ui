import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';
declare var require: any;
const aes256 = require('aes256');
var ENKEY = "9943835254@123$"


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public adminmenu: boolean;
  public usermenu: boolean;
  // public baseurl: String = "https://nillaapi2020.herokuapp.com";
  public baseurl: String = "http://localhost:3000";
  // version 2 
  // public baseurl: String = "https://nillaapi2020-v2.herokuapp.com";


  public headers_object = new HttpHeaders({
    'Content-Type': 'application/json',
    'access-token': sessionStorage.getItem("token")
  });
  public img_headers_object = new HttpHeaders({
    'access-token': sessionStorage.getItem("token")
  });
  constructor(public http: HttpClient, public router: Router) {
    window.addEventListener('storage', function (e) {
      if (e.newValue != e.oldValue) {
        this.sessionStorage.clear();
        router.navigate(['']);
      }
    })
  }

  islogin() {
    let token = sessionStorage.getItem("token");
    //  userrole = sessionStorage.getItem("userrole");
    if (token != "" && token != null && token != undefined) {
      //  this.menuhide = true;
      return true;
    }
    else {
      return false
    }
  }

  // all users
  allusers() {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseurl + "/allusers", { headers: this.headers_object }).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }
  // specific users
  oneusers(userid) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseurl + "/allusers/" + userid, { headers: this.headers_object }).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }

  // reset password
  allusersresetpassword(payload) {
    return new Promise((resolve, reject) => {
      this.http.put(this.baseurl + "/resetpassword", payload).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }

  // login
  login(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseurl + "/login", data).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })

  }
  public async encrypthash(data) {
    // console.log("Normal data for encrypt", data)    
    return new Promise((resolve, reject) => {
      let payload = {
        "data": aes256.encrypt(ENKEY, JSON.stringify(data))
      }
      resolve(payload);
    })
  }
  public async decrypthash(data) {
    // console.log("Normal data for decrypt", data)
    return new Promise((resolve, reject) => {
      resolve(JSON.parse(aes256.decrypt(ENKEY, data)));
    })
  }
  // signup
  signup(data) {
    return new Promise((resolve, reject) => {
      this.encrypthash(data).then(async hash => {
        // console.log(hash)
        this.http.post(this.baseurl + "/reguser", hash).subscribe(res => {
          resolve(res);
        }, err => {
          resolve(err);
        })
      })
    })
  }
  // all products
  allproducts() {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseurl + "/allproduct", { headers: this.headers_object }).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }
  // all products without jwt
  allproducts_withoutjwt() {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseurl + "/allproduct_withoutauth").subscribe(res => {
        this.decrypthash(res).then(async result => {          
          resolve(result);
        })
      }, err => {
        resolve(err);
      })
    })
  }
  // all measure units
  allunits() {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseurl + "/allmeasure", { headers: this.headers_object }).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }

  // add measure units  
  addunits(data) {
    let payload = {
      units: data
    }
    return new Promise((resolve, reject) => {
      this.http.post(this.baseurl + "/addmeasure", payload, { headers: this.headers_object }).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }
  // delete measure units  
  deleteunits(data) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.baseurl + "/deletemeasure/" + data, { headers: this.headers_object }).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }

  // add product
  addproduct(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseurl + "/addproduct", data, { headers: this.img_headers_object }).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }
  // update product
  updateproduct(payload, pid) {
    return new Promise((resolve, reject) => {
      this.http.put(this.baseurl + "/updateproduct/" + pid, payload, { headers: this.img_headers_object }).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }

  // delete product
  deleteproduct(data) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.baseurl + "/deleteproduct/" + data, { headers: this.headers_object }).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }
  // user order
  addorder(pid, data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseurl + "/addorder_user/" + pid, data, { headers: this.headers_object }).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }
  // add cart details
  userorderdetails() {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseurl + "/userorderdetails_cart/" + sessionStorage.getItem("userid"), { headers: this.headers_object }).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }

  // order history
  userorderhistory() {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseurl + "/orderhistory/" + sessionStorage.getItem("userid"), { headers: this.headers_object }).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }


  // pending order
  userpendingorder() {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseurl + "/pendingorder/" + sessionStorage.getItem("userid"), { headers: this.headers_object }).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }

  // conform cart details
  conformcart_details(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseurl + "/userorderdetails_cart_conformation/" + sessionStorage.getItem("userid"), data, { headers: this.headers_object }).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }

  // order cancel
  cancelorder(orderid) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseurl + "/usercancelorder/" + orderid, { headers: this.headers_object }).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }

  // show all order's from user to admin page
  getallorderforadmin(orderbydate) {
    // let fd = new Date();
    // let s = fd.getDate() + "-" + (fd.getMonth() + 1) + "-" + fd.getFullYear()
    return new Promise((resolve, reject) => {
      this.http.get(this.baseurl + "/allorderconformdetails/" + orderbydate, { headers: this.headers_object }).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }
  // send mail of order
  sendmail(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseurl + "/customerordermail/", data, { headers: this.headers_object }).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }
  // confimating custormer order by admin of nilla fruits
  conformorder(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseurl + "/conformorder/", data, { headers: this.headers_object }).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }
  // sending customer complaint
  complaintmail(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseurl + "/usercomplaintmail/", data, { headers: this.headers_object }).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }
  // sending offer mail customer
  offermailtocustomer(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseurl + "/sendoffermailtocustomer/", data, { headers: this.headers_object }).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }
  logout() {
    this.usermenu = false;
    this.adminmenu = false;
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
