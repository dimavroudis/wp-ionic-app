import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Post, Factory, SearchResult } from '../models/wordpress';

@Injectable({
	providedIn: 'root'
})
export class PostService {


	constructor(private api: ApiService) { }

	getPosts(args = {}): Observable<Post[]> {
		args = Object.assign(args, { _embed: true });
		return this.api.get('wp/v2/posts', args);
	}

	getPages(args = {}): Observable<Post[]> {
		args = Object.assign(args, { _embed: true });
		return this.api.get('wp/v2/pages', args);
	}

	getPost(id: number, args = {}): Observable<Post> {
		if (!id) {
			throw Error('No post ID defined');
		}
		args = Object.assign(args, { _embed: true });
		return this.api.get('wp/v2/posts/' + id, args);
	}

	getPostBySlug(slug: string): Observable<Post> {
		if (!slug) {
			throw Error('No post ID defined');
		}
		return this.api.get('wp/v2/posts', { slug, _embed: true });
	}

	getPage(id: number, args = {}): Observable<Post> {
		if (!id) {
			throw Error('No page ID defined');
		}
		args = Object.assign(args, { _embed: true });
		return this.api.get('wp/v2/pages/' + id);
	}

	search(searchString: string, args?: any): Observable<SearchResult[]> {
		if (args) {
			args.search = searchString;
		} else {
			args = {
				search: searchString
			};
		}
		return this.api.get('wp/v2/search', args);
	}

}
