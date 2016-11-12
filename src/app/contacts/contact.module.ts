import { BrowserModule }       from '@angular/platform-browser';
import { ReactiveFormsModule }         from '@angular/forms';
import { NgModule }     from '@angular/core';
import { ContactService } from './contact.service';
import {ContactListComponent} from './contact-list.component';


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [ContactService],
  declarations: [ ContactListComponent ],
  exports: [ContactListComponent]
})
export class ContactModule { }