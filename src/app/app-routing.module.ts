import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
	},
	{
		path: 'post/:id',
		loadChildren: () => import('./pages/single/single.module').then(m => m.SinglePageModule)
	},
	{
		path: 'page/:id',
		loadChildren: () => import('./pages/single/single.module').then(m => m.SinglePageModule)
	},
	{
		path: 'search',
		loadChildren: () => import('./pages/search/search.module').then(m => m.SearchPageModule)
	},
	{
		path: 'archive',
		children: [
			{
				path: '',
				loadChildren: () => import('./pages/archive/archive.module').then(m => m.ArchivePageModule)
			},
			{
				path: 'tax/:taxonomy/term/:termId',
				loadChildren: () => import('./pages/archive/archive.module').then(m => m.ArchivePageModule)
			}
		]
	},
	{ path: 'comments', loadChildren: './pages/comments/comments.module#CommentsPageModule' },
	{ path: 'comment', loadChildren: './pages/comment/comment.module#CommentPageModule' },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
