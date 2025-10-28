import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Form ,FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [NgClass, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin {

  router = inject(Router);
  private formBuilder = inject(FormBuilder);

  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberme: [false]
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

    this.router.navigate(['/u/dashboard']);
  }
}
