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
	private pluginInfo: any;

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

	getPluginInfo(): Observable<any>{
		if (this.appInfo) {
			return of(this.appInfo);
		} else {
			return this.api.get('wpionic/v1').pipe(
				map((res: any) => {
					this.appInfo =  res;
					return res;
				})
			);
		}
	}
}
