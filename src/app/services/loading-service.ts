import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // BehaviorSubject armazena o estado atual (false por padrão)
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  // Observable público para que os componentes possam assinar
  public isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  constructor() { }

  /**
   * Ativa o estado de carregamento global.
   */
  showLoading(): void {
    if (!this.isLoadingSubject.value) {
      this.isLoadingSubject.next(true);
      console.log('Loading ON');
    }
  }

  /**
   * Desativa o estado de carregamento global.
   */
  hideLoading(): void {
    if (this.isLoadingSubject.value) {
      this.isLoadingSubject.next(false);
      console.log('Loading OFF');
    }
  }
}
