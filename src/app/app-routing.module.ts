import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

	{ path: '', loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule) },
	{
		path: 'post',
		children: [
			{
				path: ':id',
				children: [
					{ path: '', loadChildren: () => import('./pages/single/single.module').then(m => m.SinglePageModule) },
					{ path: 'comments', loadChildren: () => import('./pages/comments/comments.module').then(m => m.CommentsPageModule) }
				]
			},
			{
				path: '',
				redirectTo: 'tabs',
				pathMatch: 'full'
			},
		]
	},
	{
		path: 'page/:id',
		loadChildren: () => import('./pages/single/single.module').then(m => m.SinglePageModule)
	},
	{
		path: 'search',
		loadChildren: () => import('./pages/search/search.module').then(m => m.SearchPageModule)
	},
	{ path: 'comment/:id', loadChildren: () => import('./pages/comment/comment.module').then(m => m.CommentPageModule) },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
