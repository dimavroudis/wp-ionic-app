import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		TabsPageRoutingModule,
		TranslateModule
	],
	declarations: [TabsPage]
})
export class TabsPageModule { }
