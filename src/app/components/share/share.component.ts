import { Component, Input } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
	selector: 'app-share',
	templateUrl: './share.component.html',
	styleUrls: ['./share.component.scss'],
})
export class ShareComponent {

	@Input() link: string;
	@Input() text: string;
	@Input() subject: string;
	@Input() color = 'primary';

	constructor(private social: SocialSharing) { }

	share() {
		if (!this.link) {
			throw Error('No link to share');
		}

		if (navigator['share']) {
			navigator['share']({
				title: this.subject || '',
				text: this.text || '',
				url: this.link
			});
		} else {
			this.social.shareWithOptions({
				subject: this.subject || '',
				message: this.text || '',
				url: this.link
			});
		}
	}

}
