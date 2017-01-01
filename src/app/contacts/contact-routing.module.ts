import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactListComponent } from './contact-list.component';
import { ContactDetailComponent } from './contact-detail.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'contacts',  component: ContactListComponent },
       {
        path: 'contact/:id',
        component:ContactDetailComponent,
        data: {
          title: 'Edit Contact'
        }
      },
      {
        path: 'contact',
        pathMatch: 'full',
        component: ContactDetailComponent,
        data: {
          title: 'Add New Contact'
        }
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class ContactRoutingModule {}
