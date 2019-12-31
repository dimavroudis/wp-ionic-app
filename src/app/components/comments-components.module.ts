import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { CommentComponent } from './comment/comment.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentService } from '../services/comment.service';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		MomentModule,
		TranslateModule,
		RouterModule
	],
	declarations: [
		CommentComponent,
		CommentListComponent
	],
	exports: [
		CommentComponent,
		CommentListComponent
	],
	providers: [
		CommentService
	]
})
export class CommentsComponentsModule { }
