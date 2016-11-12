import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { CommonModule } from './common/common.module';
import { ContactModule } from './contacts/contact.module';
import { HomeModule } from './home/home.module';
import { ContactListComponent } from './contacts/contact-list.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'contacts', component: ContactListComponent },
    ]),
    CommonModule,
    ContactModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
