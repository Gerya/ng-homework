import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';
import { Subscription } from 'rxjs/Rx';
import { Contact } from './contact.model';

@Component({
    selector: 'contacts-list',
    providers:[ ContactService ],
    templateUrl: './contact-list.component.html'
})

export class ContactListComponent implements OnInit{

    private subscription: Subscription;
    private contacts: Contact[];

    constructor(private service: ContactService){}

    public ngOnInit() {
        this.subscription = this.service.getContacts().subscribe(
            contacts => this.contacts = contacts
            )
    };
}