import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp } from 'firebase/app';

import { routes } from './app.routes';

// 1. Sua configuração do Firebase (API Keys, etc.)
const firebaseConfig = {
  apiKey: "AIzaSyAJlz7q_Sb1_ukmuQAa2NuV6hXgPZPSIXI",
  authDomain: "lcap-nexus.firebaseapp.com",
  projectId: "lcap-nexus",
  storageBucket: "lcap-nexus.firebasestorage.app",
  messagingSenderId: "288701725741",
  appId: "1:288701725741:web:1adf5823f4eb2f17168ca4",
  measurementId: "G-YFM30B5Y92"
};

// 2. Criação dos Tokens de Injeção
// Isso garante que você tenha tokens TypeScript para injetar o Firebase App e Auth
import { InjectionToken } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Token para o Firebase App (opcional, mas bom para consistência)
export const FIREBASE_APP = new InjectionToken('Firebase App', {
  providedIn: 'root',
  factory: () => initializeApp(firebaseConfig),
});

// Token para o Firebase Firestore (getFirestore precisa do app)
export const FIREBASE_FIRESTORE = new InjectionToken('Firebase Firestore', {
  providedIn: 'root',
  factory() {
    const app = inject(FIREBASE_APP);
    return getFirestore(app);
  },
})

// Token para o Firebase Authentication (getAuth precisa do app)
export const FIREBASE_AUTH = new InjectionToken('Firebase Auth', {
  providedIn: 'root',
  factory: () => {
    const app = initializeApp(firebaseConfig); // Inicializa aqui ou usa inject(FIREBASE_APP)
    return getAuth(app);
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
