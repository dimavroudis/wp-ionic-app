import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { TaxonomyService } from 'src/app/services/taxonomy.service';
import { Post, Term } from 'src/app/models/wordpress';
import { NavController } from '@ionic/angular';

@Component({
	selector: 'app-archive',
	templateUrl: './archive.page.html',
	styleUrls: ['./archive.page.scss'],
})
export class ArchivePage implements OnInit {

	posts: Post[];
	term: Term;
	taxonomyBase: string;
	termId: number;
	page: number;
	args: any;
	loading: boolean;
	lastPage: boolean;
	view: { header: { enabled: boolean, title: string }, taxSlider: { enabled: boolean } };
	excludeId: number;

	constructor(
		private postService: PostService,
		private taxonomyService: TaxonomyService,
		private route: ActivatedRoute,
		private navCtrl: NavController
	) {
	}

	ngOnInit(): void {
		this.args = this.route.snapshot.data.args;
		this.view = {
			header: {
				enabled: this.route.snapshot.data.header,
				title: ''
			},
			taxSlider: {
				enabled: this.route.snapshot.data.taxSlider
			}
		};
		this.termId = +this.route.snapshot.paramMap.get('termId');
		this.taxonomyBase = this.route.snapshot.paramMap.get('taxonomy');
		if (this.taxonomyBase && this.termId) {
			this.taxonomyService.getTaxonomyTerm(this.taxonomyBase, this.termId).subscribe(data => this.view.header.title = data.name);
		}
		this.excludeId = +this.route.snapshot.paramMap.get('excludeId');
		this.initArchive();
	}


	initArchive(): void {
		this.loading = true;
		this.lastPage = false;
		this.args = this.args || {};
		this.args.page = this.page = 1;
		if (this.termId) {
			this.args[this.taxonomyBase] = this.termId;
		}
		if (this.excludeId) {
			this.args['exclude'] = this.excludeId;
		}
		this.postService.getPosts(this.args).subscribe(posts => {
			this.posts = posts;
			this.loading = false;
		});
	}

	doRefresh(event): void {
		this.args.page = this.page = 1;
		this.postService.getPosts(this.args).subscribe((posts) => {
			this.posts = posts;
			event.target.complete();
		}, () => {
			event.target.complete();
		});
	}

	selectNewCategory(term: Term, taxonomyBase: string) {
		if (term) {
			this.termId = term.id;
			this.taxonomyBase = taxonomyBase;
		} else {
			this.termId = null;
		}
		this.initArchive();
	}

	getNextPage(event): void {
		this.args.page = ++this.page;
		this.postService.getPosts(this.args).subscribe(posts => {
			this.posts = [...this.posts, ...posts];
			event.target.complete();
		}, (error) => {
			event.target.complete();
			if (error.error.code === 'rest_post_invalid_page_number') {
				this.lastPage = true;
			}
		});
	}

	goBack() {
		this.navCtrl.back();
	}
}

