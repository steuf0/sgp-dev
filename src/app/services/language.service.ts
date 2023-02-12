import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(
    private localStorage: LocalStorageService,
    private translate: TranslateService
  ) {
    this.get();
  }

  private languageSource = new BehaviorSubject<String>('');
  language: any = this.languageSource.asObservable();

  set(language: string) {
    this.localStorage.set('lang', language);
    this.translate.use(language);
    this.languageSource.next(language);
  }

  get() {
    let lang = this.localStorage.get('lang');

    if (lang) {
      this.set(lang);
    }
  }
}
