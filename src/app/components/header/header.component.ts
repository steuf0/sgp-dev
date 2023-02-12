import { LanguageService } from 'src/app/services/language.service';
import { Component } from '@angular/core';

import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  env = environment;
  currentLanguage: string = '';

  constructor(
    private languageService: LanguageService
  ) {
    this.languageService.language.subscribe(
      (language: string) => (this.currentLanguage = language)
    );
  }

  setLanguage(language: string) {
    this.languageService.set(language);
  }
}
