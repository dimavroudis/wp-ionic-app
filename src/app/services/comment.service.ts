import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Comment } from '../models/wordpress';

@Injectable({
	providedIn: 'root'
})
export class CommentService {

	constructor(private api: ApiService) { }

	getComments(postId: number, options = {}): Observable<Comment[]> {
		if (!postId) {
			throw Error('No post ID defined');
		}
		const args = Object.assign(options, { post: postId });
		return this.api.get('wp/v2/comments', args);
	}

	sortCommentsHierarchically(comments) {
		comments.forEach((parentComment, index) => {
			comments[index].children = comments.filter(comment => parentComment.id === comment.parent);
		});
		comments = comments.filter(comment => !comment.parent);
		return comments;
	}

}
