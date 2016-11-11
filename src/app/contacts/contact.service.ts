import { Injectable } from '@angular/core';
import {BackendService} from '../common/backend.service';
import { Observable } from 'rxjs/Rx';
import { Contact } from './contact.model';


@Injectable()
export class ContactService{
     constructor( private backend: BackendService ){}

     public getContacts():Observable<Contact[]>{
        return  this.backend.findAll(Contact)
     }

     public getProduct(id:number):Observable<Contact>{
            return this.backend.find(Contact, id);
     }
     
     public addProduct(contact: Contact): Observable<Contact> {
        return this.backend.addItem(Contact, contact);
    }

    public editProduct(contact: Contact): Observable<Contact> {
        return this.backend.editItem(Contact, contact);
    }

    public deleteProduct(id: number): Observable<Contact> {
        return this.backend.deleteItem(Contact, id);
    }
 }