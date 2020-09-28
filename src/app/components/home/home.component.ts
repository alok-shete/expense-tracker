import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ServiceService } from '../../services/service.service';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  a;
  data: any;
  key: any;
  new: any;
  loadNew: any;
  loading: boolean = true;
  user: string = this.service.getLogin();
  size: number = 0;
  keySize: number = 0;
  income: string = '0.00';
  expense: string = '0.00';
  remain: string = '0.00';
  tError: boolean = false;
  val: string;
  dText: string = '';
  dAmount: string = '';
  dType: string = null;
  title = 'Expense-tracker';
  load: number = 5;

  constructor(
    public db: AngularFireDatabase,
    private service: ServiceService
  ) {}

  getData() {
    if (this.user !== null) {
      this.db
        .list(this.user)
        .valueChanges()
        .subscribe((data) => {
          this.data = data;
          this.income = '0.00';
          this.expense = '0.00';
          this.size = 0;
          this.new = [];
          for (var val of this.data) {
            this.size = this.size + 1;
            if (val.type === '+') {
              this.income = this.income + '+' + val.amount;
            }
            if (val.type === '-') {
              this.expense = this.expense + '+' + val.amount;
            }
          }
          this.income = '' + eval(this.income).toFixed(2);
          this.expense = '' + eval(this.expense).toFixed(2);
          this.remain = this.income + '-' + this.expense;
          this.remain = '' + eval(this.remain).toFixed(2);
          this.new = Array(this.size)
            .fill(0)
            .map((x, i) => i);
          this.new = this.new.reverse();
          this.loading = false;
        });

      this.db
        .list(this.user)
        .snapshotChanges()
        .subscribe((keys) => {
          this.keySize = 0;
          this.key = keys;
          for (var j in this.key) {
            this.keySize += 1;
          }
        });
    }
  }

  loadMore() {
    if (this.size > this.load) {
      if (this.size <= this.load + 2) {
        this.load = this.size;
      } else {
        this.load += 2;
      }
    }
  }

  getUservalue(value) {
    if (
      value.text !== '' &&
      value.type !== null &&
      value.amount !== '' &&
      Math.abs(value.amount) !== 0
    ) {
      var d = new Date().toString();
      var data = {
        text: value.text,
        type: value.type,
        amount: Math.abs(value.amount),
        date: d,
      };
      this.db.list(this.user).push(data);
      this.tError = false;
      this.dText = '';
      this.dAmount = '';
      this.dType = null;
    } else {
      this.tError = true;
    }
  }

  logOut() {
    this.service.logOut();
  }

  ngOnInit(): void {
    if (this.service.logCheck()) {
      this.getData();
    }
  }
}
