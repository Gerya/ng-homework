import { Injectable } from '@angular/core';
import {BackendService} from '../common/backend.service';
import { Observable } from 'rxjs/Rx';
import { Contact } from './contact.model';


@Injectable()
export class ContactService{
     constructor( private backend: BackendService ){ }

     public getContacts():Observable<Contact[]>{
        return  this.backend.findAll(Contact);
     }

     public getContact(id:number):Observable<Contact>{
            return this.backend.find(Contact, id);
     }
     
     public addContact(contact: Contact): Observable<Contact> {
        return this.backend.addItem(Contact, contact);
    }

    public editContact(contact: Contact): Observable<Contact> {
        return this.backend.editItem(Contact, contact);
    }

    public deleteContact(id: number): Observable<void> {
        return this.backend.deleteItem(Contact, id);
    }
 }