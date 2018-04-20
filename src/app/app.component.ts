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
	private pokemonPages;
	private defaultPagesLength: number;
	public showLoadMoreLoading: boolean;

	constructor(private fetchPokemon: FetchPokemon) {
		this.pokemons = [];
		this.abilities = [];
		this.emptyResults = false;
		this.loading = false;
		this.showLoadMoreLoading = false;
		this.pokemonPages = [1,2,3,4,5];
		this.displayDefaultResult();
	}

	displayDefaultResult() {
			this.loading = true;
			this.fetchPokemon.getPokemon(this.pokemonPages).subscribe(pokemons => {
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
			}, error => {
					this.loading = false;
					this.emptyResults = true;
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

	loadMore() {
		let start = this.pokemonPages[this.pokemonPages.length - 1] + 1;
		let offset = (start + this.pokemonPages.length) - 1;
		this.pokemonPages = [];
		for (let i=start; i<=offset; i++) {
			this.pokemonPages.push(i);
		}

		this.showLoadMoreLoading = true;
		this.loading = true;
		this.fetchPokemon.getPokemon(this.pokemonPages).subscribe(pokemons => {
			this.loading = false;
			this.showLoadMoreLoading = false;
			this.pokemons = this.pokemons.concat(pokemons);
			pokemons.map( pokemon => {
				this.fetchPokemon.getPokemonAbilities(pokemon).subscribe(
					ability => {
							ability.map(res => {
									this.abilities.push(res)
							})
					}
				);
			});
		}, error => {
				this.showLoadMoreLoading = false;
				this.loading = false;
				this.emptyResults = true;
		})
	}
}
