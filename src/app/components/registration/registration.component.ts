import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  fail: boolean = false;
  loading: boolean = false;
  data: any;

  userData = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(8),
    ]),
  });

  constructor(
    public db: AngularFireDatabase,
    private router: Router,
    private service: ServiceService
  ) {}

  submit() {
    this.loading = true;
    this.db
      .list('/user', (ref) =>
        ref.orderByChild('email').equalTo(this.userData.value.email)
      )
      .valueChanges()
      .subscribe((data) => {
        this.data = data;
        for (var val of this.data) {
          if (val.email === this.userData.value.email) {
            this.fail = true;
            break;
          }
        }
        if (this.fail !== true) {
          this.db.list('/user').push({
            email: this.userData.value.email,
            password: this.userData.value.password,
          });
          this.router.navigate(['login']);
        }
        this.loading = false;
      });
  }

  get email() {
    return this.userData.get('email');
  }
  get password() {
    return this.userData.get('password');
  }

  goto() {
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
    this.service.log();
  }
}
