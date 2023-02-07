import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private localStorage: LocalStorageService) {}

  private languageSource = new BehaviorSubject<String>('pt');
  language: any = this.languageSource.asObservable();

  setLanguage(language: string) {
    this.localStorage.set('lang', language);
    this.languageSource.next(language);
  }

  getLanguage() {
    let lang = this.localStorage.get('lang');

    if (lang) this.setLanguage(lang);
  }
}
