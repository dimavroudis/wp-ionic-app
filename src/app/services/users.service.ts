import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { User } from '../models/wordpress';

@Injectable({
	providedIn: 'root'
})
export class UsersService {

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

}
