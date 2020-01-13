import { Component } from '@angular/core';

import { Platform, NavController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';
import { SettingsService } from './services/settings.service';


@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent {

	lastBack: number;
	toast: any;

	constructor(
		private translate: TranslateService,
		private platform: Platform,
		private navCtrl: NavController,
		public router: Router,
		private splashscreen: SplashScreen,
		private statusBar: StatusBar,
		private toastCtrl: ToastController,
		private network: Network,
		private settings: SettingsService
	) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashscreen.hide();

			// Sets hardware back button
			this.backButtonEvent();

			// Monitors online/offline status
			this.listenToNetworkChange();

			// set the languges supported
			this.translate.addLangs(['en']);

			// this language will be used as a fallback when a translation isn't found in the current language
			this.translate.setDefaultLang('en');

			// the lang to use, if the lang isn't available, it will use the current loader to get them
			this.translate.use('en');
		});
	}

	backButtonEvent() {
		this.platform.backButton.subscribe(() => {
			if (this.router.url !== '/tabs/home') {
				this.navCtrl.back();
			} else if (Date.now() - this.lastBack < 500) {
				navigator['app'].exitApp();
			}
			this.lastBack = Date.now();
		});
	}

	isConnected() {
		return this.network.type && this.network.type !== 'none';
	}

	listenToNetworkChange() {
		if (this.platform.is('cordova')) {
			this.toggleToast(this.isConnected());
			this.network.onDisconnect().subscribe(() => {
				this.toggleToast(false);
			});
			this.network.onConnect().subscribe(() => {
				this.toggleToast(true);
			});
		}
	}

	async toggleToast(connected) {
		if (connected) {
			if (this.toast) {
				await this.toast.dismiss();
			}
			await this.createOfflineToast();
		} else {
			return await this.toast.present();
		}
	}

	async createOfflineToast() {
		return this.toast = await this.toastCtrl.create({
			message: 'The connection is lost.',
			cssClass: 'above-tabbar'
		});
	}

}
