import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestModule } from './some-path/test/test.module';import {TestModule}from './some-path/test/test.module';
import {TestModule}from './some-path/test/test.module';@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TestModule,TestModule,TestModule],
  providers: [],
  bootstrap: []
})
export class AppModule { }
