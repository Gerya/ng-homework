import { Injectable, Inject, Type } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Logger } from './logger.service';
import { Identifiable } from './common.interfaces';
import { BackendService } from './backend.service';
import { API_BASE_URL } from './common.module';
import { Subject, BehaviorSubject, Observable } from 'rxjs/Rx';


@Injectable()
export class BackendHttpService implements BackendService {
    private apiBaseUrl: string;
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor( @Inject('API_BASE_URL') apiBaseUrl: string, private http: Http, private logger: Logger) {
        this.apiBaseUrl = apiBaseUrl;
    }

    public getCollectionObservable<T extends Identifiable>(type: Type<T>, reloadCache?: boolean): Observable<T[]> {
        return this.cache.getCollectionObservable(type);
    }

    public getIndividualObservable<T extends Identifiable>(type: Type<T>, id: number): Observable<T> {
        return this.cache.getIndividualObservable(type, id);
    }

    public refreshCollection<T extends Identifiable>(type: Type<T>, force: boolean = false): Promise<void> {
        let collection: string;
        switch (type.name) {
            case Product.name:
                collection = 'products';
                break;
            case User.name:
                collection = 'users';
                break;
            default:
                let err = new Error(`Cannot recognize entity type: ${type.name}`);
                this.cache.getOperationsSubject(type).error(err);
        }
        // call the HTTP API and return the Promise
        let apiUrl = this.apiBaseUrl + '/' + collection;
        // if (this.cache.isFresh(type)) {
        //     this.logger.log(`Fetching ${collection} from cache .`);
        //     this.cache.nextCollectionData(type);
        //     return Promise.resolve();
        // } else {
        return this.http.get(apiUrl)
            .map(response => response.json().data || [] as T[])
            .catch(this.handleErrorObservable)
            .forEach(data => {
                this.logger.log(`Fetched ${data.length} ${collection}.`);
                this.cache.nextCollectionData(type, data);
            });

    }

    public addItem<T extends Identifiable>(type: Type<T>, item: T): Promise<void> {
        let collection: string;
        switch (type.name) {
            case Product.name:
                collection = 'products';
                break;
            case User.name:
                collection = 'users';
                break;
            default:
                let err = new Error(`Cannot recognize entity type: ${type.name}`);
                this.cache.getOperationsSubject(type).error(err);
        }
        // call the HTTP API and return the Promise
        let apiUrl = this.apiBaseUrl + '/' + collection;
        return this.http.post(apiUrl, JSON.stringify(item), this.options)
            .map(res => res.json().data)
            .catch(this.handleErrorObservable)
            .forEach(itemData => {
                this.logger.log(`Created ${type.name}: ${JSON.stringify(itemData)}`);
                this.cache.addCollectionItem(type, itemData); // apply changes immediately
                this.refreshCollection(type); // schedule async collection refresh
            });
    }

    public editItem<T extends Identifiable>(type: Type<T>, item: T): Promise<void> {
        let resource: string;
        switch (type.name) {
            case Product.name:
                resource = 'products';
                break;
            case User.name:
                resource = 'users';
                break;
            default:
                let err = new Error(`Cannot recognize entity type: ${type.name}`);
                this.cache.getOperationsSubject(type).error(err);
        }
        // call the HTTP API and return the Promise
        let apiUrl = this.apiBaseUrl + '/' + resource + '/' + item.id;
        return this.http.put(apiUrl, JSON.stringify(item), this.options)
            .catch(this.handleErrorObservable)
            .forEach(() => {
                this.logger.log(`Edited ${type.name}: ${JSON.stringify(item)}`);
                this.cache.editCollectionItem(type, item); // apply changes immediately
                // this.refreshCollection(type); // schedule async collection refresh
            });
    }

    public deleteItem<T extends Identifiable>(type: Type<T>, itemId: number): Promise<void> {
        let resource: string;
        switch (type.name) {
            case Product.name:
                resource = 'products';
                break;
            case User.name:
                resource = 'users';
                break;
            default:
                let err = new Error(`Cannot recognize entity type: ${type.name}`);
                this.cache.getOperationsSubject(type).error(err);
        }
        // call the HTTP API and return the Promise
        let apiUrl = this.apiBaseUrl + '/' + resource + '/' + itemId;
        return this.http.delete(apiUrl, this.options)
            .catch(this.handleErrorObservable)
            .forEach(() => {
                this.logger.log(`Deleted ${type.name} with ID: ${itemId}`);
                this.cache.deleteCollectionItem(type, itemId); // apply changes immediately
                this.refreshCollection(type); // schedule async collection refresh
            });
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
