import { Component } from '@angular/core';
import { Title } from '../../components/title/title.component';

@Component({
	selector: 'home',
	templateUrl: './pages/home/home.tpl.html',
	styleUrls: [ 'pages/home/home.style.css' ],
	directives: [
		Title
	]
})
export class Home {

}