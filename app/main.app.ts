import { Component } from '@angular/core';
import { Home } from './pages/home/home.page.component';

@Component({
	selector: 'app',
	template: '<home></home>',
	directives: [
		Home
	]
})
export class AppMain {
	
}