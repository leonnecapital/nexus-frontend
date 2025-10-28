import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ɵInternalFormsSharedModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  
  router = inject(Router);
  private formBuilder = inject(FormBuilder);

  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    fullName: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  doSignUp() {
    console.log(this.form.value);
    if (!this.form.valid) {
      return;
    }

    this.router.navigate(['/plans']);
  }
}
