import { BrowserModule }       from '@angular/platform-browser';
import { ReactiveFormsModule }         from '@angular/forms';
import { NgModule }     from '@angular/core';
import { ContactService } from './contact.service';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [ContactService],
  declarations: [

  ],
  exports: [

  ]
})
export class ContactModule { }