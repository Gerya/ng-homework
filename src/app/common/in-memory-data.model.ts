import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Contact, Gender } from '../contacts/contact.model';
import { Identifiable } from './common.interfaces';

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


export class InMemoryDataModel implements InMemoryDbService {
  public createDb() {
    return {
      contacts: CONTACTS,
    };
  }
}
