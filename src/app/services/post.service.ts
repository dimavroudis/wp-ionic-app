import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Post, SearchResult } from '../models/wordpress';
import { SettingsService } from './settings.service';

@Injectable({
	providedIn: 'root'
})
export class PostService {
	public featuredPages: BehaviorSubject<Post[]>;
	public featuredPosts: BehaviorSubject<Post[]>;


	constructor(private api: ApiService, private settingsService: SettingsService) {
		this.featuredPosts = new BehaviorSubject(null);
		this.featuredPages = new BehaviorSubject(null);
		this.settingsService.settings.subscribe(appInfo => {
			if (appInfo) {
				if (appInfo.featured_posts) {
					this.getPosts({ include: appInfo.featured_posts.toString() }).subscribe(posts => {
						this.featuredPosts.next(posts);
					});
				}
				if (appInfo.featured_pages) {
					this.getPages({ include: appInfo.featured_pages.toString() }).subscribe(pages => {
						this.featuredPages.next(pages);
					});
				}
			}
		});
	}

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
		return this.api.get('wp/v2/pages/' + id, args);
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
