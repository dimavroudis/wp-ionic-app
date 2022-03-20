import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.page.html',
	styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
	loginForm: FormGroup;

	constructor(private auth: AuthService,private user: UsersService, private navCtrl: NavController) { }

	ngOnInit() {
		this.loginForm = new FormGroup({
			username: new FormControl('', Validators.required),
			password: new FormControl('', Validators.required),
		});
	}

	login() {
		this.auth.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(() => {
			this.user.me().subscribe(() => {
				this.navCtrl.navigateRoot('');
			});
		});
	}

}
