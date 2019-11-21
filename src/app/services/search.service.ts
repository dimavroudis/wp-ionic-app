import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { SearchResult } from '../models/wordpress';

@Injectable({
	providedIn: 'root'
})
export class SearchService {

	constructor(private api: ApiService) { }

	search(searchString: string, args?: any): Observable<SearchResult[]> {
		if (args) {
			args.search = searchString;
		} else {
			args = {
				search: searchString
			}
		}
		return this.api.get('wp/v2/search', args);
	}

}
