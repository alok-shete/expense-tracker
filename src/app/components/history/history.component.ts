import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ServiceService } from '../../services/service.service';
declare var $: any; // ADD THIS
import * as $ from 'jquery';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  @Input() text: string;
  @Input() amount: string;
  @Input() type: string;
  @Input() key: string;
  @Input() date: any;

  constructor(
    private db: AngularFireDatabase,
    private service: ServiceService
  ) {}

  delete(key) {
    var user = this.service.getLogin();
    if (this.type === '+') {
      var type = 'Income';
    } else {
      var type = 'Expense';
    }
    var del = confirm(
      'Description: ' +
        this.text +
        '\nAmount: ' +
        this.amount +
        '\nType: ' +
        type +
        '\nAre you sure you want to delete?'
    );
    if (del) {
      this.db.database.ref(user).child(key).remove();
    }
  }
  ngOnInit(): void {
    $(document).ready(function () {
      $('[data-toggle="popover"]').popover();
    });
  }
}
