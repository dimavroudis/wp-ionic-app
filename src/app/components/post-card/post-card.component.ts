import { Component, OnInit, Input } from '@angular/core';
import { MediaService } from 'src/app/services/media.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Post } from 'src/app/models/wordpress';

@Component({
	selector: 'app-post-card',
	templateUrl: './post-card.component.html',
	styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {

	@Input() post: Post;

	constructor(private media: MediaService, private sanitizer: DomSanitizer) {
	}

	ngOnInit() {
	}

	getFeaturedMedia() {
		if (this.post._embedded['wp:featuredmedia']) {
			return this.sanitizer.bypassSecurityTrustStyle(`url('${this.media.getSourceUrl(this.post._embedded['wp:featuredmedia'][0], 'full')}')`);
		}
		return '';
	}
}
