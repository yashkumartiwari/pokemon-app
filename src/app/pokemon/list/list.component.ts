import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PokemonRoutingModule } from '../pokemon-routing.module';
import { PokemondataService } from '../pokemondata.service';
import { forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  pokemonList: any[] = [];
  pokemonData: any;
  currentPage: number = 1;

  constructor(private http: HttpClient, private _service: PokemondataService) {}

  ngOnInit(): void {
    this.getPokemonList();
  }

  getPokemonList(url?: any): void {
    let apiurl = url ?? 'https://pokeapi.co/api/v2/pokemon?limit=12';
    this._service.getPokemonList(apiurl).subscribe((res: any) => {
      this.pokemonData = res;
      if (res && res.results) {
        const urls = res.results.map((x: any) => x.url);
        if (urls.length > 0) {
          forkJoin(
            urls.map((url: any) => this._service.getPokemonDetails(url))
          ).subscribe((detailData: any) => {
            res.results.forEach((element: any, index: number) => {
              element.detail = detailData[index];
            });
            this.pokemonList = res.results;
            console.log(this.pokemonList);
          });
        }
      }
    });
  }

  pageChange(e: any) {
    let url = '';
    e > this.currentPage
      ? (url = this.pokemonData?.next)
      : (url = this.pokemonData?.previous);
    this.currentPage = e;

    this.getPokemonList(url);
  }
}
