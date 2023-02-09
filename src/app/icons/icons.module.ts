import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import { Github, Linkedin, Mail, Globe, Menu } from 'angular-feather/icons';

const icons = { Github, Linkedin, Mail, Globe, Menu };

@NgModule({
  declarations: [],
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
