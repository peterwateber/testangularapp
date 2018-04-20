import { Component } from "@angular/core";
import { FetchPokemon } from './services/fetch.pokemon';

import { Observable } from 'rxjs/Rx';

@Component({
	selector: "app",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"],
	providers: [FetchPokemon]
})

export class AppComponent {
	public pokemons;
	public abilities;
	public query: string;
	public emptyResults: boolean;
	public loading: boolean;
	public defaultSearchLength: number;
	public search: string;

	constructor(private fetchPokemon: FetchPokemon) {
		this.pokemons = [];
		this.abilities = [];
		this.emptyResults = false;
		this.loading = false;
		this.displayDefaultResult();
	}

	displayDefaultResult() {
			this.loading = true;
			this.fetchPokemon.getPokemon().subscribe(pokemons => {
				this.loading = false;
				this.pokemons = pokemons;
				pokemons.map( pokemon => {
					this.fetchPokemon.getPokemonAbilities(pokemon).subscribe(
						ability => {
								ability.map(res => {
										this.abilities.push(res)
								})
						}
					);
				});
			})
	}

	onSearch(query: any) {
		if (!query.search) {
			return this.displayDefaultResult();
		}
		this.pokemons = [];
		this.loading = true;
		this.emptyResults = false;
		this.fetchPokemon.searchPokemon(query.search).subscribe(pokemons => {
				this.emptyResults = false;
				this.loading = false;
				this.pokemons.push(pokemons);
				this.fetchPokemon.getPokemonAbilities(pokemons).subscribe(
					ability => {
							ability.map(res => {
									this.abilities.push(res)
							})
					}
				);
			},
			error => {
					this.loading = false;
					this.emptyResults = true;
			}
		)
		return false;
	}
}
