import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-signin',
  imports: [NgClass, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin {

  router = inject(Router);
  authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);

  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberme: [false]
  });

  /**
   *
   */
  constructor() { }

  doSignIn() {
    console.log(this.form.value);
    if (!this.form.valid) {
      return;
    }

    this.authService.signinWithEmailAndPassword(this.form.value.email, this.form.value.password).subscribe((signed) => {
      console.log(signed);
      this.router.navigate(['/u/dashboard']);
    });
  }

  doSigninWithGoogleRedirect() {
    this.authService.signinWithGoogleRedirect().subscribe((result) => console.log('signinWithGoogleRedirect => ', result));
  }

  doSignUp() {
    this.router.navigate(['/signup']);
  }
}
