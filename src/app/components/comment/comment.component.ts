import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/models/wordpress';

@Component({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {

	@Input() comment: Comment;

	constructor() { }

	ngOnInit() { }

}
