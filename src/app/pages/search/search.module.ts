import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchPage } from './search.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
	{
		path: '',
		component: SearchPage
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		TranslateModule,
		ComponentsModule,
		RouterModule.forChild(routes)
	],
	declarations: [SearchPage]
})
export class SearchPageModule { }
