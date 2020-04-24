import { Component } from '@angular/core';

const num = 10;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lint';

  myApp() {
    const x = 10;
    const y = 'sdf';
  }
}
