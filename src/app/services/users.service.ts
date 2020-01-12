import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { User } from '../models/wordpress';

@Injectable({
	providedIn: 'root'
})
export class UsersService {

	private user: User;
	public isLogged = false;

	constructor(private api: ApiService) { }

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

	me(): Observable<User> {
		if (this.user) {
			return of(this.user);
		} else {
			return this.api.get('wp/v2/users/me').pipe(
				map(res => {
					this.user = res;
					return res;
				})
			);
		}
	}

	login(username, password): Observable<any> {
		return this.api.getToken(username, password).pipe(
			map(res => {
				this.isLogged = true;
				return res;
			})
		);
	}

	logOut(): boolean {
		this.isLogged = false;
		this.api.deleteToken();
		return true;
	}

}
