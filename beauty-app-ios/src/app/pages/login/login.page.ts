import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { AuthService } from './../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HeroService } from '../../services/hero.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public data: User = {
    email: null,
    password: null
  };
  public validate = false;
  constructor(
    private location: Location,
    private auth: AuthService,
    private toast: ToastService,
    private router: Router,
    private hero: HeroService
    ) { }

  ngOnInit() {
    if (this.hero.auth === true) {
      // this.location.back();
    }
  }
  login() {
    this.validate = true;
    this.auth.login(this.data)
    .subscribe((r: any) => {
      this.validate = false;
      if (r.ok) {
        this.clear();
        // this.storage.set('user', r.user);
        localStorage.setItem('user', JSON.stringify(r.user));
        localStorage.setItem('token', r.token);
        this.toast.success(r.message);
        this.hero.validateSession();
        if (r.user.admin === 1) {
          this.router.navigate(['/homeadmin']);
        } else {
          this.router.navigate(['/tabs/home']);
        }
      } else {
        this.toast.error(r.message);
      }
    });
  }
  clear() {
    this.data = {
      email: null,
      password: null
    };
  }
}
