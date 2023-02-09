import { LanguageService } from 'src/app/services/language.service';
import { TranslateService } from '@ngx-translate/core';
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
    private translate: TranslateService,
    private languageService: LanguageService
  ) {
    this.languageService.language.subscribe(
      (language: string) => (this.currentLanguage = language)
    );
  }

  setLanguage(language: string) {
    this.translate.use(language);
    this.languageService.set(language);
  }
}
