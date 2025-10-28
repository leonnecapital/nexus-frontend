import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Form ,FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [NgClass, ReactiveFormsModule, FormsModule],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin {

  router = inject(Router);
  private formBuilder = inject(FormBuilder);

  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  formSignUp: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    fullName: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  /**
   *
   */
  constructor() {}

  doSignIn() {
    console.log(this.form.value);
    if (!this.form.valid) {
      return;
    }

    this.router.navigate(['/dashboard']);
  }

  doSignUp() {
    console.log(this.form.value);

    if (!this.formSignUp.valid) {
      return;
    }

    this.router.navigate(['/plans']);
  }
}
