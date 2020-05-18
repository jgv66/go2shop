import { NgModule } from '@angular/core';
import { FiltroPipe } from './filtro.pipe';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';

@NgModule({
  declarations: [FiltroPipe, DomSanitizerPipe],
  exports: [FiltroPipe, DomSanitizerPipe]
})
export class PipesModule { }
