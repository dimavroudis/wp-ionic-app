import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/models/wordpress';
import { CommentService } from 'src/app/services/comment.service';
import { ModalController } from '@ionic/angular';
import { CommentEditorComponent } from '../comment-editor/comment-editor.component';

@Component({
	selector: 'app-comment-block',
	templateUrl: './comment-block.component.html',
	styleUrls: ['./comment-block.component.scss'],
})
export class CommentBlockComponent implements OnInit {

	showReplies: boolean;
	@Input() comment: Comment;
	loading: boolean;
	hasReplies: boolean;

	constructor(private commentService: CommentService, public modalController: ModalController) { }

	ngOnInit() {
		this.hasReplies = this.comment?._links?.children.length > 0;
	}

	getChildComments() {
		if (!this.comment.children) {
			this.loading = true;
			this.commentService.getCommentsByParent(this.comment.id, { per_page: 100 }).subscribe(
				data => {
					if (data.length) {
						this.comment.children = data;
						this.showReplies = true;
					} else {
						this.hasReplies = false;
					}
				},
				() => { },
				() => this.loading = false
			);
		} else {
			this.showReplies = true;
		}
	}

	async openEditor() {
		const modal = await this.modalController.create({
			component: CommentEditorComponent,
			componentProps: { parentId: this.comment.id, postId: this.comment.post }
		});
		return await modal.present();
	}

}
