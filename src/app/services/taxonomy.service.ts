import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root'
})
export class TaxonomyService {

	constructor(private api: ApiService) { }

	getTaxonomies(postType: string) {
		return this.api.get('wp/v2/taxonomies', { type: postType });
	}

	getTaxonomy(taxonomy: string) {
		return this.api.get('wp/v2/taxonomies', { taxonomy });
	}

	getTaxonomyTerms(taxonomy: string, args?: any) {
		return this.api.get('wp/v2/' + taxonomy, args);
	}

	getTaxonomyTerm(taxonomy: string, id: string, args?: any) {
		return this.api.get('wp/v2/' + taxonomy + '/' + id, args);
	}
}
