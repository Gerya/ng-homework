import { Contact } from './contact.model';
import { ContactService } from './contact.service';
import { BackendService } from '../common/backend.service';
import { TestBed, getTestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

describe('Service: ContactService', () => {
    var service:ContactService
    beforeEach(() => {
         TestBed.configureTestingModule({
             providers: [BackendService, ContactService],
        });
         const testbed = getTestBed();
        service = testbed.get(ContactService);
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