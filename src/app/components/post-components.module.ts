import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentService } from '../services/comment.service';
import { CommentBlockComponent } from './comment-block/comment-block.component';
import { CommentEditorComponent } from './comment-editor/comment-editor.component';
import { ShareComponent } from './share/share.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		MomentModule,
		TranslateModule,
		RouterModule,
		ReactiveFormsModule
	],
	entryComponents: [
		CommentEditorComponent
	],
	declarations: [
		CommentBlockComponent,
		CommentEditorComponent,
		CommentListComponent,
		ShareComponent
	],
	exports: [
		CommentBlockComponent,
		CommentEditorComponent,
		CommentListComponent,
		ShareComponent
	],
	providers: [
		CommentService
	]
})
export class PostComponentsModule { }
