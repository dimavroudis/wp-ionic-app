import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { MediaService } from 'src/app/services/media.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Post, AppInfo } from 'src/app/models/wordpress';
import { NavController } from '@ionic/angular';
import Prism from 'prismjs';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
	selector: 'app-single',
	templateUrl: './single.page.html',
	styleUrls: ['./single.page.scss'],
})
export class SinglePage implements OnInit, AfterViewChecked {

	postId: number;
	post: Post;
	loading: boolean;
	postImage: any;
	pageId: number;
	isCommentsEnabled: boolean;

	constructor(
		private postService: PostService,
		private route: ActivatedRoute,
		private media: MediaService,
		private sanitizer: DomSanitizer,
		private navCtrl: NavController,
		private settingService: SettingsService
	) {
	}

	ngOnInit() {
		this.isCommentsEnabled = false;
		this.settingService.settings.subscribe((appInfo: AppInfo) => {
			if (appInfo && appInfo.comments) {
				this.isCommentsEnabled = appInfo.comments === 'enabled';
			}
		});
		this.loading = true;
		this.postId = +this.route.snapshot.paramMap.get('postId');
		this.pageId = +this.route.snapshot.paramMap.get('pageId');
		if (this.postId) {
			this.postService.getPost(this.postId).subscribe(post => {
				this.post = post;
				this.loading = false;
				if (this.post.featured_media) {
					this.postImage = this.sanitizer.
						bypassSecurityTrustStyle(`url('${this.media.getSourceUrl(this.post._embedded['wp:featuredmedia'][0], 'full')}')`);
				}
			});
		}
		if (this.pageId) {
			this.postService.getPage(this.pageId).subscribe(post => {
				this.post = post;
				this.loading = false;
				if (this.post.featured_media) {
					this.postImage = this.sanitizer.
						bypassSecurityTrustStyle(`url('${this.media.getSourceUrl(this.post._embedded['wp:featuredmedia'][0], 'full')}')`);
				}
			});
		}
	}

	ngAfterViewChecked(): void {
		Prism.highlightAll();
	}

	goBack() {
		this.navCtrl.pop();
	}

}
