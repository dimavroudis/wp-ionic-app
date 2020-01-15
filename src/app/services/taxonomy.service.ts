import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Taxonomy, Term } from '../models/wordpress';
import { SettingsService } from './settings.service';

@Injectable({
	providedIn: 'root'
})
export class TaxonomyService {
	featuredCategories: BehaviorSubject<Term[]>;

	constructor(private api: ApiService, private settingsService: SettingsService) {
		this.featuredCategories = new BehaviorSubject(null);
		this.settingsService.settings.subscribe(appInfo => {
			if (appInfo) {
				if (appInfo.featured_categories && appInfo.featured_categories.length > 0) {
					this.getTaxonomyTerms('categories', { include: appInfo.featured_categories }).subscribe(categories => {
						this.featuredCategories.next(categories);
					});
				} else {
					this.getTaxonomyTerms('categories').subscribe(data => {
						this.featuredCategories.next(data);
					});
				}
			}
		});
	}

	getTaxonomies(postType: string): Observable<Taxonomy[]> {
		return this.api.get('wp/v2/taxonomies', { type: postType });
	}

	getTaxonomy(taxonomy: string): Observable<Taxonomy> {
		return this.api.get('wp/v2/taxonomies', { taxonomy });
	}

	getTaxonomyTerms(taxonomy: string, args?: any): Observable<Term[]> {
		return this.api.get('wp/v2/' + taxonomy, args);
	}

	getTaxonomyTerm(taxonomy: string, id: number, args?: any): Observable<Term> {
		return this.api.get('wp/v2/' + taxonomy + '/' + id, args);
	}
}
