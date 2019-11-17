import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { PostCardComponent } from './post-card/post-card.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostSliderComponent } from './post-slider/post-slider.component';
import { TaxonomySliderComponent } from './taxonomy-slider/taxonomy-slider.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
	],
	declarations: [PostCardComponent, PostListComponent, PostSliderComponent, TaxonomySliderComponent],
	exports: [PostCardComponent, PostListComponent, PostSliderComponent, TaxonomySliderComponent]
})
export class ArchiveComponentsModule { }
