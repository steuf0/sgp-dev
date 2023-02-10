import { Component } from '@angular/core';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.scss'],
})
export class TechnologiesComponent {
  technologies = [
    {
      name: 'TS',
      path: 'typescript',
    },
    {
      name: 'JS',
      path: 'javascript',
    },
    {
      name: 'HTML',
      path: 'html5',
    },
    {
      name: 'Angular',
      path: 'angularjs',
    },
    {
      name: 'Material UI',
      path: 'materialui',
    },
    {
      name: 'SASS',
      path: 'sass',
    },
    {
      name: 'Bootstrap',
      path: 'bootstrap',
    },
  ];

  getFullLink(technology: string) {
    return (
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/' +
      technology +
      '/' +
      technology +
      '-original.svg'
    );
  }
}
