import { environment } from 'src/environment/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
})
export class WorkComponent implements OnInit {
  env = environment;
  currentTab: number = 0;

  constructor() {}

  ngOnInit() {}

  changeTab(index: number) {
    this.currentTab = index;
  }
}
