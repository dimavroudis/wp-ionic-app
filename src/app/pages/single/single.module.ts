import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SinglePage } from './single.page';
import { MomentModule } from 'ngx-moment';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
	{
		path: '',
		component: SinglePage
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		MomentModule,
		TranslateModule,
		RouterModule.forChild(routes)
	],
	declarations: [SinglePage]
})
export class SinglePageModule { }
