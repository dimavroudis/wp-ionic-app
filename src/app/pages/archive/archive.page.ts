import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { TaxonomyService } from 'src/app/services/taxonomy.service';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-archive',
	templateUrl: './archive.page.html',
	styleUrls: ['./archive.page.scss'],
})
export class ArchivePage implements OnInit {

	posts: any[];
	term: any;
	taxonomy: string;
	termId: string;
	page: number;
	args: any;
	loading: boolean;

	constructor(private post: PostService, private taxonomies: TaxonomyService, private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.termId = this.route.snapshot.paramMap.get('termId');
		this.taxonomy = this.route.snapshot.paramMap.get('taxonomy');
		this.initArchive();
	}


	initArchive() {
		this.loading = true;
		this.args = {};
		this.args.page = this.page = 1;
		if (this.taxonomy) {
			this.args[this.taxonomy] = this.termId;
			this.taxonomies.getTaxonomyTerm(this.taxonomy, this.termId).subscribe(term => {
				this.term = term;
			});
		}
		this.post.getPosts(this.args).subscribe(posts => {
			this.posts = posts;
			this.loading = false;
		});
	}

	doRefresh(event) {
		this.args.page = this.page = 1;
		this.post.getPosts(this.args).subscribe((posts) => {
			this.posts = posts;
			event.target.complete();
		});
	}

	getNextPage(event) {
		this.args.page = ++this.page;
		this.post.getPosts(this.args).subscribe(posts => {
			this.posts = [...this.posts, ...posts];
			event.target.complete();
		});
	}
}
