import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	private domain: string;
	private namespace: string;
	private isHttps: boolean;
	private url: string;

	constructor(private translate: TranslateService) {
		// Your websites domain
		this.domain = 'domain.com';

		// The path for your endpoints
		this.namespace = 'wp-json/wp/v2';

		// Set to true if your website supports HTTPS
		this.isHttps = true;

		this.url = (this.isHttps ? 'https://' : 'https//') + this.domain + '/' + this.namespace;
	}

	getLang() {
		return this.translate.currentLang;
	}
}
