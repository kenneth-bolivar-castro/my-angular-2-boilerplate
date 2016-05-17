import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { ROUTER_PROVIDERS } from '@angular/router';
import { AppMain } from './main.app';

bootstrap(AppMain, [
	ROUTER_PROVIDERS

]).then(function() {
	console.log('App bootstraped');
});