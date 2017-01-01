import { BrowserModule }       from '@angular/platform-browser';
import { ReactiveFormsModule }         from '@angular/forms';
import { NgModule }     from '@angular/core';
import { ContactService } from './contact.service';
import {ContactListComponent} from './contact-list.component';
import {ContactDetailComponent} from './contact-detail.component';
import { ContactRoutingModule } from './contact-routing.module';


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    ContactRoutingModule
  ],
  providers: [ContactService],
  declarations: [ ContactListComponent ,ContactDetailComponent],
  exports: [ContactListComponent]
})
export class ContactModule { }