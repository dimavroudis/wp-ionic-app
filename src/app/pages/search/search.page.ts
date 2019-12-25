import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchResult } from 'src/app/models/wordpress';
import { PostService } from 'src/app/services/post.service';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'app-search',
	templateUrl: './search.page.html',
	styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

	loading: boolean;
	posts: SearchResult[];
	query: string;
	latestSearches: { term: string, count: number, date: Date }[];
	searchSubscription: Subscription;

	_MIN_CHAR = 1;
	_MS_PER_DAY = 1000 * 60 * 60 * 24;
	page: number;
	lastPage: boolean;

	constructor(private post: PostService, private storage: Storage) {
		this.posts = [];
		this.latestSearches = [];
	}

	ngOnInit() {
		const currentDate = new Date();

		this.storage.get('latestSearches').then(data => {
			if (data) {
				this.latestSearches = JSON.parse(data).filter(searchTerm => {
					const diffTime = this.dateDiffInDays(new Date(searchTerm.date), currentDate);
					console.log(diffTime);
					if (diffTime < 7) {
						return searchTerm;
					}
				});
				this.storage.set('latestSearches', JSON.stringify(this.latestSearches));
			}
		});
	}

	dateDiffInDays(a, b) {
		const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
		const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

		return Math.floor((utc2 - utc1) / this._MS_PER_DAY);
	}

	search(value?: string) {
		if (this.query !== value) {
			if (this.searchSubscription) {
				this.searchSubscription.unsubscribe();
			}
			if (value && value.length >= this._MIN_CHAR) {
				this.query = value;
				this.loading = true;
				this.page = 1;
				this.lastPage = false;
				this.searchSubscription = this.post.search(this.query, { subtype: 'post' }).subscribe(data => {
					this.posts = data;
					this.loading = false;
					if (this.posts.length) {
						this.addToLatestSearch(this.query);
					} else {
						this.lastPage = true;
					}
				});
			} else if (!value) {
				this.query = '';
			}
		}
	}

	nextPage(event) {
		this.page++;
		this.post.search(this.query, { page: this.page, subtype: 'post' }).subscribe(data => {
			if (data.length) {
				this.posts = [...this.posts, ...data];
			} else {
				this.lastPage = true;
			}
			event.target.complete();
		}, () => {
			this.lastPage = true;
			event.target.complete();
		});
	}

	async addToLatestSearch(query: string) {
		const index = this.latestSearches.findIndex(search => search.term === query);
		if (index > -1) {
			this.latestSearches[index].count++;
		} else {
			this.latestSearches.push({ term: query, count: 1, date: new Date() });
		}
		this.latestSearches.sort((a, b) => b.count - a.count);

		await this.storage.set('latestSearches', JSON.stringify(this.latestSearches));
	}

}
