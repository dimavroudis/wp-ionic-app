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
	stickyPosts: Post[];
	latestPosts: Post[];

	constructor(private post: PostService, private settings: SettingsService) {
	}

	ngOnInit() {
		this.post.getPosts().subscribe(async posts => {
			this.latestPosts = posts;
		});
		this.post.getPosts({ sticky: true }).subscribe(async posts => {
			this.stickyPosts = posts;
		});
		this.settings.getAppInfo().subscribe(data => {
			this.title = data.name;
			this.description = data.description;
		});
	}

}
