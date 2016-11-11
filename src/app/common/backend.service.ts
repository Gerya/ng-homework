import { Type } from '@angular/core';
import { Identifiable } from './common.interfaces';
import { Observable } from 'rxjs/Observable';

export abstract class BackendService {

  public abstract findAll<T extends Identifiable>(type: Type<T>): Observable<T[]>;

  public abstract find<T extends Identifiable>(type: Type<T>, id: number): Observable<T>;

  public abstract addItem<T extends Identifiable>(type: Type<T>, item: T): Observable<T>;

  public abstract editItem<T extends Identifiable>(type: Type<T>, item: T): Observable<T>;

  public abstract deleteItem<T extends Identifiable>(type: Type<T>, id: number): Observable<T>;

}
