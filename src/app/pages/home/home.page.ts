import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { SettingsService } from 'src/app/services/settings.service';
import { Post } from 'src/app/models/wordpress';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

	title: string;
	description: string;
	featuredPosts: Post[];
	latestPosts: Post[];

	constructor(private post: PostService, private settingsService: SettingsService) {
	}

	ngOnInit() {
		this.post.getPosts().subscribe(posts => {
			this.latestPosts = posts;
		});
		this.settingsService.settings.subscribe(appInfo => {
			if (appInfo) {
				this.title = appInfo.name;
				this.description = appInfo.description;
				if (appInfo.homeTab && appInfo.homeTab.featuredPosts.length > 0) {
					this.post.getPosts({ include: appInfo.homeTab.featuredPosts.toString() }).subscribe(posts => {
						this.featuredPosts = posts;
					});
				}
			}
		});
	}

}
