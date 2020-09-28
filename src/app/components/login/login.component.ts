import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ServiceService } from '../../services/service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  fail: boolean = false;
  loading: boolean = false;
  data;

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
    const md5 = new Md5();
    this.db
      .list('/user', (ref) =>
        ref.orderByChild('email').equalTo(this.userData.value.email)
      )
      .valueChanges()
      .subscribe((data) => {
        this.data = data;
        this.fail = true;
        for (var val of this.data) {
          if (
            val.email === this.userData.value.email &&
            val.password === this.userData.value.password
          ) {
            this.fail = false;
            this.service.login(
              md5.appendStr(val.email.concat(val.password)).end()
            );
            this.router.navigate(['']);
            break;
          }
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
    this.router.navigate(['registration']);
  }
  ngOnInit(): void {
    this.service.log();
  }
}
