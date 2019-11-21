import { Component, OnInit, Input } from '@angular/core';
import { MediaService } from 'src/app/services/media.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Post } from 'src/app/models/wordpress';

@Component({
	selector: 'app-post-list',
	templateUrl: './post-list.component.html',
	styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
	@Input() posts: Post[];

	constructor(private media: MediaService, private sanitizer: DomSanitizer) {
	}

	ngOnInit() {
	}

	getFeaturedMedia(post) {
		return this.sanitizer.bypassSecurityTrustStyle(`url('${this.media.getSourceUrl(post._embedded['wp:featuredmedia'][0], 'full')}')`);
	}

}
