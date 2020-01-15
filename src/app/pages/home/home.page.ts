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
		this.post.featuredPosts.subscribe(featuredPosts => {
			if (featuredPosts && featuredPosts.length) {
				this.featuredPosts = featuredPosts;
			}
		});
		this.settingsService.settings.subscribe(appInfo => {
			if (appInfo) {
				this.description = appInfo.description || '';
			}
		});
	}

	doRefresh(event) {
		this.settingsService.getAppInfo().subscribe(() => { }, () => { }, () => event.target.complete());
	}

}
