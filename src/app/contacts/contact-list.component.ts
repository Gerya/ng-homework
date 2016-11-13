import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ContactService } from './contact.service';
import { Contact } from './contact.model';


@Component({
    selector: 'contacts-list',
    providers:[ ContactService ],
    templateUrl: './contact-list.component.html'
})

export class ContactListComponent implements OnInit,OnDestroy{

    private subscription: Subscription;
    private contacts: Contact[];
    private errorMessage:string;
    private selectedId:number;

    constructor(private service: ContactService){}

    public ngOnInit() {
        this.subscription = this.service.getContacts().subscribe(
            contacts => this.contacts = contacts,
            error => this.errorMessage = <any>error
        )
    }
    public ngOnDestroy() {
        if (this.subscription) this.subscription.unsubscribe();
    }
    
    public selectItem(selected:Contact){
        this.selectedId = selected.id;
    }

    public deleteItem(itemId: number) {
        this.service.deleteContact(itemId);
    }
}