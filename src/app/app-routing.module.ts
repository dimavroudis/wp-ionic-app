import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
	{ path: 'single', loadChildren: () => import('./pages/single/single.module').then(m => m.SinglePageModule) },
	{ path: 'search', loadChildren: () => import('./pages/search/search.module').then(m => m.SearchPageModule) },
	{ path: 'categories', loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesPageModule) },
	{ path: 'archive', loadChildren: () => import('./pages/archive/archive.module').then(m => m.ArchivePageModule) },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
