import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpEvent } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	private domain: string;
	private namespace: string;
	private isHttps: boolean;
	private url: string;

	constructor(private http: HttpClient, private translate: TranslateService) {

		// The path of endpoints
		this.namespace = 'wp-json';

		// HTTPS support
		this.isHttps = true;
	}

	get(endpoint: string, params?: any, reqOpts?: any): Observable<any> {
		if (!reqOpts) {
			reqOpts = {
				responseType: 'json',
			};
		}
		// Support easy query params for GET requests
		reqOpts.params = new HttpParams();
		reqOpts.params = reqOpts.params.set('lang', this.getLang());
		if (params) {
			for (let k in params) {
				if (k) {
					reqOpts.params = reqOpts.params.set(k, params[k]);
				}
			}
		}

		return this.http.get(this.url + '/' + endpoint, reqOpts);
	}

	post(endpoint: string, body: any, reqOpts?: any): Observable<any> {
		return this.http.post(this.url + '/' + endpoint, body, reqOpts);
	}

	put(endpoint: string, body: any, reqOpts?: any): Observable<any> {
		return this.http.put(this.url + '/' + endpoint, body, reqOpts);
	}

	delete(endpoint: string, reqOpts?: any): Observable<any> {
		return this.http.delete(this.url + '/' + endpoint, reqOpts);
	}

	patch(endpoint: string, body: any, reqOpts?: any) {
		return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
	}

	getLang(): string {
		return this.translate.currentLang;
	}

	setDomain(domain) {
		return this.isDomainValid(domain).pipe(
			map(isValid => {
				if (isValid) {
					this.domain = domain;
					this.url = (this.isHttps ? 'https://' : 'https//') + this.domain + '/' + this.namespace;
					return true;
				}
				return false;
			})
		);
	}

	private isDomainValid(domain) {
		return this.http.get((this.isHttps ? 'https://' : 'https//') + domain + '/' + this.namespace + '/').pipe(
			map((data => true)),
			catchError((err) => of(false))
		);
	}

	hasDomain() {
		return this.domain ? true : false;
	}

	getDomain(){
		return this.domain;
	}
}
