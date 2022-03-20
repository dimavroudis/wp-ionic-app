import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/wordpress';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-more',
	templateUrl: './more.page.html',
	styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {
	featuredPages: Post[];
	links: { label: string, url: string, icon: string }[];

	constructor(private post: PostService, private settingsService: SettingsService, public auth: AuthService) { }

	ngOnInit() {
		this.post.featuredPages.subscribe(featuredPages => {
			if (featuredPages && featuredPages.length) {
				this.featuredPages = featuredPages;
			}
		});
		this.settingsService.settings.subscribe(appInfo => {
			if (appInfo && appInfo.links) {
				this.links = appInfo.links;
			}
		});
	}

}
