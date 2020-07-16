import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
	},
	{
		path: 'post/:postId',
		loadChildren: () => import('./pages/single/single.module').then(m => m.SinglePageModule)
	},
	{
		path: 'page/:pageId',
		loadChildren: () => import('./pages/single/single.module').then(m => m.SinglePageModule)
	},
	{
		path: 'search',
		loadChildren: () => import('./pages/search/search.module').then(m => m.SearchPageModule)
	},
	{
		path: 'tax/:taxonomy/term/:termId',
		data: { header: true, taxSlider: false },
		children: [
			{
				path: '',
				loadChildren: () => import('./pages/archive/archive.module').then(m => m.ArchivePageModule)
			},
			{
				path: 'exclude/:excludeId',
				loadChildren: () => import('./pages/archive/archive.module').then(m => m.ArchivePageModule)
			}
		]
	},
	{
		path: 'auth',
		loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
	},
	{
		path: 'settings',
		loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
	},
	{
		path: 'profile',
		loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
