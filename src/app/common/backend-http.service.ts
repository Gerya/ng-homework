import { Injectable, Inject, Type } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Logger } from './logger.service';
import { Identifiable } from './common.interfaces';
import { BackendService } from './backend.service';
import { Observable } from 'rxjs/Rx';
import { Contact } from '../contacts/contact.model';


@Injectable()
export class BackendHttpService implements BackendService {
    private baseUrl: string;
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor( @Inject('API_BASE_URL') baseUrl: string, private http: Http, private logger: Logger) {
        debugger;
        this.baseUrl = baseUrl;
    }

    public findAll<T extends Identifiable>(type: Type<T>): Observable<T[]> {
        let collection = type.name.toLowerCase() + 's';
        if (type.name !== Contact.name ) {
        let err = new Error(`Cannot recognize entity type: ${type.name}`);
            this.handleErrorObservable(err);
        }
        return this.http.get(this.baseUrl + '/' + collection)
        .map(response => response.json().data as T[])
        .do(items => this.logger.log(`Fetched ${items.length} ${collection}.`))
        .catch(this.handleErrorObservable)
    }

    public find<T extends Identifiable>(type: Type<T>, id: number): Observable<T> {
        return this.findAll<T>(type)
        .map((items: T[]) => items.find(item => item.id === id)[0])
        .do((item) => this.logger.log(`Fetched ${item.id}.`))
        .catch(this.handleErrorObservable)


    }


    public addItem<T extends Identifiable>(type: Type<T>, item: T): Observable<T> {
        let collection: string;
        switch (type.name) {
            case Contact.name:
                collection = 'contacts';
                break;
            default:
                let err = new Error(`Cannot recognize entity type: ${type.name}`);
        }
        // call the HTTP API and return the Promise
        let apiUrl = this.baseUrl + '/' + collection;
        return this.http.post(apiUrl, JSON.stringify(item), this.options)
            .map(res => res.json().data)
            .catch(this.handleErrorObservable)
    }

    public editItem<T extends Identifiable>(type: Type<T>, item: T): Observable<T> {
        let resource: string;
        switch (type.name) {
            case Contact.name:
                resource = 'contacts';
                break;
            default:
                let err = new Error(`Cannot recognize entity type: ${type.name}`);
                this.handleErrorObservable(err);
        }
        // call the HTTP API and return the Promise
        let apiUrl = this.baseUrl + '/' + resource + '/' + item.id;
        return this.http.put(apiUrl, JSON.stringify(item), this.options)
            .catch(this.handleErrorObservable)
            .do(()=> this.logger.log(`Edited ${type.name}: ${JSON.stringify(item)}`))
    }

    public deleteItem<T extends Identifiable>(type: Type<T>, itemId: number): Observable<void> {
        let resource: string;
        switch (type.name) {
            case Contact.name:
                resource = 'contacts';
                break;
            default:
                let err = new Error(`Cannot recognize entity type: ${type.name}`);
                this.handleErrorObservable(err);
        }
        // call the HTTP API and return the Promise
        let apiUrl = this.baseUrl + '/' + resource + '/' + itemId;
        return this.http.delete(apiUrl, this.options)
            .catch(this.handleErrorObservable)
            .do(()=> this.logger.log(`Deleted ${type.name} with ID: ${itemId}`))
    }


    private handleErrorObservable(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = (body && body.error) || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message || error.toString() || 'Server Error';
        }
        // in a real world app, we may send the error to some remote logging infrastructure
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
