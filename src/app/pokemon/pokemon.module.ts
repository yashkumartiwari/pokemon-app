import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { PaginatorComponent } from './paginator/paginator.component';

@NgModule({
  declarations: [ListComponent, DetailComponent, PaginatorComponent],
  imports: [CommonModule, PokemonRoutingModule],
  exports: [PaginatorComponent],
})
export class PokemonModule {}
