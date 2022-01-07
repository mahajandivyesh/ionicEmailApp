import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailComposerPage } from './email-composer.page';

const routes: Routes = [
  {
    path: '',
    component: EmailComposerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailComposerPageRoutingModule {}
