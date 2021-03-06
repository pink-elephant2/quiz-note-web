import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContactComponent } from './contact.component';
import { ContactRoutingModule } from './contact-routing.module';
import { environment } from 'env/environment';
import { ContactService, ContactMockService } from 'shared/service/contact';
import { ThemeColorModule } from 'shared/directive/theme-color';

@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContactRoutingModule,
    ThemeColorModule
  ],
  exports: [
    ContactComponent
  ],
  providers: [
    environment.production ? ContactService : { provide: ContactService, useClass: ContactMockService },
  ]
})
export class ContactModule { }
