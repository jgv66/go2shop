import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KinetikPageRoutingModule } from './kinetik-routing.module';

import { KinetikPage } from './kinetik.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KinetikPageRoutingModule
  ],
  declarations: [KinetikPage]
})
export class KinetikPageModule {}
