import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  user: User;
  userForm;
  message = null;

  constructor(private router: Router,
              private authService: AuthService,
              private formBuilder: FormBuilder) {

  }

  ngOnInit() {

    this.user = new User();
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  onSubmit() {

    this.login();

  }

  login() {

    this.user.toModel(this.userForm.value);
    this.authService.logIn(this.user).then(
      auth => this.router.navigate(['/home']),
      error => {
        this.message = error.message;
      }
    );

  }

}
