import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Taxonomy, Term } from '../models/wordpress';

@Injectable({
	providedIn: 'root'
})
export class TaxonomyService {

	constructor(private api: ApiService) { }

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
