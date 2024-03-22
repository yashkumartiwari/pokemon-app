import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonRoutingModule } from '../pokemon-routing.module';
import { PokemondataService } from '../pokemondata.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent implements OnInit {
  pokemonId: any;
  pokemonDetails: any;
  pokemonEvolution: any;
  tab: string = 'details';
  stages: any;

  constructor(
    private route: ActivatedRoute,
    private _service: PokemondataService
  ) {}

  ngOnInit(): void {
    this.getPokemonIdFromRoute();
    this.getPokemonDetails();
    this.getPokemonEvolution();
  }

  getPokemonIdFromRoute(): void {
    this.route.params.subscribe((params) => {
      this.pokemonId = +params['id'];
    });
  }

  getPokemonDetails(): void {
    this._service
      .getPokemonDetails(
        'https://pokeapi.co/api/v2/pokemon/' + this.pokemonId + '/'
      )
      .subscribe((response: any) => {
        this.pokemonDetails = response;
      });
  }

  getPokemonEvolution() {
    this._service
      .getPokemonEvolution(
        'https://pokeapi.co/api/v2/pokemon-species/' + this.pokemonId
      )
      .subscribe((response: any) => {
        this.stages = [];
        this.pokemonEvolution = this.getEvolutionStages(response);

        console.log(this.pokemonEvolution);

        const urls = this.pokemonEvolution.map((x: any) => x?.species?.url);
        if (urls.length > 0) {
          forkJoin(
            urls.map((url: any) =>
              this._service.getPokemonDetails(
                'https://pokeapi.co/api/v2/pokemon/' + url.split('/')[6] + '/'
              )
            )
          ).subscribe((detailData: any) => {
            this.pokemonEvolution.forEach((element: any, index: number) => {
              element.detail = detailData[index];
            });
          });
        }
        console.log(this.pokemonEvolution);
      });
  }

  getEvolutionStages(stage: any): any {
    this.stages.push(stage);
    if (stage.evolves_to.length > 0) {
      return this.getEvolutionStages(stage?.evolves_to[0]);
    } else {
      return this.stages;
    }
  }
}
