import { LocalStorageService } from './services/local-storage.service';
import { Component } from '@angular/core';
import { LanguageService } from './services/language.service';
import { environment } from 'src/environment/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'SGP.Dev';
  currentLanguage: string = '';
  env = environment;

  icons = [
    {
      name: 'github',
      link: this.env.links.github,
    },
    {
      name: 'linkedin',
      link: this.env.links.linkedin,
    },
    {
      name: 'mail',
      link: `mailto:${this.env.email}`,
      isEmail: true,
    },
  ];

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService
  ) {
    this.languageService.language.subscribe((language: string) => {
      if (language) {
        this.currentLanguage = language;
      } else {
        this.getBrowserLanguage();
      }
    });

    this.translate.setDefaultLang(this.env.fallback_language);
  }

  getBrowserLanguage() {
    let browserLang = this.translate.getBrowserLang();
    let languageSupported = this.checkIfLanguageExists(browserLang);

    if (browserLang && !languageSupported) {
      this.setLanguage(this.env.fallback_language);
    }

    if (browserLang && languageSupported) {
      this.setLanguage(browserLang);
    }
  }

  setLanguage(language: string) {
    this.languageService.set(language);
  }

  checkIfLanguageExists(language: string | undefined) {
    let availableLanguages = this.env.available_languages.map(
      (availableLanguages: any) => availableLanguages.acro
    );
    return availableLanguages.includes(language);
  }
}
