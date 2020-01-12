import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/wordpress';

@Component({
	selector: 'app-more',
	templateUrl: './more.page.html',
	styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {
	pages: Post[];

	constructor(private settingsService: SettingsService, private post: PostService) { }

	ngOnInit() {
		this.settingsService.settings.subscribe(appInfo => {
			if (appInfo && appInfo.moreTab.pages.length > 0) {
				this.post.getPages({ include: appInfo.moreTab.pages.toString() }).subscribe(pages => {
					this.pages = pages;
				});
			}
		});
	}

}
