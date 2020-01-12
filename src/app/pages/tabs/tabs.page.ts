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
	moreTab: boolean;

	constructor(private settingsService: SettingsService) {
	}

	ngOnInit() {
		this.settingsService.settings.subscribe(appInfo => {
			if (appInfo) {
				this.title = appInfo.name;
				this.description = appInfo.description;
				this.moreTab = appInfo.moreTab && appInfo.moreTab.pages.length > 0;
			}
		});
	}

}
