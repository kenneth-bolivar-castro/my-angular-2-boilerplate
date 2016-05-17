import { Component } from '@angular/core';
import { Title } from '../../components/title/title.component';

@Component({
	selector: 'home',
	templateUrl: '../../app/pages/home/home.tpl.html',
	directives: [
		Title
	]
})
export class Home {
	
}