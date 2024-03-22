import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokemondataService {
  constructor(private http: HttpClient) {}
  cache: any = {};

  getPokemonList(url: any) {
    return this.http.get<any>(url).pipe(
      map((res: any) => {
        return {
          ...res,
          results: res.results.map((x: any) => {
            return {
              ...x,
              id: x.url.split('/')[6],
              img: x.url + 'sprites/other/dream_world/front_default)',
            };
          }),
        };
      })
    );
  }
  getPokemonDetails(url: any) {
    if (this.cache[url]) {
      return of(this.cache[url]);
    } else {
      return this.http.get<any>(url).pipe(
        map((res) => {
          this.cache[url] = res;
          return this.cache[url];
        })
      );
    }
  }
  getPokemonEvolution(url: any): Observable<any> {
    return this.http.get<any>(url).pipe(
      switchMap((response: any) => {
        // Extract evolution chain URL from response and fetch evolution details
        const evolutionChainUrl = response?.evolution_chain?.url;
        if (evolutionChainUrl) {
          return this.http.get<any>(evolutionChainUrl).pipe(
            map((evolutionResponse) => {
              return evolutionResponse?.chain;
            })
          );
        } else {
          // Handle case where evolution chain URL is not found
          return [];
        }
      })
    );
  }
}
