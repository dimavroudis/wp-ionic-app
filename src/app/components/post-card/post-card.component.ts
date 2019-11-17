import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-post-card',
	templateUrl: './post-card.component.html',
	styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {

	@Input() title;
	@Input() featuredMedia;
	@Input() slug;
	@Input() excerpt;
	backgroundImg: any;
	constructor(private sanitizer: DomSanitizer) { }

	ngOnInit() {
		this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle(`url('${this.featuredMedia}')`);
	}

}
