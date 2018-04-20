import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FetchPokemon {
	private pages;
	constructor(private http: Http) {
	}

	searchPokemon(query) {
		return this.http.get('https://pokeapi.co/api/v2/pokemon/' + query)
							.map(res => {
									return res.json();
							})
							.catch(err => {
								 return Observable.throw(new Error(err.status));
							})
	}

	getPokemon(pages) {
		return Observable.forkJoin(
			pages.map(
				i => this.http.get('https://pokeapi.co/api/v2/pokemon/' + i)
					.map(res => res.json())
					.catch(err => {
						 return Observable.throw(new Error(err.status));
					})
			)
		);
	}

	getPokemonAbilities(pokemon) {
		return Observable.forkJoin(
			pokemon.abilities.map(
							res => this.http.get(res.ability.url)
										.map(res => res.json())
										.map(ability => {
												return {
													name: pokemon.name,
													ability: ability.name,
													effects: ability.effect_entries[0].effect
												};
										})
				)
		);
	}
}
