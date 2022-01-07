import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailComposerPageRoutingModule } from './email-composer-routing.module';

import { EmailComposerPage } from './email-composer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailComposerPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EmailComposerPage]
})
export class EmailComposerPageModule {}
