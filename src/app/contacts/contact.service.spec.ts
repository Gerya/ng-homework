import { Contact } from './contact.model';
import { ContactService } from './contact.service';
import { BackendService } from '../common/backend.service';
import { TestBed, getTestBed, ComponentFixture } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ContactListComponent } from './contact-list.component';
import { BackendMockService } from '../common/backend-mock.service';

describe('Service: ContactService', () => {
    let service:ContactService
    let componet:ComponentFixture<ContactListComponent>
    let spy: jasmine.Spy;


    beforeEach(() => {
         TestBed.configureTestingModule({
             providers: [{ provide: BackendService, useClass: BackendMockService}, ContactService],
             declarations:[ContactListComponent]
        });
        componet = TestBed.createComponent(ContactListComponent);
        const testbed = getTestBed();
        service = testbed.get(ContactService);
        //service =  componet.debugElement.injector.get(ContactService);

    });
    it('should return the list of contacts from the server on success', () => {
        let values;
        service.getContacts().forEach(v => values.push(v)).then(() =>{
            expect(values.length).toBe(9);
            expect(values[0].name).toBe('Andrew');
        })
    });
});