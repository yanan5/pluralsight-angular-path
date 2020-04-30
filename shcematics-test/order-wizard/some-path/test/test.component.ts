import {Component, OnInit} from '@angular/core';
import {TestService} from './test.services';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})

export class TestComponent implements OnInit {
  constructor(private service: TestService) {

  }
}
