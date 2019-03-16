import { environment } from './../../environments/environment';
import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss']
})
export class BanksComponent implements OnInit {

  diameter = 50;

  scrHeight: any;
  scrWidth: any;
  opened: boolean = true;
  countryData: any;
  checked: any = false;
  flag1: Array<boolean> = [];
  flag2: Array<boolean> = [];
  flag3: Array<boolean> = [];
  location: any = "india";
  amount: Array<number> = [];
  trans_locations: Array<any> = [];
  payment_transaction: Array<boolean> = [];
  intervalId: number;
  count: number = 0;
  subscription: Subscription;
  subscription2 : Subscription;
  imageSelected: Array<boolean> = [];
  amountSelected: Array<boolean> = [];
  spinner: Array<boolean> = [];
  // cards: boolean = true;
  defaultpin: number = 2222;
  enteredpin: number;
  checkPin: boolean;
  cashWithdrawalStatus: Array<any> = [{ 'money': null, 'pin': null, 'status': null, 'moneyEntered': null, 'cardSelected': null, 'validatePin': null }, { 'money': null, 'pin': null, 'status': null, 'moneyEntered': null, 'cardSelected': null, 'validatePin': null }]
  cash: Array<number> = [];
  deploy1 : Array<boolean> = [false, false, false, false, false, false];
  displayanimation1 : Array<any> = [true, true, true, true, true, true];

  deploy2 : Array<boolean> = [false, false, false, false, false, false];
  displayanimation2 : Array<any> = [true, true, true, true, true, true];
  
  constructor(public el: ElementRef) {
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    console.log(this.scrHeight, this.scrWidth);
  }

  getheight(ref: ElementRef) {
    console.log(ref)
    console.log(this.el.nativeElement.offsetHeight);
  }

  cashWithdrawal(index : number) {
    this.cashWithdrawalStatus[index]['cardSelected'] = this.imageSelected[index];
    if (this.cashWithdrawalStatus[index]['cardSelected'] == true) {
      this.cashWithdrawalStatus[index]['cardSelected'] = true;
      this.cashWithdrawalStatus[index]['money'] = this.cash[index];
      if (this.cashWithdrawalStatus[index]['money'] != null) {
        this.cashWithdrawalStatus[index]['moneyEntered'] = true;
        if (this.defaultpin == this.enteredpin) {
          this.cashWithdrawalStatus[index]['validatePin'] = true;
          const source = interval(2000);
          this.subscription = source.subscribe(val => this.stopInterval(index));
        }
        else if(this.enteredpin != null){
          this.cashWithdrawalStatus[index]['validatePin'] = false;
        }
      }
      else {
        this.cashWithdrawalStatus[index]['moneyEntered'] = false;
      }
    }
    else {
      this.cashWithdrawalStatus[index]['cardSelected'] = false;
    }
  }

  onlinePay(index: number) {
    console.log(this.imageSelected[index]);
    if (this.imageSelected[index] == true) {
      if (this.amount[index] > 0) {
        this.amountSelected[index] = true;
        this.trans_locations.push({ "amount": this.amount[index], "location": this.location });
        // this.cards = false;
        this.spinner[index] = true;
        console.log(this.trans_locations);
        // if (this.trans_locations.length == 1) {
          const source = interval(2000);
          this.subscription = source.subscribe(val => this.stopInterval(index));
          // this.intervalId = setInterval(this.stopInterval(), 1000);
        // }
      }
      else {
        this.amountSelected[index] = false;
      }
    }
    else {
      this.imageSelected[index] = false;
    }
  }

  stopInterval(index: number) {
    this.enteredpin = null;
    this.cashWithdrawalStatus[index] = { 'money': null, 'pin': null, 'status': null, 'moneyEntered': null, 'cardSelected': null, 'validatePin': null },{ 'money': null, 'pin': null, 'status': null, 'moneyEntered': null, 'cardSelected': null, 'validatePin': null };
    this.count = this.count + 1;
    console.log(this.count);
    if (this.count <= 1) {
      // this.cards = false;
      this.spinner[index] = true;
    }
    else if (this.count > 1 && this.count < 4) {
      this.payment_transaction[index] = true;
      // this.cards = true;
      this.spinner[index] = false;
      this.flag1[index] = false;
      this.flag2[index] = false;
      this.flag3[index] = false;
    }
    else {
      this.amount[index] = null;
      this.cash[index] = null;
      this.count = 0;
      this.imageSelected[index] = null;
      this.payment_transaction[index] = false;
      this.subscription.unsubscribe();
    }
    return ''
  }

  deploymodel1(index : number){
    const source = interval(5000);
    this.deploy1[index] = true;
    this.subscription = source.subscribe(val => this.stopIcici(index));
  }

  stopIcici(index : number){
    // this.deploy = false;
    this.displayanimation1[index] = false;
    this.deploymodel2(index + 1);
  }

  deploymodel2(index: number){
    const source = interval(10000);
    this.deploy1[index] = true;
    console.log("deploy1[1]", this.deploy1[1]);
    this.subscription2 = source.subscribe(val => this.stopHdfc(index));
  }

  stopHdfc(index: number){
    this.displayanimation1[index] = false;
  }

  deploymodel3(index : number){
    const source = interval(5000);
    this.deploy2[index] = true;
    this.subscription = source.subscribe(val => this.stopIcici1(index));
  }

  stopIcici1(index : number){
    // this.deploy = false;
    this.displayanimation2[index] = false;
    this.deploymodel4(index + 1);
  }

  deploymodel4(index: number){
    const source = interval(10000);
    this.deploy2[index] = true;
    console.log("deploy2[1]", this.deploy2[1]);
    this.subscription2 = source.subscribe(val => this.stopHdfc1(index));
  }

  stopHdfc1(index: number){
    this.displayanimation2[index] = false;
  }

  sidenavToggle() {
    if (this.opened == true) {
      this.opened = false;
    }
    else if (this.opened == false) {
      this.opened = true;
    }
  }

  imageclick(name: any, index: number) {
    this.imageSelected[index] = true;
    this.cashWithdrawalStatus[0]['cardSelected'] == true;
    // var divToChange = document.getElementById(name);
    // console.log(name);
    if (name == "img1") {
      this.flag1[index] = true;
      this.flag2[index] = false;
      this.flag3[index] = false;
    }
    else if (name == "img2") {
      this.flag2[index] = true;
      this.flag1[index] = false;
      this.flag3[index] = false;
    }
    else if (name == "img3") {
      this.flag1[index] = false;
      this.flag2[index] = false;
      this.flag3[index] = true;
    }
  }

  ngOnInit() {
  }

}
