import { Component, OnChanges, Input,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnChanges {
  @Input() rating: number = 4;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  starWidth: number;
  constructor() { }

  ngOnChanges(): void {
    this.starWidth = this.rating * 75 / 5;
  }

  onClick() {
    this.notify.emit(this.rating + '')
  }

}
