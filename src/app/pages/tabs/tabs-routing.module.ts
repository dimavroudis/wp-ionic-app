import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
	{
		path: 'root',
		component: TabsPage,
		children: [
			{
				path: 'home',
				children: [
					{
						path: '',
						loadChildren: () =>
							import('../home/home.module').then(m => m.HomePageModule)
					}
				]
			},
			{
				path: 'latest',
				data: { header: false, taxSlider: true},
				loadChildren: () => import('../archive/archive.module').then(m => m.ArchivePageModule)
			},
			{
				path: 'more',
				children: [
					{
						path: '',
						loadChildren: () =>
							import('../more/more.module').then(m => m.MorePageModule)
					}
				]
			},
			{
				path: '',
				redirectTo: '/tabs/root/home',
				pathMatch: 'full'
			}
		]
	},
	{
		path: '',
		redirectTo: '/tabs/root/home',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TabsPageRoutingModule { }
