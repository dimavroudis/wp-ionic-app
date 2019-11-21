import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PostListComponent } from './post-list/post-list.component';
import { PostSliderComponent } from './post-slider/post-slider.component';
import { TaxonomySliderComponent } from './taxonomy-slider/taxonomy-slider.component';
import { MomentModule } from 'ngx-moment';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		MomentModule,
		TranslateModule
	],
	declarations: [ PostListComponent, PostSliderComponent, TaxonomySliderComponent],
	exports: [PostListComponent, PostSliderComponent, TaxonomySliderComponent]
})
export class ComponentsModule { }
