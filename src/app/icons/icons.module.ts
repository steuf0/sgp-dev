import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import { Github, Linkedin, Mail, Globe } from 'angular-feather/icons';

const icons = { Github, Linkedin, Mail, Globe };

@NgModule({
  declarations: [],
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
