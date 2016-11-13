import { Injectable, Inject, Type } from '@angular/core';
import { Identifiable } from './common.interfaces';
import { BackendService } from './backend.service';
import { Observable } from 'rxjs/Rx';
import { Contact, Gender } from '../contacts/contact.model';

const CONTACTS: Identifiable[] = [
  new Contact(1, 'Andrew', "Feltit", Gender.Male, 'a.feltit@gmail.com', '215742198987', 'Ruse'),
  new Contact(2, 'Filip', "Feltit", Gender.Male, 'f.feltit@gmail.com', '234325345344', 'Sofia'),
  new Contact(3, 'Maria', "Ivanova", Gender.Female, 'maria@gmail.com', '59412', 'Burgas'),
  new Contact(4, 'Maria', "Popova", Gender.Female, 'maria.popova@gmail.com', '66488441', 'Burgas'),
  new Contact(5, 'Tanuia', "Ivanova", Gender.Female, 'tamia@gmail.com', '892148962'),
  new Contact(6, 'Karla', "Ivanova", Gender.Female, 'karla@gmail.com'),
  new Contact(7, 'Peter', "Feltit", Gender.Male, 'peter@gmail.com', '5245', 'Sofia'),
  new Contact(8, 'Veltin', "Markos", Gender.Male, 'veltin@gmail.com'),
  new Contact(9, 'Piter', "Markus", Gender.Male,),
];

export class BackendMockService implements BackendService {

    constructor( ) { }

    public findAll<T extends Identifiable>(type: Type<T>): Observable<T[]> {
        let responce:any;
        switch (type.name) {
        case Contact.name:
            responce =  Observable.from(CONTACTS);
        default:
            let err = new Error(`Cannot recognize entity type: ${type.name}`);
            this.handleErrorObservable(err);
        }
        return responce;
    }

    public find<T extends Identifiable>(type: Type<T>, id: number): Observable<T> {
        return this.findAll<T>(type)
        .map((items: T[]) => items.find(item => item.id === id)[0]);
    }

    public addItem<T extends Identifiable>(type: Type<T>, item: T): Observable<T> {
        let observableResult: Observable<T>;
        switch (type.name) {
            case Contact.name:
                item.id = this.getNextId(CONTACTS);
                CONTACTS.push(item);
                observableResult = Observable.create(item);
                break;
            default:
                let err = new Error(`Cannot recognize entity type: ${type.name}`);
        }
        return observableResult;
    }

    public editItem<T extends Identifiable>(type: Type<T>, item: T): Observable<T> {
        let observableResult: Observable<T>;
        switch (type.name) {
            case Contact.name:
                let serached = CONTACTS.find(el => el.id == item.id);
                serached = item;
                observableResult = Observable.create(item);
                break;
            default:
                let err = new Error(`Cannot recognize entity type: ${type.name}`);
        }
        return observableResult;
    }

    public deleteItem<T extends Identifiable>(type: Type<T>, itemId: number): Observable<void> {
        let observableResult: Observable<T>;
        switch (type.name) {
            case Contact.name:
                observableResult = Observable.create({});
                break;
            default:
                let err = new Error(`Cannot recognize entity type: ${type.name}`);
        }

        return observableResult
            .catch(this.handleErrorObservable)
    }


    private handleErrorObservable(error: any) {
        let errMsg: string;
        errMsg = error.message || error.toString() || 'Server Error';       
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    private getNextId(collection: Identifiable[]): number {
        return collection.reduce((prevMaxId, next) =>
            next.id > prevMaxId ? next.id : prevMaxId, 0) + 1;
    }

}
