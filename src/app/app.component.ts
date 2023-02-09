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
    private translate: TranslateService,
    private localStorage: LocalStorageService
  ) {
    this.languageService.language.subscribe((language: string) => {
      if (language) {
        this.currentLanguage = language.toUpperCase();
      } else {
        this.getBrowserLanguage();
      }
    });
  }

  getBrowserLanguage() {
    let browserLang = this.translate.getBrowserLang()?.toUpperCase();

    if (browserLang) {
      this.setLanguage(browserLang);
    }
  }

  setLanguage(language: string) {
    this.translate.use(language);
    this.languageService.set(language);
  }
}
