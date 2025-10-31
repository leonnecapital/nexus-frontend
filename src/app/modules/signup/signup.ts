import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  router = inject(Router);
  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);
  errorMessage: string | null = null;

  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    fullName: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  doSignUp() {
    console.log(this.form);
    this.errorMessage = null;
    
    if (!this.form.valid) {
      return;
    }

    const { fullName, email, password } = this.form.value;

    this.authService.registerAndSaveUser(email, password, fullName).subscribe({
      next: (result) => {
        console.log('signup => ', result);
        this.router.navigate(['/plans']);
      },
      error: (error) => {
        console.log('signup error => ', error);
        // Tratamento de erro (ex: email já em uso, senha fraca)
        console.error('Erro de registro:', error.code, error.message);
        // Exibe uma mensagem de erro amigável ao usuário
        this.errorMessage = this.mapFirebaseError(error.code);
      }
    });
  }

  // Função auxiliar para mapear códigos de erro do Firebase para mensagens amigáveis
  private mapFirebaseError(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'O email fornecido já está em uso.';
      case 'auth/weak-password':
        return 'A senha deve ter pelo menos 6 caracteres.';
      case 'auth/invalid-email':
        return 'O formato do email é inválido.';
      default:
        return 'Erro ao tentar registrar. Tente novamente.';
    }
  }
}
