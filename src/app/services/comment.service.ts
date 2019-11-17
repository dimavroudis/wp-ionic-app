import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root'
})
export class CommentService {

	constructor(private api: ApiService) { }

	getComments(postId: number, args = {}): Observable<any> {
		if (!postId) {
			throw Error('No post ID defined');
		}
		args['post'] = postId;
		return this.api.get('wp/v2/comments', args);
	}

}
