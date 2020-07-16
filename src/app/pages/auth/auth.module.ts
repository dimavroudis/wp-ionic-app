import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AuthPage } from './auth.page';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
	{
		path: '',
		component: AuthPage
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ReactiveFormsModule,
		TranslateModule,
		RouterModule.forChild(routes)
	],
	declarations: [AuthPage]
})
export class AuthPageModule { }
