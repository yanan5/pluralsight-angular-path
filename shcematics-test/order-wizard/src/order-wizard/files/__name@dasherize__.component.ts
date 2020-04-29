import {Component, OnInit} from '@angular/core';
import {<%= classify(name) %>Service} from './<%= dasherize(name) %>.services';

@Component({
  selector: 'app-<%= dasherize(name) %>',
  templateUrl: './<%= dasherize(name) %>.component.html',
  styleUrls: ['./<%= dasherize(name) %>.component.scss']
})

export class <%= classify(name) %>Component implements OnInit {
  constructor(private service: <%= classify(name) %>Service) {

  }
}
