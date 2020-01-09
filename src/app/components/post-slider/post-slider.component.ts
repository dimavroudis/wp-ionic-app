import { Component, OnInit, Input } from '@angular/core';
import { MediaService } from 'src/app/services/media.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Post } from 'src/app/models/wordpress';
@Component({
	selector: 'app-post-slider',
	templateUrl: './post-slider.component.html',
	styleUrls: ['./post-slider.component.scss'],
})
export class PostSliderComponent implements OnInit {
	@Input() posts: Post[];
	slideOpts = {
		initialSlide: 0,
		speed: 400,
		spaceBetween: 10,
		slidesPerView: 2.5,
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			420: {
				slidesPerView: 1.2,
			},
			620: {
				slidesPerView: 1.5,
			},
			768: {
				slidesPerView: 2,
			}
		}
	};

	constructor(private media: MediaService, private sanitizer: DomSanitizer) {
	}

	ngOnInit() {
	}

	getFeaturedMedia(post) {
		if (post._embedded['wp:featuredmedia']) {
			return this.sanitizer.bypassSecurityTrustStyle(`url('${this.media.getSourceUrl(post._embedded['wp:featuredmedia'][0], 'full')}')`);
		}
		return '';
	}


}
