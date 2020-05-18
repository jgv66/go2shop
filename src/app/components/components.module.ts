import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';
import { TrespuntosComponent } from './trespuntos/trespuntos.component';

@NgModule({
  declarations: [MenuComponent, TrespuntosComponent],
  exports: [MenuComponent, TrespuntosComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    PipesModule
  ]
})
export class ComponentsModule { }
