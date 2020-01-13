import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable({
	providedIn: 'root'
})
export class DomainGuard implements CanActivate {

	constructor(private api: ApiService, private router: Router) {
	}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		if (this.api.hasDomain()) {
			return true;
		}

		// navigate to login page
		this.router.navigate(['/intro']);
		// you can save redirect url so after authing we can move them back to the page they requested
		return false;
	}
}
