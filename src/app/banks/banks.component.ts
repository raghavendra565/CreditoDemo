import { environment } from './../../environments/environment';
import { Component, OnInit, HostListener} from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss']
})
export class BanksComponent implements OnInit {

  scrHeight:any;
  scrWidth:any;
  opened: boolean = true;
  countryData :  any;
  checked : any = false;
  flag1 :boolean;
  flag2 :boolean;
  flag3 : boolean;
  location : any = "india";
  amount: number;
  trans_locations : Array<any> = [];
  payment_transaction : boolean;
  intervalId: number;
  count : number = 0;
  subscription : Subscription;
  imageSelected : boolean;
  amountSelected : boolean;
  spinner: boolean;
  cards : boolean = true;
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
        console.log(this.scrHeight, this.scrWidth);
  }

  transact(){
    console.log(this.imageSelected);
    if(this.imageSelected == true){
      if(this.amount > 0){
        this.amountSelected = true;
        this.trans_locations.push({"amount":this.amount, "location": this.location});
        this.cards = false;
        this.spinner = true;
        console.log(this.trans_locations);
        if(this.trans_locations.length == 1){
          const source = interval(2000);
          this.subscription = source.subscribe(val => this.stopInterval());
          // this.intervalId = setInterval(this.stopInterval(), 1000);
        }
      }
      else {
        this.amountSelected = false;
      }
    }
    else{
      this.imageSelected = false;
    }
  }

  stopInterval() {
    this.count = this.count + 1;
    console.log(this.count);
    if(this.count <= 1) {
      this.cards = false;
      this.spinner = true;
    }
    else if(this.count > 1 && this.count < 4){
      this.payment_transaction = true;
      this.cards = true;
      this.spinner = false;
      this.flag1 = false;
      this.flag2 = false;
      this.flag3 = false;
      this.amount = null;
    }
    else{
      this.payment_transaction = false;
      this.subscription.unsubscribe();
    } 
    return ''
  }

  sidenavToggle(){
    if(this.opened == true) {
      this.opened = false;
    }
    else if(this.opened == false) {
      this.opened = true;
    }
  }

  imageclick(name: any){
    this.imageSelected = true;
    // var divToChange = document.getElementById(name);
    // console.log(name);
    if(name == "img1"){
      this.flag1 = true;
      this.flag2 = false;
      this.flag3 = false;
    }
    else if(name == "img2"){
      this.flag2 = true;
      this.flag1 = false;
      this.flag3 = false;
    }
    else if(name == "img3"){
      this.flag1 = false;
      this.flag2 = false;
      this.flag3 = true;
    }
  }

  constructor() {
    this.getScreenSize();
  }

  ngOnInit() {
  }

}
