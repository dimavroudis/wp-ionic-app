import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
	{
		path: 'tabs',
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
				loadChildren: () => import('../archive/archive.module').then(m => m.ArchivePageModule)
			},
			{
				path: 'top',
				data: {
					args: {
						sticky: true
					}
				},
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
				redirectTo: '/tabs/home',
				pathMatch: 'full'
			}
		]
	},
	{
		path: '',
		redirectTo: '/tabs/home',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TabsPageRoutingModule { }
