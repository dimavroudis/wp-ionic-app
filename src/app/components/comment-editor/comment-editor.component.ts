import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommentService } from 'src/app/services/comment.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Comment } from 'src/app/models/wordpress';
import { ToastService } from 'src/app/services/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';


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
	successMessage: string;

	constructor(
		public modalController: ModalController,
		private toast: ToastService,
		private commentService: CommentService,
		private translate: TranslateService,
		private auth: AuthService
	) { }

	ngOnInit() {
		this.translate.get('comment-success').subscribe(res => {
			this.successMessage = res;
		});
		this.auth.isLoggedIn.subscribe((isLoggedIn) => {
			if (!isLoggedIn) {
				this.commentForm = new FormGroup({
					author_name: new FormControl(this.comment ? this.comment.author_name : '', [Validators.required]),
					author_email: new FormControl(this.comment ? this.comment.author_email : '', [Validators.required]),
					author_url: new FormControl(this.comment ? this.comment.author_url : '', [Validators.required]),
					content: new FormControl(this.comment ? this.comment.content : '', [Validators.required]),
				});
			} else {
				this.commentForm = new FormGroup({
					content: new FormControl(this.comment ? this.comment.content : '', [Validators.required]),
				});
			}
		})
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
		this.commentService.createComment(comment).subscribe(res => {
			this.modalController.dismiss(res);
			this.toast.present(this.successMessage);
		});
	}
}
