import { inject, Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, signInWithEmailAndPassword, signOut, User, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { getRedirectResult, UserCredential } from 'firebase/auth';
import { FIREBASE_AUTH } from '../app.config';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Injeta a instância do Firebase Auth usando o Token
  private auth: Auth = inject(FIREBASE_AUTH);
  
  // Exemplo de como você pode expor o estado de autenticação como um Observable
  public user$: Observable<User | null>;

  constructor() {
    // Configura o observador de estado do usuário (muito importante!)
    this.user$ = new Observable<User | null>(observer => {
        return onAuthStateChanged(this.auth, (user) => {
            observer.next(user);
        });
    });
  }

  signinWithEmailAndPassword(email: string, password: string): Observable<any> {
    // Retorna um Observable da Promise de login do SDK nativo
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signinWithGoogleRedirect(): Observable<any> {
    // Implementação do login com Google aqui
    return from(signInWithRedirect(this.auth, new GoogleAuthProvider()));
  }

  signout(): Observable<void> {
    // Retorna um Observable da Promise de logout
    return from(signOut(this.auth));
  }

  /**
   * 2. Obtém o resultado do login após o retorno do redirecionamento.
   * Deve ser chamado ao carregar a página (ex: em um Guard ou no AppComponent).
   */
  getGoogleRedirectResult(): Observable<UserCredential | null> {
    // getRedirectResult retorna uma Promise com as credenciais ou null se não for um retorno de redirecionamento.
    return from(getRedirectResult(this.auth));
  }
}
