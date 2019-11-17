import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { MediaService } from 'src/app/services/media.service';
import { loadingController } from '@ionic/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

	latestPosts: any[];
	title: string;
	description: any;

	constructor(private post: PostService, private settings: SettingsService) {
	}

	ngOnInit() {
		this.settings.geAppInfo().subscribe(app => {
			this.title = app.title;
			this.description = app.description;
		})
		this.post.getPosts().subscribe(async posts => {
			this.latestPosts = posts;
		});
	}

}
