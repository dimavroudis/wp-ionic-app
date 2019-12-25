import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
	selector: 'app-tabs',
	templateUrl: './tabs.page.html',
	styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

	title: string;
	description: string;

	constructor(private settings: SettingsService) {
	}

	ngOnInit() {
		this.settings.getAppInfo().subscribe(app => {
			this.title = app.name;
			this.description = app.description;
		});
	}

}
