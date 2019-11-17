import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class MediaService {

	constructor(private api: ApiService) { }

	getMedia(ids: Array<string>): Observable<any> {
		if (!ids) {
			throw Error('No media IDs defined');
		}
		return this.api.get('wp/v2/media', { include: ids.toString() }).pipe(
			map(res => {
				return res;
			})
		);
	}

	getSingleMedia(id: string, size: string): Observable<any> {
		if (!id) {
			throw Error('No media ID defined');
		}
		return this.api.get('wp/v2/media/' + id).pipe(
			map((res: any) => {
				return res.media_details.sizes[size];
			})
		);
	}

}
