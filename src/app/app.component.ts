import { Component } from '@angular/core';
import { SettingsService } from './services/sevice.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adminPro';

  constructor(private ajustes:SettingsService){

  }
}


