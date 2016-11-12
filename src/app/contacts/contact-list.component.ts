import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';

@Component({
    selector: 'contacts-list',
    providers:[ ContactService ],
    templateUrl: './contact-list.component.html'
})

export class ContactListComponent implements OnInit{

connstructor(){}

public ngOnInit() {
     };
}