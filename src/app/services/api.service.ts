import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	private domain: string;
	private namespace: string;
	private isHttps: boolean;
	private url: string;

	private defaultHeaders: { [name: string]: string } = {};

	constructor(private http: HttpClient, private translate: TranslateService) {
		// Website domain
		this.domain = 'dimitrismavroudis.gr/test/';

		// The path of endpoints
		this.namespace = 'wp-json';

		// HTTPS support
		this.isHttps = true;

		this.url = (this.isHttps ? 'https://' : 'http://') + this.domain + '/' + this.namespace;

	}

	get(endpoint: string, params?: any, reqOpts?: any): Observable<any> {
		let defaultReqOpts = {
			params: { 'lang': this.translate.currentLang },
			responseType: 'json'
		};
		if (!reqOpts) {
			reqOpts = defaultReqOpts;
		} else {
			if ('params' in reqOpts) {
				delete reqOpts.params;
			}
			reqOpts = {
				...defaultReqOpts,
				...reqOpts
			}
		}

		if (params) {
			Object.assign(reqOpts.params, params);
		}

		if (!reqOpts) {

		}

		return this.http.get(this.url + '/' + endpoint, this.getRequestOptions(reqOpts));
	}

	post(endpoint: string, body: any, reqOpts?: any): Observable<any> {
		return this.http.post(this.url + '/' + endpoint, body, this.getRequestOptions(reqOpts));
	}

	put(endpoint: string, body: any, reqOpts?: any): Observable<any> {
		return this.http.put(this.url + '/' + endpoint, body, this.getRequestOptions(reqOpts));
	}

	delete(endpoint: string, reqOpts?: any): Observable<any> {
		return this.http.delete(this.url + '/' + endpoint, this.getRequestOptions(reqOpts));
	}

	patch(endpoint: string, body: any, reqOpts?: any) {
		return this.http.patch(this.url + '/' + endpoint, body, this.getRequestOptions(reqOpts));
	}

	private getRequestOptions(reqOpts) {
		let headers = this.defaultHeaders;

		if (!reqOpts) {
			return { headers }
		}
		if ('headers' in reqOpts) {
			headers = {
				headers: this.defaultHeaders,
				...reqOpts.headers
			}
			delete reqOpts.headers;
		}

		return {
			headers,
			...reqOpts
		}
	}

	setHeader(header: { [name: string]: string }) {
		return Object.assign(this.defaultHeaders, header);
	}

	unsetHeader(key: string) {
		delete this.defaultHeaders[key];
	}
}
