import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { NguiAutoCompleteModule } from '@ngui/auto-complete';

import { AppComponent } from "./app.component";
import { Navigation } from "./navigation";
import { PokemonHeader } from "./pokemon.header";
import { FetchPokemon } from "./services/fetch.pokemon";

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, FormsModule, HttpModule, NguiAutoCompleteModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
