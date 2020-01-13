import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DomainGuard } from './guards/domain.guard';

const routes: Routes = [
	{
		path: 'intro',
		loadChildren: './pages/intro/intro.module#IntroPageModule'
	},
	{
		path: 'tabs',
		canActivate: [DomainGuard],
		loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
	},
	{
		path: 'post/:postId',
		canActivate: [DomainGuard],
		loadChildren: () => import('./pages/single/single.module').then(m => m.SinglePageModule)
	},
	{
		path: 'page/:pageId',
		canActivate: [DomainGuard],
		loadChildren: () => import('./pages/single/single.module').then(m => m.SinglePageModule)
	},
	{
		path: 'search',
		canActivate: [DomainGuard],
		loadChildren: () => import('./pages/search/search.module').then(m => m.SearchPageModule)
	},
	{
		path: 'tax/:taxonomy/term/:termId',
		canActivate: [DomainGuard],
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
		path: '',
		redirectTo: '/intro',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
