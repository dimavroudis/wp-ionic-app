import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/models/wordpress';
import { CommentEditorComponent } from '../comment-editor/comment-editor.component';
import { ModalController } from '@ionic/angular';

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
	isLast: boolean;
	loading: boolean;

	constructor(private comment: CommentService, public modalController: ModalController) { }

	ngOnInit() {
		this.args = { per_page: 100, orderby: 'date_gmt', order: 'asc', parent: 0 };
		this.page = 1;
		this.isLast = false;
		this.loading = true;
		this.comment.getComments(this.postId, this.args).subscribe(
			data => {
				if (data.length) {
					this.comments = data;
					this.isLast = data.length < this.args.per_page;
				} else {
					this.isLast = true;
				}
			},
			() => { },
			() => this.loading = false
		);
	}

	getNextPage(): void {
		this.args.page = ++this.page;
		this.loading = true;
		this.comment.getComments(this.postId, this.args).subscribe(
			data => {
				if (data.length) {
					this.comments = [...this.comments, ...data];
					this.isLast = data.length < this.args.per_page;
				} else {
					this.isLast = true;
				}
			},
			() => { },
			() => this.loading = false
		);
	}

	async openEditor() {
		const modal = await this.modalController.create({
			component: CommentEditorComponent,
			componentProps: { postId: this.postId }
		});
		return await modal.present();
	}

}
