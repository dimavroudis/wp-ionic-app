import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SearchService {

	constructor(private api: ApiService) { }

	search(searchString = '', page = 1, perPage = 10, type = 'post'): Observable<any> {
		return this.api.get('wp/v2/search', { search: searchString });
	}

}
