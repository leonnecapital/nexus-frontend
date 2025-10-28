import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  
  router = inject(Router);
  private formBuilder = inject(FormBuilder);

  formSignUp: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    fullName: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  doSignUp() {
    console.log(this.formSignUp.value);
    if (!this.formSignUp.valid) {
      return;
    }

    this.router.navigate(['/plans']);
  }
}
