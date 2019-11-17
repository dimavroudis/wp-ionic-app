import { Component, OnInit, Input } from '@angular/core';
import { MediaService } from 'src/app/services/media.service';

@Component({
	selector: 'app-post-list',
	templateUrl: './post-list.component.html',
	styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
	@Input() posts: any[];
	loading: boolean;
	featuredMedia: any[];

	constructor(private media: MediaService) {
		this.featuredMedia = [];
		this.loading = true;
	}

	ngOnInit() {
		const mediaIds = [];
		this.posts.map(async post => {
			mediaIds.push(post.featured_media);
		});
		this.media.getMedia(mediaIds).subscribe(res => {
			this.featuredMedia = res;
			this.loading = false;
		});
	}

	getFeaturedMedia(mediaId) {
		const imageObj = this.featuredMedia.find(media => media.id === mediaId);
		if(!imageObj){
			return  null;
		}
		return imageObj.media_details.sizes.full.source_url;
	}

	hasFeaturedMedia(mediaId) {
		return this.featuredMedia.find(media => media.id === mediaId);
	}

}
