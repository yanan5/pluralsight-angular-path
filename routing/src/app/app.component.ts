import { Component } from '@angular/core';
import { LoggerService } from 'my-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'routing';
  constructor(logger: LoggerService) {
    logger.log('hello  angular')
  }
}
