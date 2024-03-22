import { TestBed } from '@angular/core/testing';

import { PokemondataService } from './pokemondata.service';

describe('PokemondataService', () => {
  let service: PokemondataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemondataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
