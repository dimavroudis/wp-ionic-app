import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PostSliderComponent } from './post-slider/post-slider.component';
import { TaxonomySliderComponent } from './taxonomy-slider/taxonomy-slider.component';
import { MomentModule } from 'ngx-moment';
import { TranslateModule } from '@ngx-translate/core';
import { PostCardComponent } from './post-card/post-card.component';
import { SkeletonCardComponent } from './skeleton-card/skeleton-card.component';
import { RouterModule } from '@angular/router';

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
		PostCardComponent,
		PostSliderComponent,
		TaxonomySliderComponent,
		SkeletonCardComponent,
	],
	exports: [
		PostCardComponent,
		PostSliderComponent,
		TaxonomySliderComponent,
		SkeletonCardComponent,
	]
})
export class ComponentsModule { }
