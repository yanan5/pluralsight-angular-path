import {Component, OnInit} from '@angular/core';
import {CheckOutService} from './check-out.services';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})

export class CheckOutComponent implements OnInit {
  constructor(private service: CheckOutService) {

  }
}
