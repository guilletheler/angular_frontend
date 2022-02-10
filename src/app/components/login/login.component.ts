import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Message } from 'primeng//api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = Object();
  public loginInvalid = false;
  private formSubmitAttempt = false;
  private returnUrl: string = '';

  msgs: Message[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onSubmit(): Promise<void> {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('username')?.value;
        const password = this.form.get('password')?.value;
        const loginSuccess = await this.authService.login(username, password);
        if (loginSuccess) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.loginInvalid = true;
        }
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.loginInvalid = true;
      this.formSubmitAttempt = true;
    }
  }

}
