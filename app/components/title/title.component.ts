import { Component } from '@angular/core';

@Component({
	selector: 'home-title',
	templateUrl: './components/title/title.tpl.html',
	styleUrls: [ 'components/title/title.style.css' ]
})
export class Title {
	message: String = 'My Angular 2 Boilerplate';
}