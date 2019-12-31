import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/models/wordpress';

@Component({
	selector: 'app-comment-list',
	templateUrl: './comment-list.component.html',
	styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {

	@Input() postId: number;
	comments: Comment[];
	args: any;
	page: number;
	_COMMENTS: Comment[];
	isLast: boolean;

	constructor(private comment: CommentService) { }

	ngOnInit() {
		this.args = {};
		this.page = 0;
		this.isLast = false;
		this.comment.getComments(this.postId).subscribe(data => {
			if (data.length) {
				this._COMMENTS = data;
				this.comments = this.comment.sortCommentsHierarchically(data);
			} else {
				this.isLast = true;
			}
		});
	}

	getNextPage(): void {
		this.args.page = ++this.page;
		this.comment.getComments(this.postId, this.args).subscribe(data => {
			if (data.length) {
				this._COMMENTS = [...this._COMMENTS, ...data];
				this.comments = this.comment.sortCommentsHierarchically(this._COMMENTS);
			} else {
				this.isLast = true;
			}
		});
	}

}
