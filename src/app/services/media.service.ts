import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Media } from '../models/wordpress';
@Injectable({
	providedIn: 'root'
})
export class MediaService {

	constructor(private api: ApiService) { }

	getMedia(ids: Array<number>, options = {}): Observable<Media[]> {
		if (!ids) {
			throw Error('No media IDs defined');
		}
		const args = Object.assign(options, { include: ids.toString() });
		return this.api.get('wp/v2/media', args);
	}

	getSingleMedia(id: number, args?: any): Observable<Media> {
		if (!id) {
			throw Error('No media ID defined');
		}
		return this.api.get('wp/v2/media/' + id, args);
	}

	getSourceUrl(media: any, size: string) {
		return media.media_details.sizes[size].source_url;
	}

}
