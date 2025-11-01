import { inject, Injectable } from '@angular/core';
import {
  Auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { getRedirectResult, UserCredential } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from '../app.config';
import { from, Observable, switchMap } from 'rxjs';
import { UserProfileDTO } from '../models/user-profile-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Injeta a instância do Firebase Auth usando o Token
  private auth: Auth = inject(FIREBASE_AUTH);
  private firestore = inject(FIREBASE_FIRESTORE);

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

  /**
   * Função para registrar um novo usuário com email e senha.
   * @param email O email do usuário.
   * @param password A senha do usuário.
   * @returns Um Observable da Promise do Firebase.
   */
  signup(email: string, password: string): Observable<UserCredential> {
    const promise = createUserWithEmailAndPassword(this.auth, email, password);
    return from(promise);
  }

  /**
   * 1. Salva os dados adicionais do usuário no Firestore.
   * @param uid O ID único do usuário (Auth UID).
   * @param profile Os dados do perfil do usuário a serem salvos.
   */
  private saveUserProfile(uid: string, profile: Partial<UserProfileDTO>): Observable<void> {
    // Define o caminho da coleção e usa o UID como ID do documento
    const userDocRef = doc(this.firestore, 'users', uid);

    // setDoc: Cria o documento se não existir ou substitui se existir
    const promise = setDoc(userDocRef, profile, { merge: true }); // Use merge: true para evitar sobrescrever campos acidentalmente
    return from(promise);
  }

  /**
   * 2. Função de registro que encadeia a criação no Auth e o salvamento no Firestore.
   */
  registerAndSaveUser(email: string, password: string, fullName: string): Observable<void> {
    // Passo A: Tenta criar o usuário no Firebase Auth
    return this.signup(email, password).pipe(
      // Passo B: Usa o switchMap para encadear a próxima operação APENAS se o registro for bem-sucedido
      switchMap((credential: UserCredential) => {
        const user = credential.user;
        const profileData: UserProfileDTO = {
          uid: user.uid,
          email: user.email!, // O email deve existir após o registro
          fullName: fullName,
          createdAt: new Date()
        };

        // Retorna o Observable para salvar os dados no Firestore
        return this.saveUserProfile(user.uid, profileData);
      })
    );
  }
}
