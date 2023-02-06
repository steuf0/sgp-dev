import { Component } from '@angular/core';

import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  env = environment;
}
