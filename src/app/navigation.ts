import { Component } from "@angular/core";

@Component({
	selector: "navigation",
	template: `
    <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
      <a class="navbar-brand mr-auto mr-lg-0" href="#">Pokemon</a>
      <button class="navbar-toggler p-0 border-0" type="button" data-toggle="offcanvas">
        <span class="navbar-toggler-icon"></span>
      </button>
    </nav>
  `,
})
export class Navigation {


		constructor() {

		}
}
