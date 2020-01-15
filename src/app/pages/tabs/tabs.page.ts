import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
	selector: 'app-tabs',
	templateUrl: './tabs.page.html',
	styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

	title: string;

	constructor(private settingsService: SettingsService) {
		this.title = '';
	}

	ngOnInit() {
		this.settingsService.settings.subscribe(appInfo => {
			if (appInfo && appInfo.name) {
				this.title = appInfo.name;
			}
		});
	}

}
