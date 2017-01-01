import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ContactService } from './contact.service';
import { Contact } from './contact.model';


@Component({
    selector: 'contacts-list',
    providers: [ContactService],
    templateUrl: './contact-list.component.html'
})

export class ContactListComponent implements OnInit, OnDestroy {

    private subscription: Array<Subscription> = [];
    private contacts: Contact[];
    private errorMessage: string;
    private selectedId: number;

    constructor(private service: ContactService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    public ngOnInit() {
        this.route.params.do(params => console.log(JSON.stringify(params)))
            .forEach((params: Params) => {
                this.selectedId = +params['selectedId'];
                let subscription = this.service.getContacts().subscribe(
                    contacts => this.contacts = contacts,
                    error => this.errorMessage = <any>error
                )
                this.subscription.push(subscription)
            });

    }
    public ngOnDestroy() {
        if (this.subscription.length) {
            this.subscription.forEach(subscription => {
                subscription.unsubscribe();
            });
        }
    }

    public selectItem(contact: Contact) {
        this.selectedId = contact.id;
        this.router.navigate(['.', { selectedId: contact.id }], { replaceUrl: true })
            .then(isSucces => this.router.navigate(['/contact', contact.id]));
    }

    public deleteItem(itemId: number) {
        let subscription = this.service.deleteContact(itemId).subscribe(
            () => {
                let subscription = this.service.getContacts().subscribe(
                    contacts => this.contacts = contacts,
                    error => this.errorMessage = <any>error
                )
                this.subscription.push(subscription);
            },
            error => this.errorMessage = <any>error
        );
        this.subscription.push(subscription);
    }

    public addNewItem() {
        this.router.navigate(['.',  this.selectedId ? { selectedId: this.selectedId} : {}], { replaceUrl: true })
            .then(isSucces => this.router.navigate(['/contact']));
    }
}