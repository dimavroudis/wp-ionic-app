import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PostService {

	constructor(private api: ApiService) { }

	getPosts(args = {}): Observable<any> {
		return this.api.get('wp/v2/posts', args)
	}

	getPages(args = {}): Observable<any> {
		return this.api.get('wp/v2/pages', args);
	}

	getPost(id): Observable<any> {
		if (!id) {
			throw Error('No post ID defined');
		}
		return this.api.get('wp/v2/posts/' + id);
	}

	getPage(id): Observable<any> {
		if (!id) {
			throw Error('No page ID defined');
		}
		return this.api.get('wp/v2/pages/' + id);
	}
}
