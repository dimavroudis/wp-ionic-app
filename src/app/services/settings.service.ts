import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AppInfo } from '../models/wordpress';

@Injectable({
	providedIn: 'root'
})
export class SettingsService {

	private appInfo: AppInfo;

	constructor(private api: ApiService) { }

	getAppInfo(): Observable<AppInfo> {
		if (this.appInfo) {
			return of(this.appInfo);
		} else {
			return this.api.get('').pipe(
				map((res: any) => {
					this.appInfo =  res;
					return res;
				})
			);
		}
	}
}
