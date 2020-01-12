import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { AppInfo } from '../models/wordpress';

@Injectable({
	providedIn: 'root'
})
export class SettingsService {

	private appInfo: AppInfo;
	public settings: BehaviorSubject<AppInfo>;

	constructor(private api: ApiService) {
		this.settings = new BehaviorSubject(this.appInfo);
	}

	getAppInfo(): Observable<AppInfo> {
		return this.api.get('wpionic/v1/settings').pipe(
			map((res: AppInfo) => {
				this.settings.next(res);
				this.appInfo = res;
				return res;
			}),
			catchError((err) => {
				if (err.error.code === 'rest_no_route') {
					return this.getWpInfo();
				}
			})
		);
	}

	getWpInfo(): Observable<AppInfo> {
		if (this.appInfo) {
			return of(this.appInfo);
		} else {
			return this.api.get('').pipe(
				map((res: AppInfo) => {
					this.settings.next(res);
					this.appInfo = res;
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
