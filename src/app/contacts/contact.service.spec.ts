import { Contact } from './contact.model';
import { ContactService } from './contact.service';
import { BackendService } from '../common/backend.service';
import { TestBed, getTestBed, ComponentFixture } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ContactListComponent } from './contact-list.component';

describe('Service: ContactService', () => {
    let service:ContactService
    let componet:ComponentFixture<ContactListComponent>
    let spy: jasmine.Spy;

    beforeEach(() => {
         TestBed.configureTestingModule({
             providers: [BackendService, ContactService],
             declarations:[ContactListComponent]
        });
        componet = TestBed.createComponent(ContactListComponent);
        const testbed = getTestBed();
        service = testbed.get(ContactService);
        //service =  componet.debugElement.injector.get(ContactService);

    });
    it('should return the list of contacts from the server on success', () => {
        service.getContacts().subscribe((data: Contact[]) => {
            expect(data.length).toBe(9);
            // expect(data[0].title).toBe('Pizza');
            // expect(data[1].title).toBe('Burrito');
            // expect(data[2].title).toBe('Cheeseburger');
        });
    });
});