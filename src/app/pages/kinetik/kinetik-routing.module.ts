import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KinetikPage } from './kinetik.page';

const routes: Routes = [
  {
    path: '',
    component: KinetikPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KinetikPageRoutingModule {}
