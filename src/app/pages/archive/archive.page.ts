import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { TaxonomyService } from 'src/app/services/taxonomy.service';
import { Post, Term } from 'src/app/models/wordpress';

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

	constructor(private postService: PostService, private taxonomiesService: TaxonomyService, private route: ActivatedRoute) {
	}

	ngOnInit(): void {
		this.termId = +this.route.snapshot.paramMap.get('termId');
		this.taxonomyBase = this.route.snapshot.paramMap.get('taxonomy');
		this.initArchive();
	}


	initArchive(): void {
		this.loading = true;
		this.args = {};
		this.args.page = this.page = 1;
		if (this.taxonomyBase) {
			this.args[this.taxonomyBase] = this.termId;
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
		});
	}

	getNextPage(event): void {
		this.args.page = ++this.page;
		this.postService.getPosts(this.args).subscribe(posts => {
			this.posts = [...this.posts, ...posts];
			event.target.complete();
		});
	}
}

