import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
    // moduleId: module.id,
    selector: 'contact-detail',
    templateUrl: './contact-detail.component.html'
})
export class ContactDetailComponent implements OnInit, OnChanges {
    @Input()
    public contact: Contact = { id: undefined, name: '', family: '' };
    public contactForm: FormGroup;
    public isNewContact: boolean; // ADD: true, EDIT: false
    private subscription: Array <Subscription> = [];
    private errorMessage: string;

    private formErrors = {
        'name': '',
        'family': ''
    };

    private validationMessages = {
        'name': {
            'required': 'Name is required.',
            'minlength': 'Name must be at least 2 characters long.',
            'maxlength': 'Name cannot be more than 40 characters long.'
        },
        'family': {
            'required': 'Name is required.',
            'minlength': 'Name must be at least 2 characters long.',
            'maxlength': 'Name cannot be more than 40 characters long.'
        },
    };

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private service: ContactService) { }

    public ngOnInit() {
        this.buildForm();
        this.route.params.forEach((params: Params) => {
            let id = +params['id']; // (+) converts string 'id' to a number
            this.isNewContact = true; // new
            if (id) {
                this.isNewContact = false; // has Id => not new
                let subscription = this.service.getContact(id).subscribe(
                    (contact) => {
                        this.contact = contact;
                        this.resetForm();
                    },
                    error => this.errorMessage = <any>error
                )
                this.subscription.push(subscription);
            }
        });
    }

    public ngOnDestroy() {
        if (this.subscription.length) {
            this.subscription.forEach(subscription => {
                subscription.unsubscribe();
            });
        }
    }
    public ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        let chng = changes['contact'];
        if (chng.currentValue !== chng.previousValue) {
            this.resetForm();
        }
    }

    public buildForm(): void {
        this.isNewContact = !this.contact.id;
        this.contactForm = this.fb.group({
            'id': [{ value: this.contact.id, disabled: true }],
            'name': [this.contact.name, [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(24)
            ]],
            'family': [this.contact.family, [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(24)
            ]],
            'gender': [this.contact.gender],
            'email': [this.contact.email],
            'phone': [this.contact.phone],
            'address': [this.contact.address],

        });

        let subscription = this.contactForm.statusChanges
            .subscribe(data => this.onStatusChanged(data));
        this.subscription.push(subscription);
        this.onStatusChanged();
    }

    public onSubmit() {
        this.contact = this.contactForm.getRawValue() as Contact;
        if (this.isNewContact) {
            var subscription = this.service.addContact(this.contact).subscribe(contact => {
                this.contact = contact;
                this.goBack();
            },
                error => this.errorMessage = <any>error);

        } else {
            var subscription = this.service.editContact(this.contact).subscribe(contact => {
                this.contact = contact;
                this.goBack();
            },
                error => this.errorMessage = <any>error);
        }
        this.subscription.push(subscription);
    }

    public goBack() {
        this.location.back();
    }

    public resetForm() {
        this.contactForm.reset(this.contact);
    }

    private onStatusChanged(data?: any) {
        if (!this.contactForm) { return; }
        const form = this.contactForm;

        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

}

