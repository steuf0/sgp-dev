import { Component } from '@angular/core';
import { LanguageService } from './services/language.service';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'SGP.Dev';
  language: string = '';
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

  constructor(private languageService: LanguageService) {
    this.languageService.language.subscribe(
      (language: string) => (this.language = language.toUpperCase())
    );
  }
}
