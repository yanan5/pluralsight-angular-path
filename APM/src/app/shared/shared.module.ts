import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StarComponent } from './star/star.component';
import { ConvertToSpacesPipe } from './pipes/convert-to-spaces.pipe';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    StarComponent,
    ConvertToSpacesPipe,
    CardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StarComponent,
    ConvertToSpacesPipe,
    CardComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
