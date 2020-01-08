import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommentService } from 'src/app/services/comment.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Comment } from 'src/app/models/wordpress';


@Component({
	selector: 'app-comment-editor',
	templateUrl: './comment-editor.component.html',
	styleUrls: ['./comment-editor.component.scss'],
})
export class CommentEditorComponent implements OnInit {

	@Input() postId: string;
	@Input() parentId: string;
	@Input() comment: Comment;

	commentForm: FormGroup;

	constructor(public modalController: ModalController, private commentService: CommentService) { }

	ngOnInit() {
		this.commentForm = new FormGroup({
			author_name: new FormControl(this.comment ? this.comment.author_name : '', [Validators.required]),
			author_email: new FormControl(this.comment ? this.comment.author_email : '', [Validators.required]),
			author_url: new FormControl(this.comment ? this.comment.author_url : '', [Validators.required]),
			content: new FormControl(this.comment ? this.comment.content : '', [Validators.required]),
		});
	}

	dismiss() {
		this.modalController.dismiss();
	}

	submit() {
		const comment = this.commentForm.value;
		if (this.postId) {
			comment['post'] = this.postId;
		}
		if (this.parentId) {
			comment['parent'] = this.parentId;
		}
		this.commentService.createComment(this.comment).subscribe();
	}
}
