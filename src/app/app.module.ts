import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { IconsModule } from './icons/icons.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BioComponent } from './components/bio/bio.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { WorkComponent } from './components/work/work.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { ResumeButtonComponent } from './components/resume-button/resume-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    BioComponent,
    AboutComponent,
    ProjectsComponent,
    WorkComponent,
    ContactComponent,
    FooterComponent,
    ResumeButtonComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, IconsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
