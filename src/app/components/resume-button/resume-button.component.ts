import { Component, Input } from '@angular/core';
import { environment } from 'src/environment/environment';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-resume-button',
  templateUrl: './resume-button.component.html',
  styleUrls: ['./resume-button.component.scss'],
})
export class ResumeButtonComponent {
  @Input() cssClass: string = '';
  @Input() mobileFullWidth: boolean = false;
  lang: string = '';
  env = environment;

  constructor(private languageService: LanguageService) {
    this.languageService.language.subscribe(
      (language: string) => (this.lang = language)
    );
  }
}
