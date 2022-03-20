import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { map, mergeMap } from 'rxjs/operators';
import { User } from '../models/wordpress';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class UsersService {

	private user: User;

	constructor(private api: ApiService, private auth: AuthService) { }

	me(): Observable<User | false> {
		return this.auth.isLoggedIn.pipe(
			mergeMap((isLoggedIn) => {
				if (!isLoggedIn) {
					return of(false)
				}
				if (this.user) {
					return of(this.user);
				}
				return this.api.get('wp/v2/users/me').pipe(
					map(res => {
						this.user = res;
						return res;
					})
				);
			}));
	}

	getUsers(ids: Array<number>, options = {}): Observable<User[]> {
		if (!ids) {
			throw Error('No media IDs defined');
		}
		const args = Object.assign(options, { include: ids.toString() });
		return this.api.get('wp/v2/users', args);
	}

	getUser(id: number, args?: any): Observable<User> {
		if (!id) {
			throw Error('No media ID defined');
		}
		return this.api.get('wp/v2/users/' + id, args);
	}

}
