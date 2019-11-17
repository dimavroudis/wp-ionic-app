import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SettingsService {

	title: string;
	description: string;
	gmtOffset: string;
	homeUrl: string;

	constructor(private api: ApiService) { }

	geAppInfo(): Observable<any> {
		return this.api.get('').pipe(
			map((res: any) => {
				this.title = res.title = res.name;
				this.description = res.description;
				this.homeUrl = res.homeUrl = res.home;
				this.gmtOffset = res.gmtOffset = res.gmt_offset;
				return res;
			})
		);
	}
}
